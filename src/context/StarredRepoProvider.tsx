"use client";

import { LOCAL_STORAGE_KEY } from '@/lib/constants';
import { Repository } from '@/types/Repository';
import React from 'react';

const StarredReposContext = React.createContext<{
  starredRepos: Repository[];
  toggleStar: (repo: Repository) => void;
}>({
  starredRepos: [],
  toggleStar: () => {},
});

export const useStarredRepos = () => React.useContext(StarredReposContext);

interface StarredReposProviderProps {
  children: React.ReactNode;
}

export function StarredReposProvider({ children }: StarredReposProviderProps) {
  const [starredRepos, setStarredRepos] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setStarredRepos(JSON.parse(stored));
    }
  }, []);

  const toggleStar = React.useCallback((repo: Repository) => {
    const newStarredRepos = starredRepos.find(r => r.id === repo.id)
      ? starredRepos.filter(r => r.id !== repo.id)
      : [...starredRepos, repo];

    setStarredRepos(newStarredRepos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStarredRepos));
  }, [starredRepos]);
  return (
    <StarredReposContext.Provider value={{ starredRepos, toggleStar }}>
      {children}
    </StarredReposContext.Provider>
  );
}
