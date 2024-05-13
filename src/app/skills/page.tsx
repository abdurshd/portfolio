import React, {useState} from "react";
import Head from "next/head";
import Main from "../../app/Main";
import stripHtml from "../../lib/strip-html";
import skillCategories from "../../data/skills";
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
  };

  return { props: meta };
}

function Skills(props: any) {
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