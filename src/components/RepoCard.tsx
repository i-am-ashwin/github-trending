// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RepoCard({ repo }: {repo: any}) {
    return (
        <div>
            <h2>{repo.full_name}</h2>
            <p>{repo.description}</p>
        </div>
    )
}