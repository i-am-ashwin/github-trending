import { GitHubRepository, GitHubSearchResponse } from "@/types/GithubRepository";
import { MAX_REPOS_PER_PAGE } from "./constants";



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

