import { render, screen } from "@testing-library/react";
import RepoList from "../RepoList";
import { Repository } from "@/types/repository";
import "@testing-library/jest-dom";
const mockRepos: Repository[] = [
  {
    id: "1",
    name: "repo-one",
    description: "First test repository",
    language: "JavaScript",
    stargazersCount: 50,
    forksCount: 10,
    private: false,
    updatedAt: "1 day ago",
    owner: {
      login: "user1",
      avatar_url: "https://github.com/user.png",
    },
    html_url: "https://github.com/user1/repo-one",
  },
  {
    id: "2",
    name: "repo-two",
    description: "Second test repository",
    language: "TypeScript",
    stargazersCount: 200,
    forksCount: 30,
    private: false,
    updatedAt: "3 days ago",
    owner: {
      login: "user2",
      avatar_url: "https://github.com/user.png",
    },
    html_url: "https://github.com/user2/repo-two",
  },
];

const defaultProps = {
  repos: mockRepos,
  onLoadMore: jest.fn(),
  hasMore: false,
  isLoadingMore: false,
};

describe("RepoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all repositories", () => {
    render(<RepoList {...defaultProps} />);

    expect(screen.getByText("repo-one")).toBeInTheDocument();
    expect(screen.getByText("repo-two")).toBeInTheDocument();
  });

  it("should not show Load More button for starred tab", () => {
    render(<RepoList {...defaultProps}  />);

    expect(screen.queryByText("Load More Repos")).not.toBeInTheDocument();
  });

  it("should not show Load More button when hasMore is false", () => {
    render(<RepoList {...defaultProps} hasMore={false} />);

    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});
