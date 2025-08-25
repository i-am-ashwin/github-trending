import { motion } from 'framer-motion';

export default function LoaderState({isAllRepo}: {isAllRepo: boolean}) {
    return (
              <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-white border-4 border-black shadow-brutal-lg p-8"
      >
        <div className="w-20 h-20 bg-yellow-300 border-4 border-black shadow-brutal-sm flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-2xl font-black text-black mb-4">
          {isAllRepo
              ? "No repositories found"
              : "No starred repositories found"
          }
        </h3>
        <p className="text-black font-bold text-lg">
          { isAllRepo
              ? "Could not find any repositories."
              : "Star  repositories to see them"
          }
        </p>
      </motion.div>
    )
}