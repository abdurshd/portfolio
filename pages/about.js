import { styled } from "../stitches.config";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { parseISO, format, intervalToDuration } from "date-fns";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import items from "../data/about";
import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const fullPath = path.join(process.cwd(), 'content/about.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const processedContent = await remark()
    .use(html)
    .process(fileContents);
  const contentHtml = processedContent.toString();

  const meta = {
    title: "About | Abdurashid Akbarov",
    description: "Hi, I'm Abdurashid...",
    tagline: "About me",
    primaryColor: "cyan",
    secondaryColor: "purple",
    contentHtml,
  };

  return { props: meta };
}

function About(props) {
  const { title, description, contentHtml } = props;

  const renderAll = () => {
    return (
      <div style={{
        display: 'flex', 
        gap: "100px",
        flexDirection: 'column',
        '@bp2': {
          flexDirection: 'row'
        }
      }}>
          <Section>
            <Image
              alt="Abdurashid"
              src="/static/images/ricky.jpg"
              width="256"
              height="336"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
              priority
              />
          </Section>
          <div style={{ marginBottom: 40 }} >
            <h2>Career</h2>
            {items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <h3>{item.jobTitle}</h3>
                  <p style={{ margin: 0 }}>
                    <a href={item.companyUrl} target="_blank">
                      {item.company}
                    </a>
                    <span> • {item.location}</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <span>{format(parseISO(item.startDate), "LLL yyyy")}</span>
                    <span> – </span>
                    <span>
                      {item.endDate
                        ? format(parseISO(item.endDate), "LLL yyyy")
                        : "Present"}
                    </span>
                    <span> • </span>
                    <span>{getDuration(item.startDate, item.endDate)}</span>
                  </p>
                </React.Fragment>
                )
              })}
            <p style={{marginBottom: 0}}> More information about my education, career and </p>
            <p style={{margin: 0}}>certificates can be seen on my <a href='https://www.linkedin.com/in/abdurshd'>LinkedIn</a></p>
          </div>
        </div>
      );
  };

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    });

    let durationStr = "";

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `;
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `;
    }

    durationStr += `${durationObj.months} mos`;

    return durationStr;
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://abdurashid.com/about" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.com/about" />
      </Head>

      {renderAll()}
      <br/>
      <MarkdownContent>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </MarkdownContent>
    </>
  );
}

const Section = styled("div", {
  marginTop: "0px",
  width: "auto",
});

const MarkdownContent = styled('div', {
  maxWidth: '760px',
  margin: '40px auto 0',
  padding: '0 20px',
  
  '& h1': {
    fontSize: '2em',
    marginBottom: '0.5em',
    color: '$primary',
  },
  
  '& h2': {
    fontSize: '1.5em',
    marginTop: '1.5em',
    marginBottom: '0.5em',
    color: '$primary',
  },
  
  '& h3': {
    fontSize: '1.2em',
    marginTop: '1.2em',
    marginBottom: '0.5em',
    color: '$primary',
  },
  
  '& p': {
    marginBottom: '1em',
    lineHeight: '1.6',
    color: '$secondary',
  },
  
  '& ul': {
    marginBottom: '1em',
    paddingLeft: '1.5em',
  },
  
  '& li': {
    marginBottom: '0.5em',
    color: '$secondary',
  },
});

About.Layout = Main;

export default About;