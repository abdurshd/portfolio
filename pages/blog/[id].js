import { getAllBlogIds, getBlogData } from '../../lib/mdx'
import Head from 'next/head'
import { styled } from '../../stitches.config'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { PostMain, PostContent, PostContainer } from '../../components/Post'
import { Wrapper } from '../../components/Wrapper'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '../../components/CodeBlock'

export async function getStaticPaths() {
  const paths = getAllBlogIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const blogData = await getBlogData(params.id)
  return {
    props: {
      blogData
    }
  }
}

const BlogTitle = styled('h1', {
  color: '$primary',
  margin: '0 0 20px',
  fontSize: '40px',
})

const TagsContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  margin: '20px 0',
})

const Tag = styled('span', {
  background: '$hover',
  color: '$primary',
  padding: '5px 10px',
  borderRadius: '$borderRadius',
  fontSize: '14px',
})

const components = {
  pre: CodeBlock
}

export default function BlogPost({ blogData }) {
  return (
    <Wrapper>
      <Head>
        <title>{blogData.title}</title>
        <meta name="description" content={blogData.description} />
      </Head>
      <Navbar />
      <PostMain>
        <PostContent>
          <PostContainer>
            <BlogTitle>{blogData.title}</BlogTitle>
            <TagsContainer>
              {blogData.tags?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
            <MDXRemote {...blogData.mdxSource} components={components} />
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  )
}
