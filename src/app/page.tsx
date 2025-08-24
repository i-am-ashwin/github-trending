"use client";
import RepoList from "@/components/RepoList";
import { data } from "@/data/mock";
import { fetchRepositories } from "@/lib/github";
import { GitHubRepository } from "@/types/GithubRepository";
import React from 'react';
export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [repositories, setRepositories] = React.useState<GitHubRepository[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);
  const loadRepositories = React.useCallback(async (page: number, language: string = selectedLanguage) => {
    try {
      setLoading(true);
      const githubRepos = await fetchRepositories(page, language);
      setRepositories(prev => [...prev, ...githubRepos]);
      setLoading(false)
    }
    catch(err) {
      console.log(err)
      setLoading(false);
      setError('Error Loading Repo')
    }
  },[selectedLanguage]);
  React.useEffect(() => {
    loadRepositories(1, selectedLanguage);
  }, [selectedLanguage,loadRepositories]);
  if(loading) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <div>Error Loading Repositories</div>;
  }
  return (
 <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-black bg-cyan-300 px-6 py-3 border-4 border-black shadow-brutal-md">
          All Repositories
          <span className="ml-3 text-lg font-bold text-black bg-white px-3 py-1 border-2 border-black shadow-brutal-xs">
            ({repositories.length} {repositories.length === 1 ? "repository" : "repositories"})
          </span>
        </h2>
      </div>
        <RepoList repos={repositories} />
  
 </div>
  );
}
