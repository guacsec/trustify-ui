import { expect, test } from "../fixtures";
import {
  testBasicSort,
  validateStringSorting,
} from "../helpers/sorting-helpers";
import {
  bulkAssign,
  cleanupGroups,
  createGroup,
  deleteGroup,
  listGroups,
  readAssignments,
  readGroup,
  updateAssignments,
  updateGroup,
} from "../helpers/sbom-group-helpers";

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

test.describe("SBOM Group assignments", () => {
  const createdGroupIds: string[] = [];

  test.afterEach(async ({ axios }) => {
    await cleanupGroups(axios, createdGroupIds.splice(0));
  });

  const findFirstSbomId = async (axios: import("axios").AxiosInstance) => {
    const response = await axios.get("/api/v3/sbom", {
      params: { limit: 1, offset: 0 },
    });
    expect(response.data.items.length).toBeGreaterThan(0);
    return response.data.items[0].id as string;
  };

  const findTwoSbomIds = async (axios: import("axios").AxiosInstance) => {
    const response = await axios.get("/api/v3/sbom", {
      params: { limit: 2, offset: 0 },
    });
    expect(response.data.items.length).toBeGreaterThanOrEqual(2);
    return [
      response.data.items[0].id as string,
      response.data.items[1].id as string,
    ];
  };

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
});
