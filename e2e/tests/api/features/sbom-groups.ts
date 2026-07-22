import { expect, test } from "../fixtures";
import {
  bulkAssign,
  cleanupGroups,
  createGroup,
  deleteGroup,
  findFirstSbomId,
  findTwoSbomIds,
  listGroups,
  patchAssignments,
  readAssignments,
  readGroup,
  updateAssignments,
  updateGroup,
} from "../helpers/sbom-group-helpers";
import {
  testBasicSort,
  validateStringSorting,
} from "../helpers/sorting-helpers";

test.describe("SBOM Group CRUD", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  test("Create group with name only", async ({ axios }) => {
    const name = `api-test-basic-${Date.now()}`;
    const { id, etag } = await createGroup(axios, name);

    expect(id).toBeTruthy();
    expect(etag).toBeTruthy();
    createdGroupIds.push(id);

    const { body } = await readGroup(axios, id);
    expect(body.name).toBe(name);
    expect(body.description ?? null).toBeNull();
    expect(body.parent ?? null).toBeNull();
  });

  test("Create group with description", async ({ axios }) => {
    const name = `api-test-desc-${Date.now()}`;
    const description = "A test group description";
    const { id } = await createGroup(axios, name, { description });
    createdGroupIds.push(id);

    const { body } = await readGroup(axios, id);
    expect(body.name).toBe(name);
    expect(body.description).toBe(description);
  });

  test("Create group with labels", async ({ axios }) => {
    const name = `api-test-labels-${Date.now()}`;
    const labels = { "test-label": "", env: "testing" };
    const { id } = await createGroup(axios, name, { labels });
    createdGroupIds.push(id);

    const { body } = await readGroup(axios, id);
    expect(body.labels).toEqual(labels);
  });

  test("Create group with parent", async ({ axios }) => {
    const parentName = `api-test-parent-${Date.now()}`;
    const childName = `api-test-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });

    // Children first for cleanup
    createdGroupIds.push(childId, parentId);

    const { body } = await readGroup(axios, childId);
    expect(body.parent).toBe(parentId);
  });

  test("Read nonexistent group returns 404", async ({ axios }) => {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    try {
      await readGroup(axios, fakeId);
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(404);
    }
  });

  test("Delete group", async ({ axios }) => {
    const name = `api-test-delete-${Date.now()}`;
    const { id } = await createGroup(axios, name);

    await deleteGroup(axios, id);

    try {
      await readGroup(axios, id);
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(404);
    }
  });

  test("Delete nonexistent group returns 204", async ({ axios }) => {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    await expect(deleteGroup(axios, fakeId)).resolves.toBeUndefined();
  });

  test("Update group name", async ({ axios }) => {
    const name = `api-test-upd-name-${Date.now()}`;
    const newName = `api-test-upd-name-new-${Date.now()}`;
    const { id, etag } = await createGroup(axios, name);
    createdGroupIds.push(id);

    await updateGroup(axios, id, { name: newName }, etag);

    const { body } = await readGroup(axios, id);
    expect(body.name).toBe(newName);
  });

  test("Update group description", async ({ axios }) => {
    const name = `api-test-upd-desc-${Date.now()}`;
    const { id } = await createGroup(axios, name, {
      description: "original",
    });
    createdGroupIds.push(id);

    await updateGroup(axios, id, {
      name,
      description: "updated",
    });

    const { body } = await readGroup(axios, id);
    expect(body.description).toBe("updated");
  });

  test("Clear group description", async ({ axios }) => {
    const name = `api-test-clear-desc-${Date.now()}`;
    const { id } = await createGroup(axios, name, {
      description: "to be cleared",
    });
    createdGroupIds.push(id);

    await updateGroup(axios, id, { name, description: null });

    const { body } = await readGroup(axios, id);
    expect(body.description ?? null).toBeNull();
  });

  test("Update group labels", async ({ axios }) => {
    const name = `api-test-upd-labels-${Date.now()}`;
    const { id } = await createGroup(axios, name, {
      labels: { env: "dev" },
    });
    createdGroupIds.push(id);

    await updateGroup(axios, id, {
      name,
      labels: { env: "prod", tier: "1" },
    });

    const { body } = await readGroup(axios, id);
    expect(body.labels).toEqual({ env: "prod", tier: "1" });
  });

  test("Move group to a new parent", async ({ axios }) => {
    const parentAName = `api-test-move-pA-${Date.now()}`;
    const parentBName = `api-test-move-pB-${Date.now()}`;
    const childName = `api-test-move-child-${Date.now()}`;

    const { id: parentAId } = await createGroup(axios, parentAName);
    const { id: parentBId } = await createGroup(axios, parentBName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentAId,
    });
    createdGroupIds.push(childId, parentAId, parentBId);

    await updateGroup(axios, childId, {
      name: childName,
      parent: parentBId,
    });

    const { body } = await readGroup(axios, childId);
    expect(body.parent).toBe(parentBId);
  });

  test("Move group to root", async ({ axios }) => {
    const parentName = `api-test-toroot-parent-${Date.now()}`;
    const childName = `api-test-toroot-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    await updateGroup(axios, childId, {
      name: childName,
      parent: null,
    });

    const { body } = await readGroup(axios, childId);
    expect(body.parent ?? null).toBeNull();
  });
});

