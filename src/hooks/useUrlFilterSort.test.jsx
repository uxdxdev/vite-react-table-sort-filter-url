import { describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useUrlFilterSort from "./useUrlFilterSort";

describe("useUrlFilterSort", () => {
  it("should set initial url mapping", () => {
    const { result } = renderHook(() => useUrlFilterSort({ name: "test" }));

    // assert initial state
    expect(result.current.urlFilterSortMap.name).toBe("test");
    // url contains data
    expect(new URL(window.location).searchParams.get("name")).toBe("test");
  });

  it("should set filters when updateFilters called", () => {
    const { result } = renderHook(() => useUrlFilterSort({}));

    // add filter
    act(() => {
      result.current.updateFilters({ id: "test2", value: "test2" });
    });

    // assert new filter
    expect(result.current.urlFilterSortMap.test2).toBe("test2");

    // add a second filter
    act(() => {
      result.current.updateFilters({ id: "test4", value: "test4" });
    });

    // asset current filters
    expect(result.current.urlFilterSortMap.test2).toBe("test2");
    expect(result.current.urlFilterSortMap.test4).toBe("test4");
    expect(new URL(window.location).searchParams.get("test2")).toBe("test2");
    expect(new URL(window.location).searchParams.get("test4")).toBe("test4");
  });

  it("should set sort preferences when updateSortBy called", () => {
    const { result } = renderHook(() =>
      useUrlFilterSort({
        sortBy: "test3",
        order: "ASC",
      })
    );

    // assert initial state
    expect(result.current.urlFilterSortMap.sortBy).toBe("test3");
    expect(result.current.urlFilterSortMap.order).toBe("ASC");

    // click the same column
    act(() => {
      result.current.updateSortBy({
        uid: "test3",
      });
    });

    // assert toggles from ASC to DESC
    expect(result.current.urlFilterSortMap.sortBy).toBe("test3");
    expect(result.current.urlFilterSortMap.order).toBe("DESC");

    // click a differnt column
    act(() => {
      result.current.updateSortBy({
        uid: "test5",
      });
    });

    // assert sort order reset to ASC and new column selected
    expect(result.current.urlFilterSortMap.sortBy).toBe("test5");
    expect(result.current.urlFilterSortMap.order).toBe("ASC");
    expect(new URL(window.location).searchParams.get("sortBy")).toBe("test5");
    expect(new URL(window.location).searchParams.get("order")).toBe("ASC");
  });
});
