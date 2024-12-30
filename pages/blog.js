import React from "react";
import Head from "next/head";
import { styled } from '../stitches.config'
import { getAllBlogPosts } from "../lib/mdx";
import Link from "next/link";
import stripHtml from "../lib/strip-html";
import Main from "../layouts/Main";
import GlitchEffect from "../components/GlitchEffect";

export async function getStaticProps() {
  const blogPosts = getAllBlogPosts();

  const meta = {
    title: "Blog | Abdurashid Abarov",
    tagline: "My Articles",
    primaryColor: 'purple',
    secondaryColor: 'pink',
    gradientColor: "yellow-pink",
    blogPosts,
  };

  return { props: meta };
}

const BlogList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

const BlogItem = styled('div', {
  padding: '20px',
  background: '$hover',
  borderRadius: '$borderRadius',
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    background: '$hoverfocus',
  }
})

const BlogLink = styled(Link, {
  color: '$primary',
  textDecoration: 'none',
  fontSize: '24px',
  fontWeight: 500,
})

function Blog(props) {
  const { title, blogPosts } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml("Read my latest articles")} name="description" />
        <meta content={stripHtml("Read my latest articles")} property="og:description" />
        <meta content="https://abdurashid.com/blog" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.com/blog" />
      </Head>

      <BlogList>

        {blogPosts.map((post) => (
          <BlogItem key={post.id}>
            <BlogLink href={`/blog/${post.id}`}>
              <GlitchEffect>
                {post.title}
              </GlitchEffect>
            </BlogLink>
          </BlogItem>
        ))}
      </BlogList>
    </>
  );
}

Blog.Layout = Main;

export default Blog; 