test.describe("SBOM Group ETag / optimistic locking", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  test("ETag changes after mutation", async ({ axios }) => {
    const name = `api-test-etag-change-${Date.now()}`;
    const { id, etag: etag1 } = await createGroup(axios, name);
    createdGroupIds.push(id);

    const newName = `api-test-etag-change-new-${Date.now()}`;
    await updateGroup(axios, id, { name: newName });

    const { etag: etag2 } = await readGroup(axios, id);
    expect(etag2).not.toBe(etag1);
  });

  test("Update with stale ETag returns 412", async ({ axios }) => {
    const name = `api-test-stale-etag-${Date.now()}`;
    const { id, etag: oldEtag } = await createGroup(axios, name);
    createdGroupIds.push(id);

    await updateGroup(axios, id, {
      name: `api-test-stale-etag-v2-${Date.now()}`,
    });

    try {
      await updateGroup(
        axios,
        id,
        { name: `api-test-stale-etag-v3-${Date.now()}` },
        oldEtag,
      );
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(412);
    }
  });
});

test.describe("SBOM Group sorting", () => {
  test("Sort groups by name ascending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/group/sbom",
      "name",
      "asc",
    );
    validateStringSorting(items, "name", "ascending");
  });

  test("Sort groups by name descending", async ({ axios }) => {
    const items = await testBasicSort(
      axios,
      "/api/v3/group/sbom",
      "name",
      "desc",
    );
    validateStringSorting(items, "name", "descending");
  });
});

