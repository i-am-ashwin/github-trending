import { Repository } from "@/types/Repository";
import RepoCard from "./RepoCard";

export default function RepoList({ repos }: { repos: Repository[] }) {
    return (
        <div>
            {repos.map((repo, index) => (
                <RepoCard
            key={repo.id}
            repo={repo}
            index={index} />
            ))}
        </div>
    );
}
