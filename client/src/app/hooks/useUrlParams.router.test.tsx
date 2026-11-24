import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { act, cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useUrlParams } from "./useUrlParams";

type Filters = { filter: string | null; sort: string | null };
type Tab = { tab: string | null };
type Setter<T> = (value: Partial<T>) => void;

interface Controls {
  filters: Setter<Filters>;
  other: Setter<Filters>;
  tab: Setter<Tab>;
}

const missingControl = () => {
  throw new Error("Hook fixture has not mounted");
};

const createControls = (): Controls => ({
  filters: missingControl,
  other: missingControl,
  tab: missingControl,
});

function FilterProbe({
  controls,
  prefix = "filters",
  defaultFilter = null,
  isEnabled = true,
}: {
  controls: Controls;
  prefix?: "filters" | "other";
  defaultFilter?: string | null;
  isEnabled?: boolean;
}) {
  const [value, setValue] = useUrlParams<
    Filters,
    "filters" | "other",
    "filter" | "sort"
  >({
    isEnabled,
    persistenceKeyPrefix: prefix,
    keys: ["filter", "sort"],
    defaultValue: { filter: defaultFilter, sort: null },
    serialize: (params) => params,
    deserialize: (params) => ({
      filter: params.filter ?? null,
      sort: params.sort ?? null,
    }),
  });
  React.useLayoutEffect(() => {
    controls[prefix] = setValue;
  });
  return <output data-testid={prefix}>{JSON.stringify(value)}</output>;
}

function TabProbe({
  controls,
  defaultTab = null,
}: {
  controls: Controls;
  defaultTab?: string | null;
}) {
  const [value, setValue] = useUrlParams<Tab, "", "tab">({
    keys: ["tab"],
    defaultValue: { tab: defaultTab },
    serialize: (params) => params,
    deserialize: (params) => ({ tab: params.tab ?? null }),
  });
  React.useLayoutEffect(() => {
    controls.tab = setValue;
  });
  return <output data-testid="tab">{value.tab}</output>;
}

const routers: ReturnType<typeof createBrowserRouter>[] = [];
const releaseLoaders: (() => void)[] = [];

// A hydrated first render avoids an initial loader masking the setter race.
// Every subsequent navigation must wait for the explicitly released loaders.
function renderDataRouter(
  element: React.ReactNode,
  url = "/page?filters%3Afilter=old&filters%3Asort=name&tab=old&crypto=AES&crypto=RSA&other%3Afilter=keep",
  basename = "/",
) {
  window.history.replaceState(null, "", url);
  let released = false;
  const pending: (() => void)[] = [];
  const loader = vi.fn(
    () =>
      new Promise<null>((resolve) => {
        if (released) resolve(null);
        else pending.push(() => resolve(null));
      }),
  );
  const release = () => {
    released = true;
    pending.splice(0).forEach((resolve) => resolve());
  };
  releaseLoaders.push(release);
  const router = createBrowserRouter(
    [
      { id: "page", path: "/page", loader, element },
      { id: "away", path: "/away", loader, element: <p>Away</p> },
      { id: "not-found", path: "*", element: <p>Not found</p> },
    ],
    { basename, hydrationData: { loaderData: { page: null } } },
  );
  routers.push(router);
  render(<RouterProvider router={router} />);
  const finish = async () => {
    await act(async () => {
      release();
    });
    await waitFor(() => expect(router.state.navigation.state).toBe("idle"));
  };
  return { router, loader, finish };
}

const searchParams = () => new URLSearchParams(window.location.search);

function expectUnrelatedParams() {
  expect(searchParams().getAll("crypto")).toEqual(["AES", "RSA"]);
  expect(searchParams().get("other:filter")).toBe("keep");
}

afterEach(async () => {
  cleanup();
  routers.splice(0).forEach((router) => router.dispose());
  await act(async () => {
    releaseLoaders.splice(0).forEach((release) => release());
  });
  window.history.replaceState(null, "", "/");
});

