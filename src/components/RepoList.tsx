import { Repository } from "@/types/repository";
import RepoCard from "./RepoCard";
import { motion } from "motion/react"
interface RepoListProps {
  repos: Repository[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}
export default function RepoList({ repos, onLoadMore, hasMore, isLoadingMore }: RepoListProps) {
    return (
    <div className="space-y-4">

        <div>
            {repos.map((repo, index) => (
                <RepoCard
                key={repo.id}
                repo={repo}
                index={index} />
            ))}
        </div>
              {hasMore && onLoadMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-4 bg-lime-300 border-4 border-black shadow-brutal-md hover:shadow-brutal-lg hover:bg-lime-400 font-black text-lg text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-brutal-md disabled:hover:bg-lime-300"
          >
            {isLoadingMore ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black  animate-spin"></div>
                Loading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-xl">📂</span>
                Load More Repos
              </span>
            )}
          </button>
        </motion.div>
      )}
            </div>
    );
}
