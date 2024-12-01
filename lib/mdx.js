import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import images from 'remark-images'
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const blogDirectory = path.join(process.cwd(), 'content/blog')

export function getAllProjectIds() {
  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getProjectData(id) {
  const fullPath = path.join(projectsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(images)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export function getAllBlogIds() {
    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  export async function getBlogData(id) {
    const fullPath = path.join(blogDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use next-mdx-remote to serialize the content
    const mdxSource = await serialize(matterResult.content, {
      mdxOptions: {
        rehypePlugins: [
          [rehypePrism, { showLineNumbers: false }]
        ],
      },
    })
        return {
        id,
        mdxSource,
        ...matterResult.data
    }
}

export function getAllBlogPosts() {
  const fileNames = fs.readdirSync(blogDirectory)
  return fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(blogDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data
    }
  })
} 