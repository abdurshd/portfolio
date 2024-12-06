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
      <ContentWrapper>
        <ImageSection>
          <Image
            alt="Abdurashid"
            src="https://i.ibb.co/Qjq3GWV/ricky.png"
            width="256"
            height="336"
            placeholder="blur"
            blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAYAAACQN/8FAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLElEQVR4nHXKsU4CQRDG8X0o7LATS7ATSrEUS8FSbMFSKIVSfBsIctx5t+zmJnO7s7vwCGYODJJo8ct/km/E13xeUat5JV0szv6jVquKUFFUZelyea7WP9YHyxJEUVXkaXqh4rim4s9LFcd/gjSuiTzL6gySpAEZyxo6Sa64e0mjyLK6QKWucymbKGUTpGyx4gCkbKHWTSZQ5zeodbu02dyi1idsrttW67YweX5nNHQMQAe1vjcMYE+Xd7kJQvNAiF0D0GMEyH0kxF4JoOcRu/z4RIh9QtMnwGfCU96YPhOuKAausAOLZugMs0NC88LdM8Ng7UB4615dYUfB2pEzdhyY/c2NmAjk3zz5yZb8xFuabhkdeaLpjvxEbF14Dz7MSuQ/Sv5oF8Js58PsGw4Hk62m9H16AAAAAElFTkSuQmCC'
            priority
          />
        </ImageSection>
        <TextSection>
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
          <p style={{marginBottom: 0}}>More information about my education, career and</p>
          <p style={{margin: 0}}>certificates can be seen on my <a href='https://www.linkedin.com/in/abdurshd'>LinkedIn</a></p>
        </TextSection>
      </ContentWrapper>
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

const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  marginBottom: '40px',
  padding: '0 20px',
  alignItems: 'center',
  textAlign: 'center',
  
  '@bp2': {
    flexDirection: 'row',
    gap: '100px',
    padding: 0,
    alignItems: 'flex-start',
    textAlign: 'left',
  }
});

const ImageSection = styled('div', {
  flexShrink: 0, // Prevents the image section from shrinking
  width: '256px', // Fixed width matching your Image component
});

const TextSection = styled('div', {
  flex: 1,
  
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  
  '@bp2': {
    alignItems: 'flex-start',
  }
});

const MarkdownContent = styled('div', {
  maxWidth: '760px',
  margin: '40px auto 0',
  padding: '0 20px',
  textAlign: 'center',
  
  '@bp2': {
    padding: 0,
    textAlign: 'left',
  },
  
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