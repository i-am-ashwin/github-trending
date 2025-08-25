import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
describe("Header", () => {
  it("should render the main title", () => {
    render(<Header />);

    expect(screen.getByText("GitHub Trending")).toBeInTheDocument();
  });
  it("should render navigation links", () => {
    render(<Header />);

    expect(screen.getByText("All Repos")).toBeInTheDocument();
    expect(screen.getByText("Starred Repos")).toBeInTheDocument();
  });
  it("should have correct navigation links", () => {
    render(<Header />);
    const allReposLink = screen.getByText("All Repos").closest("a");
    const starredReposLink = screen.getByText("Starred Repos").closest("a");

    expect(allReposLink).toHaveAttribute("href", "/");
    expect(starredReposLink).toHaveAttribute("href", "/starred");
  });
});
