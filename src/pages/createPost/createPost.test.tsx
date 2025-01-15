import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import CreatePost from "./createPost";

import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "../../mocks/server";
import { http } from "msw";
import { mockHttpResponseCreatePost } from "./mocks/createPost";

import LayoutApp from "../../components/LayoutApp";
import { mockHttpResponseUpdatePost } from "./mocks/updatePost";
import Dashboard from "../dashboard/Dashboard";

server.listen();

describe("CreatePost Component", () => {
  const queryClient = new QueryClient();

  const renderComponent = (route = "/create-post") => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/posts-edit/:id" element={<CreatePost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("should render create post form correctly", () => {
    renderComponent();

    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Body:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create/i })).toBeInTheDocument();
  });

  it("should show error modal if title or body is missing", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Title and body are required/i)
      ).toBeInTheDocument();
    });
  });

  it("should call the create mutation on form submission", async () => {
    server.use(
      http.post(
        `https://jsonplaceholder.typicode.com/posts`,
        mockHttpResponseCreatePost
      )
    );
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Body:/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Create/i })
      ).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Title:/i), {
        target: {
          value: "new post",
        },
      });
      fireEvent.change(screen.getByLabelText(/Body:/i), {
        target: {
          value: "body new post",
        },
      });

      const button = screen.getByRole("button", { name: /Create/i });
      fireEvent.click(button);
    });

    expect(screen.getByLabelText(/Title:/i)).toHaveValue("new post");
    expect(screen.getByLabelText(/Body:/i)).toHaveValue("body new post");

    await waitFor(() => {
      expect(
        screen.getByText(/It has been saved successfully/i)
      ).toBeInTheDocument();
    });
  });

  it("should populate fields when editing a post", async () => {
    server.use(
      http.post(
        `https://jsonplaceholder.typicode.com/posts`,
        mockHttpResponseUpdatePost
      )
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/posts-edit/1"]}>
          <Routes>
            <Route element={<LayoutApp />}>
              <Route path="posts-edit/:id" element={<CreatePost />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Edit Post/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/qui est esse/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: {
        value:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      },
    });
    fireEvent.change(screen.getByLabelText(/Body:/i), {
      target: {
        value:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    });

    const button = screen.getByRole("button", { name: /Update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/It has been saved successfully/i)
      ).toBeInTheDocument();
    });

    const buttonModalConfirm = screen.getByRole("button", {
      name: /Ok/i,
    });

    fireEvent.click(buttonModalConfirm);

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });

  it("should show error modal if title or body is missing in update", async () => {
    server.use(
      http.post(
        `https://jsonplaceholder.typicode.com/posts`,
        mockHttpResponseUpdatePost
      )
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/posts-edit/1"]}>
          <Routes>
            <Route element={<LayoutApp />}>
              <Route path="posts-edit/:id" element={<CreatePost />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Edit Post/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/qui est esse/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: {
        value: "",
      },
    });
    fireEvent.change(screen.getByLabelText(/Body:/i), {
      target: {
        value:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    });

    const button = screen.getByRole("button", { name: /Update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Title and body are required/i)
      ).toBeInTheDocument();
    });
  });
});
