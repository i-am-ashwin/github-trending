import { GitHubRepository, GitHubSearchResponse } from "@/types/GithubRepository";
import { MAX_REPOS_PER_PAGE } from "./constants";
import { Repository } from "@/types/Repository";



export async function fetchRepositories(page: number = 1, selectedLanguage: string): Promise<GitHubRepository[]> {
  try {
    let query = 'created:2017-01-10';
    if (selectedLanguage) {
      query += ` language:${selectedLanguage}`;
    }
    
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${MAX_REPOS_PER_PAGE}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}

export function transformGitHubRepo(repo: GitHubRepository): Repository {
  const updatedDate = new Date(repo.updated_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - updatedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let updatedAt: string;
  if (diffDays < 7) {
    updatedAt = `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    updatedAt =`${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    updatedAt =`${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    updatedAt =`${years} year${years === 1 ? '' : 's'} ago`;
  }

  return {
    id: repo.id.toString(),
    name: repo.name,
    description: repo.description || 'No description available',
    language: repo.language || 'default',
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    private: repo.private,
    updatedAt,
    owner: repo.owner,
    html_url: repo.html_url
  };
}