test.describe("SBOM Group filtering and pagination", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  test("Filter by exact name", async ({ axios }) => {
    const name = `api-test-filter-exact-${Date.now()}`;
    const { id } = await createGroup(axios, name);
    createdGroupIds.push(id);

    const result = await listGroups(axios, { q: `name=${name}` });
    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe(name);
  });

  test("Filter by name substring", async ({ axios }) => {
    const uniqueTag = `substr${Date.now()}`;
    const name = `api-test-${uniqueTag}`;
    const { id } = await createGroup(axios, name);
    createdGroupIds.push(id);

    const result = await listGroups(axios, { q: `name~${uniqueTag}` });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API response items not strictly typed
      result.items.some((item: any) => item.name === name),
    ).toBe(true);
  });

  test("Pagination with offset and limit", async ({ axios }) => {
    const result = await listGroups(axios, {
      offset: 0,
      limit: 2,
      total: true,
    });
    expect(result.items.length).toBeLessThanOrEqual(2);
    expect(result.total).toBeDefined();
  });

  test("Total count with total=true", async ({ axios }) => {
    const result = await listGroups(axios, { total: true });
    expect(typeof result.total).toBe("number");
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  test("Totals flag returns group and SBOM counts", async ({ axios }) => {
    const name = `api-test-totals-${Date.now()}`;
    const { id } = await createGroup(axios, name);
    createdGroupIds.push(id);

    const result = await listGroups(axios, {
      q: `name=${name}`,
      totals: true,
    });
    expect(result.items.length).toBe(1);
    expect(result.items[0].number_of_groups).toBeDefined();
    expect(result.items[0].number_of_sboms).toBeDefined();
  });

  test("Filter groups by parent", async ({ axios }) => {
    const parentName = `api-test-filter-parent-${Date.now()}`;
    const childName = `api-test-filter-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    const result = await listGroups(axios, { q: `parent=${parentId}` });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API response items not strictly typed
      result.items.some((item: any) => item.id === childId),
    ).toBe(true);
  });
});

test.describe("SBOM Group hierarchy", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  test("Create parent-child relationship", async ({ axios }) => {
    const parentName = `api-test-hier-parent-${Date.now()}`;
    const childName = `api-test-hier-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    const result = await listGroups(axios, {
      q: `name=${parentName}`,
      totals: true,
    });
    expect(result.items[0].number_of_groups).toBe(1);
  });

  test("Cycle detection returns 409", async ({ axios }) => {
    const nameA = `api-test-cycle-A-${Date.now()}`;
    const nameB = `api-test-cycle-B-${Date.now()}`;
    const nameC = `api-test-cycle-C-${Date.now()}`;

    const { id: idA } = await createGroup(axios, nameA);
    const { id: idB } = await createGroup(axios, nameB, { parent: idA });
    const { id: idC } = await createGroup(axios, nameC, { parent: idB });
    // Cleanup order: C, B, A (children first)
    createdGroupIds.push(idC, idB, idA);

    // Attempt to set A's parent to C (creating A->B->C->A cycle)
    try {
      await updateGroup(axios, idA, { name: nameA, parent: idC });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(409);
    }
  });

  test("Self-parent returns 409", async ({ axios }) => {
    const name = `api-test-selfparent-${Date.now()}`;
    const { id } = await createGroup(axios, name);
    createdGroupIds.push(id);

    try {
      await updateGroup(axios, id, { name, parent: id });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(409);
    }
  });

  test("Parents chain resolution with parents=id", async ({ axios }) => {
    const parentName = `api-test-chain-parent-${Date.now()}`;
    const childName = `api-test-chain-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    const result = await listGroups(axios, {
      q: `name=${childName}`,
      parents: "id",
    });
    expect(result.items.length).toBe(1);
    expect(result.items[0].parents).toBeDefined();
    expect(result.items[0].parents).toContain(parentId);
  });

  test("Parents chain resolution with parents=resolve returns referenced groups", async ({
    axios,
  }) => {
    const grandparentName = `api-test-resolve-gp-${Date.now()}`;
    const parentName = `api-test-resolve-p-${Date.now()}`;
    const childName = `api-test-resolve-c-${Date.now()}`;

    const { id: grandparentId } = await createGroup(axios, grandparentName);
    const { id: parentId } = await createGroup(axios, parentName, {
      parent: grandparentId,
    });
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId, grandparentId);

    const result = await listGroups(axios, {
      q: `name=${childName}`,
      parents: "resolve",
    });
    expect(result.items.length).toBe(1);
    expect(result.items[0].parents).toBeDefined();
    expect(result.items[0].parents).toContain(parentId);
    expect(result.items[0].parents).toContain(grandparentId);

    expect(result.referenced).toBeDefined();
    expect(Array.isArray(result.referenced)).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API response items not strictly typed
    const refIds = result.referenced.map((g: any) => g.id);
    expect(refIds).toContain(parentId);
    expect(refIds).toContain(grandparentId);
  });
});

test.describe("SBOM Group error cases", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  test("Duplicate name at root level returns 409", async ({ axios }) => {
    const name = `api-test-dup-root-${Date.now()}`;
    const { id } = await createGroup(axios, name);
    createdGroupIds.push(id);

    try {
      await createGroup(axios, name);
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(409);
    }
  });

  test("Duplicate name under same parent returns 409", async ({ axios }) => {
    const parentName = `api-test-dup-parent-${Date.now()}`;
    const childName = `api-test-dup-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    try {
      await createGroup(axios, childName, { parent: parentId });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(409);
    }
  });

  test("Same name under different parents returns 201", async ({ axios }) => {
    const parentA = `api-test-diffpar-A-${Date.now()}`;
    const parentB = `api-test-diffpar-B-${Date.now()}`;
    const childName = `api-test-samechild-${Date.now()}`;

    const { id: idA } = await createGroup(axios, parentA);
    const { id: idB } = await createGroup(axios, parentB);
    const { id: childA } = await createGroup(axios, childName, {
      parent: idA,
    });
    const { id: childB } = await createGroup(axios, childName, {
      parent: idB,
    });

    createdGroupIds.push(childA, childB, idA, idB);

    expect(childA).toBeTruthy();
    expect(childB).toBeTruthy();
    expect(childA).not.toBe(childB);
  });

  test("Empty name returns 400", async ({ axios }) => {
    try {
      await createGroup(axios, "");
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(400);
    }
  });

  test("Name with invalid characters returns 400", async ({ axios }) => {
    try {
      await createGroup(axios, "invalid:name@test");
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(400);
    }
  });

  test("Name with leading whitespace returns 400", async ({ axios }) => {
    try {
      await createGroup(axios, " leading-space");
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(400);
    }
  });

  test("Delete group with children returns 409", async ({ axios }) => {
    const parentName = `api-test-delchild-parent-${Date.now()}`;
    const childName = `api-test-delchild-child-${Date.now()}`;

    const { id: parentId } = await createGroup(axios, parentName);
    const { id: childId } = await createGroup(axios, childName, {
      parent: parentId,
    });
    createdGroupIds.push(childId, parentId);

    try {
      await deleteGroup(axios, parentId);
      expect(true).toBe(false);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      expect(axiosError.response?.status).toBe(409);
    }
  });
});

