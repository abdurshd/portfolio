import React, {useState} from "react";
import Head from "next/head";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import skillCategories from "../data/skills";
import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
import ParticleBackground from "../components/ParticleBackground";


export async function getStaticProps() {
  const meta = {
    title: "Setup & Skills | Abdurashid Abarov",
    description: "Programming Languages, Frameworks and Tools I use(d)",
    tagline: "Skills",
    primaryColor: 'green',
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
                  {
                    item.url ? 
                    (
                      <Link href={item.url} target="_blank">
                        {item.title}
                      </Link>
                    ) :
                    (<p style={{ color: 'white' }}>{item.title}</p>)
                  }
                  {
                    item.url && <span> - </span>
                  }
                  {
                    item.url && 
                    (
                    <span
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                  {item.projects ? (
                    <>
                      <p>{`Projects that use ${item.title}`} </p>
                      <ul>
                        {item.projects.map((project, jIndex) => {
                          if (!project.projectUrl) return (
                            <li key={jIndex}>
                              <p>{project.projectTitle}</p>
                            </li>
                          );
                          return (
                            <li key={jIndex}>
                              <a
                                href={project.projectUrl}
                                target="_blank"
                                onMouseEnter={() => setIsHovered(project.projectTitle)}
                                onMouseLeave={() => setIsHovered('')}
                              >
                                <RoughNotation type="highlight" show={isHovered === project.projectTitle}>
                                  {project.projectTitle}
                                </RoughNotation>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : null}
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
        <meta content="https://abdurashid.com/skills" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.com/skills" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </div>
  );
}

Skills.Layout = Main;

export default Skills;