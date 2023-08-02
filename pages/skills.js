import React, {useState} from "react";
import Head from "next/head";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import skillCategories from "../data/skills";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";


export async function getStaticProps() {
  const meta = {
    title: "Setup & Skills | Abdurashid Abarov",
    description: "Programming Languages, Frameworks and Tools I use(d)",
    tagline: "Skills",
    primaryColor: 'cyan',
    secondaryColor: 'pink',
    gradientColor: "yellow-pink",
    // selectionColor: "orange",
  };

  return { props: meta };
}

function Skills(props) {
  const { title, description } = props;
  const [isHovered, setIsHovered] = useState('');


  const renderAll = () => {
    return skillCategories.map((category, index) => {
      return (
        <div key={index}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item, iIndex) => {
              return (
                <li key={iIndex}>
                  <Link href={item.url} target="_blank">
                    {item.title}
                  </Link>
                  <span> - </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  {item.projects && skillCategories.indexOf(category) === 0? 
                  (
                  <>
                  <p>{`Projects that are used ${item.title}`} </p>
                  <ul>
                    {item.projects.map((project, jIndex) => {
                      return (
                        <>
                        <li key={jIndex}>
                          <a href={project.projectUrl} target="_blank"
                           onMouseEnter={() => setIsHovered(project.projectTitle)}
                           onMouseLeave={() => setIsHovered('')}
                           >
                            <RoughNotation type="box" show={isHovered === project.projectTitle}>
                            {project.projectTitle}
                            </RoughNotation>
                          </a>
                        </li>
                        {item.projects.indexOf(project) === item.projects.length-1 && <br/>}
                        </>
                      );
                    })}
                  </ul>
                  </>
                  ) :
                  (null)
                  }
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="single">
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://abdurashid.tech/skills" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.tech/skills" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </div>
  );
}

Skills.Layout = Main;

export default Skills;

// import { styled } from '../stitches.config'
// import Head from "next/head";
// import Main from "../layouts/Main";
// import stripHtml from "../lib/strip-html";
// import { getAllPosts, getPostBySlug } from "../lib/blog";
// import ListItem from "../components/ListItem";
// import { ListGroup } from '../components/ListGroup'
// import FeaturedArticle from "../components/FeaturedArticle";
// import { AnimateSharedLayout } from "framer-motion";

// export async function getStaticProps() {
//   const allPosts = getAllPosts(["date", "skip", "slug", "title"]);

//   const featuredParams = [
//     "date",
//     "slug",
//     "title",
//     "image",
//     "content",
//     "description",
//   ];

//   // article ideas: how to find meaning in your work?
//   const featuredPosts = [
//     getPostBySlug("from-vscode-to-neovim", featuredParams),
//     getPostBySlug("reduce-decision-fatigue-digital-nomad", featuredParams),
//   ];

//   return {
//     props: {
//       title: "Articles | Abdurashid Abarov",
//       tagline: "Articles",
//       primaryColor: "purple",
//       secondaryColor: "red",
//       featuredPosts,
//       allPosts,
//     },
//   };
// }

// function Articles(props) {
//   const renderFeatured = () => {
//     return props.featuredPosts.map((post, index) => {
//       return (
//         <FeaturedArticle
//           key={index}
//           index={index}
//           href={`/${post.slug}`}
//           title={post.title}
//           description={post.description}
//           image={post.image}
//           stats={post.stats}
//           content={post.content}
//         />
//       );
//     });
//   };

//   const renderAll = () => {
//     return props.allPosts.map((post, index) => {
//       if (!post.skip) {
//         return (
//           <ListItem
//             key={index}
//             index={index}
//             href={`/${post.slug}`}
//             title={post.title}
//             date={post.date}
//           />
//         );
//       }
//     });
//   };

//   const { title } = props;
//   const description = `On this page you can find <strong>${props.allPosts.length} articles</strong> I wrote. I write about travelling, software engineering and productivity.`;

//   return (
//     <>
//       <Head>
//         <title>{title}</title>
//         <meta content={title} property="og:title" />
//         <meta content={stripHtml(description)} name="description" />
//         <meta content={stripHtml(description)} property="og:description" />
//         <meta content="https://abdurashid.tech/articles" property="og:url" />
//         <link rel="cannonical" href="https://abdurashid.tech/articles" />
//       </Head>

//       <AnimateSharedLayout>
//         <p dangerouslySetInnerHTML={{ __html: description }} />

//         <h2>Featured Articles</h2>
//         <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

//         <h2>All Articles</h2>
//         <ListGroup>{renderAll()}</ListGroup>
//       </AnimateSharedLayout>
//     </>
//   );
// }

// const FeaturedArticles = styled('div', {
//   margin: '10px 0 0 -20px',
//   '@bp2': { display: 'flex', justifyContent: 'space-between' },
// })

// Articles.Layout = Main;

// export default Articles;