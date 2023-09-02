import React, {useState} from "react";
import Head from "next/head";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import setupCategories from "../data/setup";
import Link from "next/link";


export async function getStaticProps() {
  const meta = {
    title: "Setup| Abdurashid Abarov",
    description: "Softwares, Frameworks and Hardwares I enjoy to have",
    tagline: "Setup ",
    primaryColor: 'cyan',
    secondaryColor: 'pink',
    gradientColor: "yellow-pink",
    // selectionColor: "orange",
  };

  return { props: meta };
}

function Setup(props) {
  const { title, description } = props;
  const [isHovered, setIsHovered] = useState('');


  const renderAll = () => {
    return setupCategories.map((category, index) => {
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