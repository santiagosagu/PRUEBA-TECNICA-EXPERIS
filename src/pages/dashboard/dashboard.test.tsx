import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import Dashboard from "./Dashboard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreatePost from "../createPost/createPost";

describe("CreatePost Component", () => {
  const queryClient = new QueryClient();

  const renderComponent = (route = "/") => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("should render data", async () => {
    renderComponent();

    screen.debug(undefined, 10000);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    });
  });

  it("should render table an navigate to edit post", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="posts-edit/:id" element={<CreatePost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("edit-post")).toHaveLength(10);
      const [editButton] = screen.getAllByTestId("edit-post");
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Edit Post/i)).toBeInTheDocument();
    });
  });

  it("should render popover on actions click", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("edit-post")).toHaveLength(10);
      const [deleteButton] = screen.getAllByTestId("delete-post");
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Yes/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Successfully removed/i)).toBeInTheDocument();
    });
  });

  it("should render popover on actions click", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("edit-post")).toHaveLength(10);
      const [deleteButton] = screen.getAllByTestId("delete-post");
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /No/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/It was cancelled/i)).toBeInTheDocument();
    });
  });
});
