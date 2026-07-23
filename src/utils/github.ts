import { execSync } from "child_process";

interface CommitInfo {
  text: string;
  sha: string;
  url: string;
}

export function getCommitInfo(): CommitInfo | null {
  const sha = process.env.GIT_COMMIT_SHA;
  const text = process.env.GIT_COMMIT_MSG;
  if (sha && text) {
    return {
      text,
      sha,
      url: `https://github.com/espcaa/website/commit/${sha}`,
    };
  }

  try {
    const shaFallback = execSync("git rev-parse HEAD").toString().trim();
    const textFallback = execSync("git --no-pager log -1 --pretty=%B")
      .toString()
      .trim();
    return {
      text: textFallback,
      sha: shaFallback,
      url: `https://github.com/espcaa/website/commit/${shaFallback}`,
    };
  } catch {
    return null;
  }
}