test.describe("SBOM Group assignment tests", () => {
  test.describe.configure({ mode: "serial" });

  test.describe("SBOM Group hierarchy with assignments", () => {
    const createdGroupIds: string[] = [];

    test.afterEach(async ({ axios }) => {
      await cleanupGroups(axios, createdGroupIds.splice(0));
    });

    test("Detach child from parent preserves assignments", async ({
      axios,
    }) => {
      const parentName = `api-test-detach-parent-${Date.now()}`;
      const childName = `api-test-detach-child-${Date.now()}`;

      const { id: parentId } = await createGroup(axios, parentName);
      const { id: childId } = await createGroup(axios, childName, {
        parent: parentId,
      });
      createdGroupIds.push(childId, parentId);

      const [sbomId1, sbomId2] = await findTwoSbomIds(axios);
      await updateAssignments(axios, sbomId1, [parentId]);
      await updateAssignments(axios, sbomId2, [childId]);

      await updateGroup(axios, childId, {
        name: childName,
        parent: null,
      });

      const parentAssignments = await readAssignments(axios, sbomId1);
      expect(parentAssignments.groupIds).toContain(parentId);

      const childAssignments = await readAssignments(axios, sbomId2);
      expect(childAssignments.groupIds).toContain(childId);

      const { body } = await readGroup(axios, childId);
      expect(body.parent ?? null).toBeNull();

      await updateAssignments(axios, sbomId1, []);
      await updateAssignments(axios, sbomId2, []);
    });

    test("Delete parent after detaching child preserves child assignments", async ({
      axios,
    }) => {
      const parentName = `api-test-delpar-parent-${Date.now()}`;
      const childName = `api-test-delpar-child-${Date.now()}`;

      const { id: parentId } = await createGroup(axios, parentName);
      const { id: childId } = await createGroup(axios, childName, {
        parent: parentId,
      });
      createdGroupIds.push(childId);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [childId]);

      await updateGroup(axios, childId, {
        name: childName,
        parent: null,
      });
      await deleteGroup(axios, parentId);

      const { body } = await readGroup(axios, childId);
      expect(body.name).toBe(childName);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(childId);

      await updateAssignments(axios, sbomId, []);
    });

    test("Move child to different parent preserves assignments", async ({
      axios,
    }) => {
      const parentAName = `api-test-mvpar-a-${Date.now()}`;
      const parentBName = `api-test-mvpar-b-${Date.now()}`;
      const childName = `api-test-mvpar-child-${Date.now()}`;

      const { id: parentAId } = await createGroup(axios, parentAName);
      const { id: parentBId } = await createGroup(axios, parentBName);
      const { id: childId } = await createGroup(axios, childName, {
        parent: parentAId,
      });
      createdGroupIds.push(childId, parentAId, parentBId);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [childId]);

      await updateGroup(axios, childId, {
        name: childName,
        parent: parentBId,
      });

      const { body } = await readGroup(axios, childId);
      expect(body.parent).toBe(parentBId);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(childId);

      await updateAssignments(axios, sbomId, []);
    });
  });

  test.describe("SBOM Group assignments", () => {
    const createdGroupIds: string[] = [];

    test.afterEach(async ({ axios }) => {
      await cleanupGroups(axios, createdGroupIds.splice(0));
    });

    test("Assign SBOM to single group", async ({ axios }) => {
      const groupName = `api-test-assign1-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, groupName);
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [groupId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupId);

      // Cleanup: clear assignments
      await updateAssignments(axios, sbomId, []);
    });

    test("Assign SBOM to multiple groups", async ({ axios }) => {
      const nameA = `api-test-assign-a-${Date.now()}`;
      const nameB = `api-test-assign-b-${Date.now()}`;
      const { id: idA } = await createGroup(axios, nameA);
      const { id: idB } = await createGroup(axios, nameB);
      createdGroupIds.push(idA, idB);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [idA, idB]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(idA);
      expect(groupIds).toContain(idB);

      await updateAssignments(axios, sbomId, []);
    });

    test("Replace assignments overwrites previous", async ({ axios }) => {
      const nameA = `api-test-replace-a-${Date.now()}`;
      const nameB = `api-test-replace-b-${Date.now()}`;
      const { id: idA } = await createGroup(axios, nameA);
      const { id: idB } = await createGroup(axios, nameB);
      createdGroupIds.push(idA, idB);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [idA]);
      await updateAssignments(axios, sbomId, [idB]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(idB);
      expect(groupIds).not.toContain(idA);

      await updateAssignments(axios, sbomId, []);
    });

    test("Append assignment preserves existing groups via read-merge-write", async ({
      axios,
    }) => {
      const nameA = `api-test-append-a-${Date.now()}`;
      const nameB = `api-test-append-b-${Date.now()}`;
      const { id: idA } = await createGroup(axios, nameA);
      const { id: idB } = await createGroup(axios, nameB);
      createdGroupIds.push(idA, idB);

      const sbomId = await findFirstSbomId(axios);

      // Assign to group A
      await updateAssignments(axios, sbomId, [idA]);
      const before = await readAssignments(axios, sbomId);
      expect(before.groupIds).toContain(idA);

      // Read current, merge with group B, write back
      const merged = [...before.groupIds, idB];
      await updateAssignments(axios, sbomId, merged, before.etag);

      const after = await readAssignments(axios, sbomId);
      expect(after.groupIds).toContain(idA);
      expect(after.groupIds).toContain(idB);
      expect(after.groupIds).toHaveLength(2);

      await updateAssignments(axios, sbomId, []);
    });

    test("Clear assignments with empty array", async ({ axios }) => {
      const name = `api-test-clear-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [groupId]);
      await updateAssignments(axios, sbomId, []);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).not.toContain(groupId);
    });

    test("Read assignments after assign", async ({ axios }) => {
      const name = `api-test-readassign-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);

      // Read before assign
      const before = await readAssignments(axios, sbomId);
      expect(before.etag).toBeTruthy();

      // Assign and read
      await updateAssignments(axios, sbomId, [groupId]);
      const after = await readAssignments(axios, sbomId);
      expect(after.groupIds).toContain(groupId);

      await updateAssignments(axios, sbomId, []);
    });

    test("Bulk assign multiple SBOMs to multiple groups", async ({ axios }) => {
      const nameA = `api-test-bulk-a-${Date.now()}`;
      const nameB = `api-test-bulk-b-${Date.now()}`;
      const { id: idA } = await createGroup(axios, nameA);
      const { id: idB } = await createGroup(axios, nameB);
      createdGroupIds.push(idA, idB);

      const [sbomId1, sbomId2] = await findTwoSbomIds(axios);
      await bulkAssign(axios, [sbomId1, sbomId2], [idA, idB]);

      const result1 = await readAssignments(axios, sbomId1);
      const result2 = await readAssignments(axios, sbomId2);
      expect(result1.groupIds).toContain(idA);
      expect(result1.groupIds).toContain(idB);
      expect(result2.groupIds).toContain(idA);
      expect(result2.groupIds).toContain(idB);

      // Cleanup assignments
      await updateAssignments(axios, sbomId1, []);
      await updateAssignments(axios, sbomId2, []);
    });

    test("Bulk assign replaces existing assignments", async ({ axios }) => {
      const nameA = `api-test-bulkrep-a-${Date.now()}`;
      const nameB = `api-test-bulkrep-b-${Date.now()}`;
      const { id: idA } = await createGroup(axios, nameA);
      const { id: idB } = await createGroup(axios, nameB);
      createdGroupIds.push(idA, idB);

      const sbomId = await findFirstSbomId(axios);

      // First assign to group A
      await updateAssignments(axios, sbomId, [idA]);

      // Bulk assign to group B only
      await bulkAssign(axios, [sbomId], [idB]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(idB);
      expect(groupIds).not.toContain(idA);

      await updateAssignments(axios, sbomId, []);
    });

    test("Update assignments for nonexistent SBOM returns 404", async ({
      axios,
    }) => {
      const fakeId = "00000000-0000-0000-0000-000000000000";
      try {
        await updateAssignments(axios, fakeId, []);
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(404);
      }
    });

    test("Assign SBOM to nonexistent group returns 400", async ({ axios }) => {
      const fakeGroupId = "00000000-0000-0000-0000-000000000000";
      const sbomId = await findFirstSbomId(axios);

      try {
        await updateAssignments(axios, sbomId, [fakeGroupId]);
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(400);
      }
    });

    test("Bulk assign with empty sbom_ids is no-op", async ({ axios }) => {
      const name = `api-test-bulk-empty-sboms-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);
      createdGroupIds.push(groupId);

      await expect(bulkAssign(axios, [], [groupId])).resolves.toBeUndefined();
    });

    test("Bulk assign with empty group_ids clears assignments", async ({
      axios,
    }) => {
      const name = `api-test-bulk-empty-groups-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [groupId]);

      await bulkAssign(axios, [sbomId], []);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).not.toContain(groupId);
    });
  });

  test.describe("SBOM Group PATCH assignments", () => {
    const createdGroupIds: string[] = [];

    test.afterEach(async ({ axios }) => {
      await cleanupGroups(axios, createdGroupIds.splice(0));
    });

    test("TC-5036 regression: adding Group B preserves existing Group A", async ({
      axios,
    }) => {
      const { id: groupAId } = await createGroup(
        axios,
        `patch-tc5036-a-${Date.now()}`,
      );
      const { id: groupBId } = await createGroup(
        axios,
        `patch-tc5036-b-${Date.now()}`,
      );
      createdGroupIds.push(groupAId, groupBId);

      const sbomId = await findFirstSbomId(axios);

      await patchAssignments(axios, [sbomId], [groupAId], []);
      await patchAssignments(axios, [sbomId], [groupBId], []);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupAId);
      expect(groupIds).toContain(groupBId);
      expect(groupIds).toHaveLength(2);

      await updateAssignments(axios, sbomId, []);
    });

    test("TC-5058: remove SBOM from specific group without affecting others", async ({
      axios,
    }) => {
      const { id: groupAId } = await createGroup(
        axios,
        `patch-tc5058-a-${Date.now()}`,
      );
      const { id: groupBId } = await createGroup(
        axios,
        `patch-tc5058-b-${Date.now()}`,
      );
      createdGroupIds.push(groupAId, groupBId);

      const sbomId = await findFirstSbomId(axios);

      await patchAssignments(axios, [sbomId], [groupAId, groupBId], []);
      await patchAssignments(axios, [sbomId], [], [groupAId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).not.toContain(groupAId);
      expect(groupIds).toContain(groupBId);

      await updateAssignments(axios, sbomId, []);
    });

    test("PATCH add and remove in one request", async ({ axios }) => {
      const { id: groupAId } = await createGroup(
        axios,
        `patch-addrem-a-${Date.now()}`,
      );
      const { id: groupBId } = await createGroup(
        axios,
        `patch-addrem-b-${Date.now()}`,
      );
      const { id: groupCId } = await createGroup(
        axios,
        `patch-addrem-c-${Date.now()}`,
      );
      createdGroupIds.push(groupAId, groupBId, groupCId);

      const sbomId = await findFirstSbomId(axios);

      await patchAssignments(axios, [sbomId], [groupAId, groupBId], []);
      await patchAssignments(axios, [sbomId], [groupCId], [groupAId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).not.toContain(groupAId);
      expect(groupIds).toContain(groupBId);
      expect(groupIds).toContain(groupCId);

      await updateAssignments(axios, sbomId, []);
    });

    test("PATCH add is idempotent", async ({ axios }) => {
      const { id: groupId } = await createGroup(
        axios,
        `patch-idempotent-${Date.now()}`,
      );
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);

      await patchAssignments(axios, [sbomId], [groupId], []);
      await patchAssignments(axios, [sbomId], [groupId], []);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupId);
      expect(groupIds.filter((id: string) => id === groupId)).toHaveLength(1);

      await updateAssignments(axios, sbomId, []);
    });

    test("PATCH remove of non-assigned group is silent", async ({ axios }) => {
      const { id: groupId } = await createGroup(
        axios,
        `patch-rmsilent-${Date.now()}`,
      );
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);
      await patchAssignments(axios, [sbomId], [groupId], []);

      await patchAssignments(
        axios,
        [sbomId],
        [],
        ["00000000-0000-0000-0000-000000000099"],
      );

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupId);

      await updateAssignments(axios, sbomId, []);
    });

    test("PATCH with multiple SBOMs — cartesian product semantics", async ({
      axios,
    }) => {
      const { id: groupAId } = await createGroup(
        axios,
        `patch-bulk-a-${Date.now()}`,
      );
      const { id: groupBId } = await createGroup(
        axios,
        `patch-bulk-b-${Date.now()}`,
      );
      createdGroupIds.push(groupAId, groupBId);

      const [sbomId1, sbomId2] = await findTwoSbomIds(axios);

      await patchAssignments(
        axios,
        [sbomId1, sbomId2],
        [groupAId, groupBId],
        [],
      );

      const result1 = await readAssignments(axios, sbomId1);
      const result2 = await readAssignments(axios, sbomId2);
      expect(result1.groupIds).toContain(groupAId);
      expect(result1.groupIds).toContain(groupBId);
      expect(result2.groupIds).toContain(groupAId);
      expect(result2.groupIds).toContain(groupBId);

      await updateAssignments(axios, sbomId1, []);
      await updateAssignments(axios, sbomId2, []);
    });

    test("PATCH with nonexistent SBOM returns 404", async ({ axios }) => {
      try {
        await patchAssignments(
          axios,
          ["00000000-0000-0000-0000-000000000000"],
          [],
          [],
        );
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(404);
      }
    });

    test("PATCH with nonexistent group in add returns 400", async ({
      axios,
    }) => {
      const sbomId = await findFirstSbomId(axios);

      try {
        await patchAssignments(
          axios,
          [sbomId],
          ["00000000-0000-0000-0000-000000000099"],
          [],
        );
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(400);
      }
    });

    test("PATCH with empty sbom_ids is 204 no-op", async ({ axios }) => {
      await expect(
        patchAssignments(axios, [], [], []),
      ).resolves.toBeUndefined();
    });
  });

  test.describe("SBOM Group assignment edge cases", () => {
    const createdGroupIds: string[] = [];

    test.afterEach(async ({ axios }) => {
      await cleanupGroups(axios, createdGroupIds.splice(0));
    });

    test("Read assignments for nonexistent SBOM returns 404", async ({
      axios,
    }) => {
      const fakeId = "00000000-0000-0000-0000-000000000000";
      try {
        await readAssignments(axios, fakeId);
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(404);
      }
    });

    test("Bulk assign with nonexistent SBOM returns 400", async ({ axios }) => {
      const name = `api-test-bulk-fakesb-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);
      createdGroupIds.push(groupId);

      const fakeId = "00000000-0000-0000-0000-000000000000";
      try {
        await bulkAssign(axios, [fakeId], [groupId]);
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(400);
      }
    });

    test("Bulk assign with nonexistent group returns 400", async ({
      axios,
    }) => {
      const sbomId = await findFirstSbomId(axios);
      const fakeGroupId = "00000000-0000-0000-0000-000000000000";

      try {
        await bulkAssign(axios, [sbomId], [fakeGroupId]);
        expect(true).toBe(false);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        expect(axiosError.response?.status).toBe(400);
      }
    });

    test("PATCH remove all groups clears assignments", async ({ axios }) => {
      const { id: groupAId } = await createGroup(
        axios,
        `patch-clear-a-${Date.now()}`,
      );
      const { id: groupBId } = await createGroup(
        axios,
        `patch-clear-b-${Date.now()}`,
      );
      createdGroupIds.push(groupAId, groupBId);

      const sbomId = await findFirstSbomId(axios);
      await patchAssignments(axios, [sbomId], [groupAId, groupBId], []);

      await patchAssignments(axios, [sbomId], [], [groupAId, groupBId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).not.toContain(groupAId);
      expect(groupIds).not.toContain(groupBId);
      expect(groupIds).toHaveLength(0);
    });

    test("PATCH remove with nonexistent group is silent", async ({ axios }) => {
      const { id: groupId } = await createGroup(
        axios,
        `patch-rm-fake-${Date.now()}`,
      );
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);
      await patchAssignments(axios, [sbomId], [groupId], []);

      const fakeGroupId = "00000000-0000-0000-0000-000000000000";
      await patchAssignments(axios, [sbomId], [], [fakeGroupId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupId);

      await updateAssignments(axios, sbomId, []);
    });

    test("PATCH add and remove same group in one request", async ({
      axios,
    }) => {
      const { id: groupId } = await createGroup(
        axios,
        `patch-addrem-same-${Date.now()}`,
      );
      createdGroupIds.push(groupId);

      const sbomId = await findFirstSbomId(axios);

      await patchAssignments(axios, [sbomId], [groupId], [groupId]);

      const { groupIds } = await readAssignments(axios, sbomId);
      expect(groupIds).toContain(groupId);
      expect(groupIds).toHaveLength(1);

      await updateAssignments(axios, sbomId, []);
    });

    test("Delete group cleans up its SBOM assignments", async ({ axios }) => {
      const name = `api-test-delgrp-assign-${Date.now()}`;
      const { id: groupId } = await createGroup(axios, name);

      const sbomId = await findFirstSbomId(axios);
      await updateAssignments(axios, sbomId, [groupId]);

      const before = await readAssignments(axios, sbomId);
      expect(before.groupIds).toContain(groupId);

      await deleteGroup(axios, groupId);

      const after = await readAssignments(axios, sbomId);
      expect(after.groupIds).not.toContain(groupId);
    });
  });
});
