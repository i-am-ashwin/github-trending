"use client";

import { motion } from 'framer-motion';
import { Repository } from '@/types/repository-new';
import { Star, GitFork, Square, ExternalLink } from 'lucide-react';
import { programmingLanguageColors } from '@/lib/languages';
import { useStarredRepos } from '@/context/StarredRepoProvider';

interface RepoCardProps {
  repo: Repository;
  index: number;
}


export default function RepoCard({ repo, index }: RepoCardProps) {
  const { starredRepoIds, toggleStar } = useStarredRepos();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.02, 
        layout: { type: "spring", bounce: 0.15, duration: 0.5 } 
      }}
      whileHover={{ 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 } 
      }}
      className="bg-white border-2 border-black p-6 shadow-brutal-lg hover:shadow-brutal-xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              <img 
                src={repo.owner.avatar_url} 
                alt={repo.owner.login}
                className="w-6 h-6 border-2 border-black"
              />
              <span className="text-sm font-bold text-gray-600">{repo.owner.login}/</span>
            </div>
            <a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-black hover:text-purple-600 transition-colors flex items-center space-x-1"
            >
              <span>{repo.name}</span>
              <ExternalLink size={16} />
            </a>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed font-medium">
            {repo.description}
          </p>

          <div className="flex items-center space-x-6 text-sm text-black font-semibold">
            {repo.language && (
              <div className="flex items-center space-x-1">
                <Square
                  size={14}
                  className="fill-current border border-black"
                  style={{ color: programmingLanguageColors[repo.language] || programmingLanguageColors.default }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <Star size={16} />
              <span>{repo.stargazersCount}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <GitFork size={16} />
              <span>{repo.forksCount}</span>
            </div>
            
            <span>Updated {repo.updatedAt}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          onClick={() => toggleStar(repo)}
          className={`p-3 border-2 border-black shadow-brutal-sm hover:shadow-brutal-md ${
            starredRepoIds.includes(repo.id)
              ? 'text-black bg-yellow-300 hover:bg-yellow-400'
              : 'text-black bg-white hover:bg-yellow-100'
          }`}
        >
          <motion.div
            initial={false}
            animate={{ 
              rotate: starredRepoIds.includes(repo.id) ? [0, -10, 10, 0] : 0,
              scale: starredRepoIds.includes(repo.id) ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <Star
              size={22}
              className={starredRepoIds.includes(repo.id) ? 'fill-current' : ''}
            />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}