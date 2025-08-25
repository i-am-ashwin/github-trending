"use client";
import { LanguageSelection } from "@/components/LanguageSelection";
import  LoadingState  from "@/components/LoaderState";
import  ErrorState  from "@/components/ErrorState";
import  EmptyState  from "@/components/EmptyState";


import RepoList from "@/components/RepoList";
import { fetchRepositories, transformGitHubRepo } from "@/lib/github";
import { Repository } from "@/types/repository";
import React from 'react';
export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [repositories, setRepositories] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const loadRepositories = React.useCallback(async (page: number, isInitial: boolean = false, language: string = selectedLanguage) => {
    try {
      if (isInitial) {
        setLoading(true);
        setCurrentPage(1);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const githubRepos = await fetchRepositories(page, language);
      const transformedRepos = githubRepos.map(transformGitHubRepo);
      
      if (isInitial) {
        setRepositories(transformedRepos);
      } else {
        setRepositories(prev => [...prev, ...transformedRepos]);
      }
      
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load repositories. Please try again later.');
      console.error('Error loading repositories:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedLanguage]);
  React.useEffect(() => {
    loadRepositories(1, true, selectedLanguage);
  }, [selectedLanguage, loadRepositories]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      loadRepositories(currentPage + 1);
    }
  };
  if(loading) {
    return <LoadingState />;
  }
  if(error) {
    return <ErrorState error={error} />;
  }
  if(repositories.length === 0) {
    return <EmptyState isAllRepo={true} />;
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
        <LanguageSelection selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      </div>
        <RepoList repos={repositories} onLoadMore={handleLoadMore} hasMore={true} isLoadingMore={loadingMore} />

 </div>
  );
}
