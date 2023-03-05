import { describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTransform from "./useTransform";

describe("useTransform", () => {
  const data = [
    {
      id: 1,
      name: "Sean Nixon",
      email: null,
      birth_date: "06/13/1973",
      position_applied: "Agent",
      application_date: null,
      status: "waiting",
      year_of_experience: 10,
    },
    {
      id: 2,
      name: "Erin Jarvis",
      email: "ornare@aol.com",
      birth_date: "06/27/1981",
      position_applied: "Agent",
      application_date: "02/25/2022",
      status: "approved",
      year_of_experience: 4,
    },
    {
      id: 3,
      name: "Dawn Huff",
      email: "aliquam.enim.nec@aol.ca",
      birth_date: "02/12/1964",
      position_applied: "Orchestrator",
      application_date: "06/11/2021",
      status: "rejected",
      year_of_experience: 0,
    },
  ];

  it("should not return data initially", () => {
    const { result } = renderHook(() => useTransform());

    expect(Object.entries(result.current.filterSortConfig).length).toBe(0);
    expect(result.current.data.length).toBe(0);
  });

  it("should return data when setTransformData called", () => {
    const { result } = renderHook(() => useTransform());

    act(() => {
      result.current.setTransformData(data);
    });

    // no filter or sorting applied
    expect(Object.entries(result.current.filterSortConfig).length).toBe(0);
    expect(result.current.data.length).toBe(3);
    expect(result.current.data[0].name).toBe("Sean Nixon");
    expect(result.current.data[0].email).toBeNull();
    expect(result.current.data[0].birth_date).toBe("06/13/1973");
    expect(result.current.data[0].position_applied).toBe("Agent");
    expect(result.current.data[0].application_date).toBe(null);
    expect(result.current.data[0].status).toBe("waiting");
    expect(result.current.data[0].year_of_experience).toBe(10);
  });

  it("should filter data when filter configured", () => {
    const { result } = renderHook(() => useTransform());

    act(() => {
      result.current.setTransformData(data);
      result.current.setFilterSortConfig({
        filters: {
          name: "erin",
        },
      });
    });

    expect(Object.entries(result.current.filterSortConfig).length).toBe(1);
    expect(result.current.data.length).toBe(1);
    expect(result.current.data[0].name).toBe("Erin Jarvis");
    expect(result.current.data[0].email).toBe("ornare@aol.com");
    expect(result.current.data[0].birth_date).toBe("06/27/1981");
    expect(result.current.data[0].position_applied).toBe("Agent");
    expect(result.current.data[0].application_date).toBe("02/25/2022");
    expect(result.current.data[0].status).toBe("approved");
    expect(result.current.data[0].year_of_experience).toBe(4);
  });

  it("should sort data when sorting configured", () => {
    const { result } = renderHook(() => useTransform());

    act(() => {
      result.current.setTransformData(data);
      result.current.setFilterSortConfig({
        sorting: {
          sortBy: "name",
          order: "ASC",
        },
      });
    });

    expect(Object.entries(result.current.filterSortConfig).length).toBe(1);
    expect(result.current.data.length).toBe(3);
    expect(result.current.data[0].name).toBe("Dawn Huff");
    expect(result.current.data[0].email).toBe("aliquam.enim.nec@aol.ca");
  });

  it("should sort data when sorting configured on number values", () => {
    const { result } = renderHook(() => useTransform());

    act(() => {
      result.current.setTransformData(data);
      result.current.setFilterSortConfig({
        sorting: {
          sortBy: "year_of_experience",
          order: "ASC",
        },
      });
    });

    expect(Object.entries(result.current.filterSortConfig).length).toBe(1);
    expect(result.current.data.length).toBe(3);
    expect(result.current.data[0].name).toBe("Dawn Huff");
    expect(result.current.data[1].name).toBe("Erin Jarvis");
    expect(result.current.data[2].name).toBe("Sean Nixon");
  });
});
