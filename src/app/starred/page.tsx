"use client";
import { LanguageSelection } from "@/components/LanguageSelection";
import RepoList from "@/components/RepoList";
import { useStarredRepos } from "@/context/StarredRepoProvider";
import { Repository } from "@/types/repository";
import React from "react";
export default function StarredRepos() {
  const { starredRepos } = useStarredRepos();
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");

  const filteredStarredRepos = React.useMemo(() => {
    if (selectedLanguage === "") {
      return starredRepos;
    }
    return starredRepos.filter(
      (repo) => repo.language?.toLowerCase() === selectedLanguage.toLowerCase()
    );
  }, [starredRepos, selectedLanguage]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-black bg-cyan-300 px-6 py-3 border-4 border-black">
          Starred Repositories
          <span className="ml-3 text-lg font-bold text-black bg-white px-3 py-1 border-2 border-black ">
            ({starredRepos.length} {starredRepos.length === 1 ? "repository" : "repositories"})
          </span>
        </h2>
        <LanguageSelection
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
      <RepoList repos={filteredStarredRepos} hasMore={false} />
    </div>
  );
}
