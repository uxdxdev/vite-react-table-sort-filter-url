import { describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Table from "./Table";

afterEach(() => {
  cleanup();
});

describe("Table", async () => {
  const columns = [
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
    { uid: "birth_date", name: "Age" },
    { uid: "year_of_experience", name: "Years of experience" },
    { uid: "position_applied", name: "Position applied" },
    { uid: "application_date", name: "Date of application" },
    { uid: "status", name: "Status" },
  ];

  const filterAllowList = ["name", "status", "position_applied", "email"];
  const sortAllowList = ["position_applied", "year_of_experience", "application_date"];

  const tableData = [
    {
      id: 1,
      name: "Sean Nixon",
      email: "eu@hotmail.ca",
      birth_date: "06/13/1973",
      position_applied: "Agent",
      application_date: "11/21/2021",
      status: "waiting",
      year_of_experience: 4,
    },
    {
      id: 2,
      name: "Erin Jarvis",
      email: "ornare@aol.com",
      birth_date: "06/27/1981",
      position_applied: "Engineer",
      application_date: "02/25/2022",
      status: "waiting",
      year_of_experience: 9,
    },
  ];

  const filterSortConfig = {
    filters: {
      name: "erin",
    },
    sorting: {
      sortBy: "position_applied",
      order: "ASC",
    },
  };

  it("should render the table with no filter inputs or sorting indicators", () => {
    render(<Table rows={[tableData[0]]} columns={columns} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Sean Nixon")).toBeInTheDocument();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("eu@hotmail.ca")).toBeInTheDocument();

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("06/13/1973")).toBeInTheDocument();

    expect(screen.getByText("Years of experience")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(screen.getByText("Position applied")).toBeInTheDocument();
    expect(screen.getByText("Agent")).toBeInTheDocument();

    expect(screen.getByText("Date of application")).toBeInTheDocument();
    expect(screen.getByText("11/21/2021")).toBeInTheDocument();

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("waiting")).toBeInTheDocument();
  });

  it("should render the table with filter inputs and sorting indicators", () => {
    render(
      <Table
        rows={[tableData[1]]}
        columns={columns}
        // enable filter inputs
        filterAllowList={filterAllowList}
        handleFilters={() => {}}
        // enable sort
        sortAllowList={sortAllowList}
        handleSortBy={() => {}}
        // apply filter input
        appliedFilters={filterSortConfig.filters}
        // apply sort indicator
        appliedSorting={filterSortConfig.sorting}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    // assert filter config value applied to name input
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue("erin");
    expect(screen.getByText("Erin Jarvis")).toBeInTheDocument();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByText("ornare@aol.com")).toBeInTheDocument();

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("06/27/1981")).toBeInTheDocument();

    expect(screen.getByText("Years of experience*")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();

    // sort indicator on position applied column
    expect(screen.getByText("Position applied* ASC")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /applied/i })).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();

    expect(screen.getByText("Date of application*")).toBeInTheDocument();
    expect(screen.getByText("02/25/2022")).toBeInTheDocument();

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /status/i })).toBeInTheDocument();
    expect(screen.getByText("waiting")).toBeInTheDocument();
  });
});
