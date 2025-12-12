import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

const loginMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: loginMock,
    user: null,
    isLoading: false,
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    loginMock.mockReset();
    navigateMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows validation error when fields are empty", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/username and password are required/i)
    ).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("logs in and navigates to previous route", async () => {
    loginMock.mockResolvedValue(undefined);

    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/login", state: { from: "/pokemon/25" } } as any,
        ]}
      >
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email or username/i), {
      target: { value: "Andy " },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: " aaa" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith("Andy", "aaa"));
    expect(navigateMock).toHaveBeenCalledWith("/pokemon/25", { replace: true });
  });
});
