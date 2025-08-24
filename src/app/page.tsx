import RepoList from "@/components/RepoList";
import { data } from "@/data/mock";

export default function Home() {
  return (
 <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-black bg-cyan-300 px-6 py-3 border-4 border-black shadow-brutal-md">
          All Repositories
          <span className="ml-3 text-lg font-bold text-black bg-white px-3 py-1 border-2 border-black shadow-brutal-xs">
            ({data.length} {data.length === 1 ? "repository" : "repositories"})
          </span>
        </h2>
      </div>
        <RepoList repos={data} />
  
 </div>
  );
}
