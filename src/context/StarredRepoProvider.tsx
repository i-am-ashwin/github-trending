"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Repository } from '@/types/repository-new';

const StarredReposContext = createContext<{
  starredRepos: Repository[];
  starredRepoIds: string[];
  toggleStar: (repo: Repository) => void;
  isStarred: (repoId: string) => boolean;
}>({
  starredRepos: [],
  starredRepoIds: [],
  toggleStar: () => {},
  isStarred: () => false,
});

export const useStarredRepos = () => useContext(StarredReposContext);

interface StarredReposProviderProps {
  children: ReactNode;
}

export function StarredReposProvider({ children }: StarredReposProviderProps) {
  const [starredRepos, setStarredRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('starredRepos');
    if (stored) {
        const parsedRepos = JSON.parse(stored);
          setStarredRepos(parsedRepos);
    }
  }, []);

  const toggleStar = (repo: Repository) => {
    const isCurrentlyStarred = starredRepos.some(starredRepo => starredRepo.id === repo.id);
    
    const newStarredRepos = isCurrentlyStarred
      ? starredRepos.filter(starredRepo => starredRepo.id !== repo.id)
      : [...starredRepos, repo];
    
    setStarredRepos(newStarredRepos);
    localStorage.setItem('starredRepos', JSON.stringify(newStarredRepos));
  };

  const isStarred = (repoId: string): boolean => {
    return starredRepos.some(repo => repo.id === repoId);
  };

  const starredRepoIds = starredRepos.map(repo => repo.id);

  return (
    <StarredReposContext.Provider value={{ 
      starredRepos, 
      starredRepoIds, 
      toggleStar, 
      isStarred 
    }}>
      {children}
    </StarredReposContext.Provider>
  );
}
