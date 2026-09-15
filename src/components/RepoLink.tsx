import { repoUrl, type Repo } from "@/data/projects";
import { ArrowIcon, GitHubIcon, LockIcon } from "./Icons";

export function RepoLink({ repo, className = "", tone = "muted" }: { repo: Repo; className?: string; tone?: "muted" | "ink" }) {
  if (repo.visibility === "private") {
    return (
      <span className={`inline-flex items-center gap-1.5 label text-ink-faint ${className}`}>
        <LockIcon className="size-3.5" />
        Private repository
      </span>
    );
  }
  return (
    <a
      href={repoUrl(repo)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 label transition-colors hover:text-brass ${
        tone === "ink" ? "text-ink" : "text-ink-muted"
      } ${className}`}
    >
      <GitHubIcon className="size-3.5" />
      {repo.owner}/{repo.name}
      <ArrowIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
