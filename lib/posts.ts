import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { NewsItem, NewsType } from "@/modules/news/types"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .sort((a, b) => b.localeCompare(a)) // newest first (by filename prefix)
}

function fileToNewsItem(filename: string, index: number): NewsItem | null {
  try {
    const filepath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filepath, "utf-8")
    const { data, content } = matter(raw)

    if (!data.slug || !data.title) return null

    const newsTypes: NewsType[] = data.category
      ? [{ id: 1, documentId: data.category as string, name: data.category as string }]
      : []

    return {
      id: index + 1,
      documentId: data.slug as string,
      title: data.title as string,
      card_description: (data.card_description as string) || "",
      description: content.trim(),
      slug: data.slug as string,
      title_seo: (data.title_seo as string) || null,
      seo_description: (data.seo_description as string) || null,
      createdAt: data.date ? new Date(data.date as string).toISOString() : new Date().toISOString(),
      news_types: newsTypes,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): NewsItem[] {
  return getPostFiles()
    .map((file, i) => fileToNewsItem(file, i))
    .filter((item): item is NewsItem => item !== null)
}

export function getPostBySlug(slug: string): NewsItem | null {
  const files = getPostFiles()
  for (let i = 0; i < files.length; i++) {
    const item = fileToNewsItem(files[i], i)
    if (item?.slug === slug) return item
  }
  return null
}

export function getAllCategories(): string[] {
  const categories = new Set<string>()
  getPostFiles().forEach((file, i) => {
    const item = fileToNewsItem(file, i)
    if (item?.news_types?.length) {
      item.news_types.forEach((t) => categories.add(t.name))
    }
  })
  return Array.from(categories)
}