describe("useUrlParams with a data router", () => {
  it.each(["filter-first", "tab-first"] as const)(
    "merges independent synchronous updates (%s) before history commits",
    async (order) => {
      const controls = createControls();
      const { router, loader, finish } = renderDataRouter(
        <>
          <FilterProbe controls={controls} />
          <TabProbe controls={controls} />
        </>,
      );
      const originalSearch = window.location.search;
      const historyLength = window.history.length;
      const updateFilter = () => controls.filters({ filter: "AES" });
      const updateTab = () => controls.tab({ tab: "keys" });

      act(() => {
        if (order === "filter-first") {
          updateFilter();
          expect(window.location.search).toBe(originalSearch);
          updateTab();
        } else {
          updateTab();
          expect(window.location.search).toBe(originalSearch);
          updateFilter();
        }
      });

      expect(loader).toHaveBeenCalledTimes(2);
      expect(window.location.search).toBe(originalSearch);
      const pending = new URLSearchParams(
        router.state.navigation.location?.search,
      );
      expect(pending.get("filters:filter")).toBe("AES");
      expect(pending.get("tab")).toBe("keys");
      await finish();
      expect(searchParams().get("filters:filter")).toBe("AES");
      expect(searchParams().get("filters:sort")).toBe("name");
      expect(searchParams().get("tab")).toBe("keys");
      expectUnrelatedParams();
      expect(window.history.length).toBe(historyLength);
    },
  );

  it.each(["filter-first", "tab-first"] as const)(
    "merges null removals (%s) without restoring cleared parameters",
    async (order) => {
      const controls = createControls();
      const { finish } = renderDataRouter(
        <>
          <FilterProbe controls={controls} />
          <TabProbe controls={controls} />
        </>,
      );
      const clearFilters = () => controls.filters({ filter: null, sort: null });
      const clearTab = () => controls.tab({ tab: null });
      act(() => {
        if (order === "filter-first") {
          clearFilters();
          clearTab();
        } else {
          clearTab();
          clearFilters();
        }
      });
      await finish();
      expect(searchParams().has("filters:filter")).toBe(false);
      expect(searchParams().has("filters:sort")).toBe(false);
      expect(searchParams().has("tab")).toBe(false);
      expectUnrelatedParams();
    },
  );

  it("merges same-hook partial updates, omits undefined, and lets the last writer win", async () => {
    const controls = createControls();
    const { finish } = renderDataRouter(
      <>
        <FilterProbe controls={controls} />
        <FilterProbe controls={controls} prefix="other" />
      </>,
    );
    act(() => {
      controls.filters({ filter: "first" });
      controls.filters({ sort: "descending", filter: undefined });
      controls.other({ filter: "independent" });
      controls.filters({ filter: "last", sort: undefined });
    });
    await finish();
    expect(searchParams().get("filters:filter")).toBe("last");
    expect(searchParams().get("filters:sort")).toBe("descending");
    expect(searchParams().get("other:filter")).toBe("independent");
    expect(searchParams().getAll("crypto")).toEqual(["AES", "RSA"]);
    expect(searchParams().get("tab")).toBe("old");
  });

  it("combines initialization effects from independent hooks", async () => {
    const controls = createControls();
    const { finish } = renderDataRouter(
      <React.StrictMode>
        <FilterProbe controls={controls} defaultFilter="AES" />
        <TabProbe controls={controls} defaultTab="algorithms" />
      </React.StrictMode>,
      "/page?crypto=AES&crypto=RSA&other%3Afilter=keep",
    );
    expect(searchParams().has("filters:filter")).toBe(false);
    expect(searchParams().has("tab")).toBe(false);
    await finish();
    expect(searchParams().get("filters:filter")).toBe("AES");
    expect(searchParams().get("tab")).toBe("algorithms");
    expectUnrelatedParams();
  });

  it("does not navigate from a disabled hook's initialization or setter", async () => {
    const controls = createControls();
    const { router, loader, finish } = renderDataRouter(
      <FilterProbe controls={controls} isEnabled={false} defaultFilter="AES" />,
      "/page?tab=keys#anchor",
    );
    act(() => controls.filters({ filter: "ignored" }));
    await finish();
    expect(loader).not.toHaveBeenCalled();
    expect(router.state.navigation.state).toBe("idle");
    expect(
      window.location.pathname + window.location.search + window.location.hash,
    ).toBe("/page?tab=keys#anchor");
  });

  it("preserves a non-root basename and hash while composing pending updates", async () => {
    const controls = createControls();
    const { finish } = renderDataRouter(
      <>
        <FilterProbe controls={controls} />
        <TabProbe controls={controls} />
      </>,
      "/console/page?filters%3Afilter=old&tab=old#details",
      "/console",
    );
    act(() => {
      controls.filters({ filter: "AES" });
      controls.tab({ tab: "keys" });
    });
    await finish();
    expect(window.location.pathname).toBe("/console/page");
    expect(window.location.hash).toBe("#details");
    expect(searchParams().get("filters:filter")).toBe("AES");
    expect(searchParams().get("tab")).toBe("keys");
  });

  it("does not navigate for an unchanged search", async () => {
    const controls = createControls();
    const { loader, finish } = renderDataRouter(
      <FilterProbe controls={controls} />,
      "/page?crypto=AES&crypto=RSA&filters%3Afilter=old&filters%3Asort=name&other%3Afilter=keep&tab=old",
    );
    act(() => controls.filters({ filter: "old", sort: undefined }));
    await finish();
    expect(loader).not.toHaveBeenCalled();
    expectUnrelatedParams();
  });

  it("does not merge another pathname's pending search", async () => {
    const controls = createControls();
    const { router, finish } = renderDataRouter(
      <>
        <FilterProbe controls={controls} />
        <TabProbe controls={controls} />
      </>,
    );
    act(() => {
      void router.navigate("/away?foreign=must-not-leak");
      controls.tab({ tab: "keys" });
    });
    await finish();
    expect(window.location.pathname).toBe("/page");
    expect(searchParams().has("foreign")).toBe(false);
    expect(searchParams().get("filters:filter")).toBe("old");
    expect(searchParams().get("tab")).toBe("keys");
    expectUnrelatedParams();
  });

  it("uses the latest committed URL after a navigation supersedes pending writes", async () => {
    const controls = createControls();
    const { router, finish } = renderDataRouter(
      <>
        <FilterProbe controls={controls} />
        <TabProbe controls={controls} />
      </>,
    );
    act(() => {
      controls.filters({ filter: "must-not-return" });
      void router.navigate(
        "/page?filters%3Afilter=fresh&tab=fresh&external=yes",
      );
    });
    await finish();
    act(() => controls.tab({ tab: "keys" }));
    await waitFor(() => expect(router.state.navigation.state).toBe("idle"));
    expect(searchParams().get("filters:filter")).toBe("fresh");
    expect(searchParams().get("tab")).toBe("keys");
    expect(searchParams().get("external")).toBe("yes");
  });

  it("uses the restored URL after browser back and forward", async () => {
    const controls = createControls();
    const { router, finish } = renderDataRouter(
      <>
        <FilterProbe controls={controls} />
        <TabProbe controls={controls} />
      </>,
    );
    act(() => {
      void router.navigate("/page?filters%3Afilter=second&tab=second");
    });
    await finish();
    await act(async () => {
      await router.navigate(-1);
    });
    await waitFor(() =>
      expect(searchParams().get("filters:filter")).toBe("old"),
    );
    act(() => controls.tab({ tab: "back-edited" }));
    await waitFor(() => expect(router.state.navigation.state).toBe("idle"));
    expect(searchParams().get("filters:filter")).toBe("old");
    expect(searchParams().get("tab")).toBe("back-edited");
    await act(async () => {
      await router.navigate(1);
    });
    await waitFor(() =>
      expect(searchParams().get("filters:filter")).toBe("second"),
    );
    act(() => controls.filters({ sort: "forward-edited" }));
    await waitFor(() => expect(router.state.navigation.state).toBe("idle"));
    expect(searchParams().get("filters:filter")).toBe("second");
    expect(searchParams().get("filters:sort")).toBe("forward-edited");
    expect(searchParams().get("tab")).toBe("second");
  });
});

it("composes synchronous updates with the declarative BrowserRouter fallback", () => {
  window.history.replaceState(
    null,
    "",
    "/page?filters%3Afilter=old&tab=old&crypto=AES&crypto=RSA&other%3Afilter=keep#details",
  );
  const controls = createControls();
  render(
    <BrowserRouter>
      <FilterProbe controls={controls} />
      <TabProbe controls={controls} />
    </BrowserRouter>,
  );
  act(() => {
    controls.filters({ filter: "AES" });
    controls.tab({ tab: "keys" });
  });
  expect(searchParams().get("filters:filter")).toBe("AES");
  expect(searchParams().get("tab")).toBe("keys");
  expect(window.location.hash).toBe("#details");
  expectUnrelatedParams();
});
