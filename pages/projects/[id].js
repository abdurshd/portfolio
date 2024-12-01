import { getAllProjectIds, getProjectData } from '../../lib/mdx'
import Head from 'next/head'
import { styled } from '../../stitches.config'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { PostMain, PostContent, PostContainer } from '../../components/Post'
import { Wrapper } from '../../components/Wrapper'

export async function getStaticPaths() {
  const paths = getAllProjectIds()
  console.log('Available paths:', paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  console.log('Building page for:', params.id)
  const projectData = await getProjectData(params.id)
  return {
    props: {
      projectData
    }
  }
}

const ProjectTitle = styled('h1', {
  color: '$primary',
  margin: '0 0 20px',
  fontSize: '40px',
})

const TechStack = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  margin: '20px 0',
})

const TechTag = styled('span', {
  background: '$hover',
  color: '$primary',
  padding: '5px 10px',
  borderRadius: '$borderRadius',
  fontSize: '14px',
})

const ProjectLinks = styled('div', {
  display: 'flex',
  gap: '20px',
  margin: '30px 0',
  
  'a': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '$primary',
    textDecoration: 'none',
    padding: '10px 20px',
    background: '$primary',
    color: '$background',
    borderRadius: '$borderRadius',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    
    'i': {
      fontSize: '20px'
    },
    
    '&:hover': {
      transform: 'translateY(-2px)',
      opacity: 0.9
    }
  }
})

export default function Project({ projectData }) {
  return (
    <Wrapper>
      <Head>
        <title>{projectData.title}</title>
        <meta name="description" content={projectData.description} />
      </Head>
      <Navbar />
      <PostMain>
        <PostContent>
          <PostContainer>
            <ProjectTitle>{projectData.title}</ProjectTitle>
            <TechStack>
              {projectData.tech.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechStack>
            
            {projectData.private ? (
              <p style={{color: 'var(--colors-secondary)', marginBottom: '20px'}}>
                This is a private project. Source code is not publicly available.
              </p>
            ) : (
              <ProjectLinks>
                {projectData.github && (
                  <a href={projectData.github} target="_blank" rel="noopener noreferrer">
                    <i className="ri-github-line" />
                    GitHub Repository
                  </a>
                )}
                {projectData.demo && (
                  <a href={projectData.demo} target="_blank" rel="noopener noreferrer">
                    <i className="ri-external-link-line" />
                    Live Demo
                  </a>
                )}
              </ProjectLinks>
            )}
            
            <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  )
} 