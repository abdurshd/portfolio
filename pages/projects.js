import React, { useState, useRef } from "react";
import { styled } from '../stitches.config'
import Head from "next/head";
import { AnimateSharedLayout, motion, useInView } from "framer-motion";
import Main from "../layouts/Main";
import FeaturedProject from "../components/FeaturedProject";
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from "../lib/strip-html";
import items from "../data/projects";
import Link from 'next/link'
import ParticleBackground from "../components/ParticleBackground";
import ThreeDFlipCard from "../components/3DFlipCard";
export async function getStaticProps() {
    const meta = {
        title: "Projects | Abdurashid Abarov",
        tagline: "Public Projects",
        primaryColor: 'purple',
        secondaryColor: 'green',
    };
    return { props: meta };
}
function Projects(props) {
    const renderFeatured = () => {
        const featured = ["Mizan Restaurant Management", "Personal Portfolio"];

        return items.map((item) => {
            return item.projects.filter((project) =>
                featured.includes(project.title)
            );
        })
            .filter((item) => {
                if (item.length > 0) {
                    return item;
                }
            })
            .flat()
            .map((item, index) => {
                return <FeaturedProject key={index} project={item} />;
            });
    };
    const renderAll = () => {
        return items.map((item, index) => {
            return (
              // <ThreeDFlipCard key={index}>
                <div key={index}>
                    <h3>{item.year}</h3>
                    <ul style={{ margin: 0, paddingLeft: 0 }}>
                        {item.projects.map((project, pIndex) => {
                            return <ProjectsDetailed key={pIndex} project={project} />;
                        })}
                    </ul>
                </div>
              // </ThreeDFlipCard>
            );
        });
    };
    function ProjectsDetailed(props) {
        const { project, index } = props;

        const href = project.id ? `/projects/${project.id}` : project.url;

        const ref = useRef(null);
        const isInView = useInView(ref, { once: true }); // Animation triggers only once

        const animationVariants = {
          hidden: { opacity: 0, scale: 0.8, filter: "blur(5px)" }, // Smaller, blurred
          visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
        };

        const content = (
            <Animation index={index}>
                <Container>
                    <ThreeDFlipCard>
                      <ImageContainer css={{ backgroundImage: `url(${project.image})` }} />
                    </ThreeDFlipCard>
                    <Content>
                        <Title>{project.title}</Title>
                        <Description>{project.description}</Description>
                        <Description>{project.overallExpl}</Description>
                        <Description>{project.usedSkillsExpl}</Description>
                    </Content>
                </Container>
            </Animation>
        );

        return (
            <motion.article
                ref={ref}
                variants={animationVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                {project.id ? (
                    <Link href={href} passHref>
                        <a style={{ textDecoration: 'none', color: 'inherit' }}>
                            {content}
                        </a>
                    </Link>
                ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {content}
                    </a>
                )}
            </motion.article>
        );
    }
    function Animation(props) {
        const [hovered, setHovered] = useState('')
        const isHovered = hovered === props.index
        return (
            <AnimContainer
                onHoverStart={() => setHovered(props.index)}
                onHoverEnd={() => setHovered('')}
                className="featured-article-anim"
            >
                {isHovered && (
                    <AnimHovered
                        layoutId="featuredArticles"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}

                {props.children}</AnimContainer>
        )
    }
    const getTotalProjects = () => {
        let total = 0;

        for (let i = 0; i < items.length; i++) {
            total = total + items[i].projects.length;
        }

        return total;
    };
    const { title } = props;
    const description = `On this page you can find <strong>${getTotalProjects()} different</strong> open source apps and libraries I have built or contributed to over the course of my career starting with udemy/codecademy projects.`;
    return (
        <div className="single">
            <Head>
                <title>{title}</title>
                <meta content={title} property="og:title" />
                <meta content={stripHtml(description)} name="description" />
                <meta content={stripHtml(description)} property="og:description" />
                <meta content="https://abdurashid.com/projects" property="og:url" />
                <link rel="cannonical" href="https://abdurashid.com/projects" />
            </Head>

            <AnimateSharedLayout>    <p dangerouslySetInnerHTML={{ __html: description }} />
                <ParticleBackground />
                
                <h2>Featured Projects</h2>
                <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

                <h2>All Projects</h2>
                {renderAll()}
            </AnimateSharedLayout>
        </div>
    );
}
const Article = styled('a', {
    border: '0 !important',
    width: '370px',
    margin: '5px',
    textDecoration: 'none',
    '&:hover': { opacity: 1 },
    '&:first-child': { marginLeft: 0 },
})
const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    '@bp2': { flexDirection: 'row-reverse' },
})
const ImageContainer = styled('div', {
    borderRadius: '8px',
    width: '370px',
    height: '180px',
    // margin: "55px 5px",
    alignItems: "center",
    alignSelf: "center",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    '@bp3': {
        width: '320px',
        height: '150px',
    },
})
const Content = styled('div', {
    maxWidth: '370px',
    '@bp2': { maxWidth: '100%', marginRight: 0 },
})
const Title = styled('h3', {
    display: 'flex',
    justifyContent: 'flex-start',
    color: '$primary',
    margin: "5px 0",
})
const Description = styled('p', {
    display: 'flex',
    color: '$secondary',
    margin: '5px 10px 5px 0',
    width: '370px',
    '@bp3': { width: '320px' },
})
const AnimContainer = styled(motion.div, {
    position: 'relative',
    maxWidth: '100%',
    padding: 10
})
const AnimHovered = styled(motion.div, {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: '$hover',
    maxWidth: '100%',
    borderRadius: '$borderRadius',
    zIndex: -1,
})
Projects.Layout = Main;
export default Projects;