import { execSync } from "child_process";

interface CommitInfo {
  text: string;
  sha: string;
  url: string;
}

export function getCommitInfo(): CommitInfo | null {
  try {
    const sha = execSync("git rev-parse HEAD").toString().trim();
    const text = execSync("git --no-pager log -1 --pretty=%B")
      .toString()
      .trim();
    return {
      text,
      sha,
      url: `https://github.com/espcaa/website/commit/${sha}`,
    };
  } catch {
    return null;
  }
}
