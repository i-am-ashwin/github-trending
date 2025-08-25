"use client";
import RepoList from "@/components/RepoList";
import { useStarredRepos } from "@/context/StarredRepoProvider";
import { data } from "@/data/mock";
import { Repository } from "@/types/Repository";
import React from "react";
export default function StarredRepos() {
  const { starredRepos, toggleStar } = useStarredRepos();
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");

  const filteredStarredRepos = React.useMemo(() => {
    if (selectedLanguage === "") {
      return starredRepos;
    }
    return starredRepos.filter(repo => 
      repo.language?.toLowerCase() === selectedLanguage.toLowerCase()
    );
  }, [starredRepos, selectedLanguage]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleToggleStar = (repoId: string) => {
    const repo = starredRepos.find(r => r.id === repoId);
    if (repo) {
      toggleStar(repo);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-black bg-cyan-300 px-6 py-3 border-4 border-black">
          Starred Repositories
          <span className="ml-3 text-lg font-bold text-black bg-white px-3 py-1 border-2 border-black ">
            ({data.length} {data.length === 1 ? "repository" : "repositories"})
          </span>
        </h2>
      </div>
      <RepoList repos={filteredStarredRepos} hasMore={false} />
    </div>
  );
}
