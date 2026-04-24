import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const OWNER = process.env.GITHUB_OWNER!
const REPO = process.env.GITHUB_REPO!
const BRANCH = process.env.GITHUB_BRANCH || "main"

export async function commitPost(filename: string, content: string): Promise<string> {
  const path = `content/posts/${filename}`
  const encoded = Buffer.from(content, "utf-8").toString("base64")

  // Check if file already exists (for update vs create)
  let sha: string | undefined
  try {
    const { data } = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path, ref: BRANCH })
    if (!Array.isArray(data) && data.type === "file") sha = data.sha
  } catch {
    // File doesn't exist yet — create new
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `Content: новая статья — ${filename}`,
    content: encoded,
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  })

  const siteUrl = process.env.SITE_URL || "https://owaycargo.com"
  return `${siteUrl}/news`
}
