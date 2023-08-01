import React from "react";
import Head from "next/head";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import categories from "../data/setup";
import Link from "next/link";

export async function getStaticProps() {
  const meta = {
    title: "Setup & Skills | Abdurashid Abarov",
    description: "Softwares, Frameworks and Hardwares I have experience(d)",
    tagline: "Skills & Setup ",
    primaryColor: 'cyan',
    secondaryColor: 'pink',
    gradientColor: "yellow-pink",
    // selectionColor: "orange",
  };

  return { props: meta };
}

function Setup(props) {
  const { title, description } = props;

  const renderAll = () => {
    return categories.map((category, index) => {
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
                  {item.projects && categories.indexOf(category) === 0? 
                  (
                  <>
                  <p>{`Projects that are used ${item.title}`} </p>
                  <ul>
                    {item.projects.map((project, jIndex) => {
                      return (
                        <>
                        <li key={jIndex}>
                          <Link href={project.projectUrl} target="_blank">
                            {project.projectTitle}
                          </Link>
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
        <meta content="https://abdurashid.tech/setup" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.tech/setup" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </div>
  );
}

Setup.Layout = Main;

export default Setup;