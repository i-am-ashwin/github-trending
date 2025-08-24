import RepoCard from "./RepoCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RepoList({ repos }: { repos: any[] }) {
    return (
        <div>
            {repos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    );
}
