import { styled } from "../stitches.config";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { parseISO, format, intervalToDuration } from "date-fns";
import Main from "../layouts/Main";
import stripHtml from "../lib/strip-html";
import items from "../data/about";

export async function getStaticProps() {
  const meta = {
    title: "About | Abdurashid Akbarov",
    description:
      "Hi, I'm Abdurashid. I started coding with HTML and game development in elementary school and never stopped being passionate about software and technology. I'm from Uzbekistan and currently in South Korea. I am super curious about everything and enjoy learning, building, problem solving.",
    tagline: "About me",
    primaryColor: "cyan",
    secondaryColor: "purple",
  };

  return { props: meta };
}

function About(props) {
  const { title, description } = props;

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Paragraph
            css={{
              marginTop: "16px",
              "@bp2": { marginTop: "-6px" },
            }}
          >Hey there, thanks for dropping by!
          <br/>
            <strong> I'm Abdurashid. You may call me Ricky, too</strong> 
          </Paragraph>
          <Paragraph>
          So, let me tell you my story. Picture this - it's <strong>2015</strong>, and I'm knee-deep in law school books, juggling case studies, statutes, and all sorts of lawyerly jargon. Then out of the blue, we have this <strong>'IT for Lawyers'</strong> class. And get this, we had to code. Yes, you read it right, code! Coding was like <strong>rocket science</strong> to me back then. It was exciting, yet a little terrifying. But you see, law was my jam, so programming took a backseat :/.
          </Paragraph>
          <Paragraph>
          Fast forward to 2017,  I was doing my law school. One day, I stumbled upon an<strong> <a href='https://kun.uz/uz/news/2017/11/03/sunij-intellekt-londonning-eng-ahsi-uristlarini-ortda-koldirdi'>article</a></strong> that spun my world around. It was about an <strong>AI 'lawyer'</strong> in the UK that apparently <strong>had a better judgment record</strong> than top 100 lawyers of London. Mind blown🤯, right?
          Don't forget it was 2017, long before than ChatGPT!
          <br/>
          That little nugget of information tickled my curiosity about all things IT and AI. I found myself gradually drawn into the world of <strong>Python</strong> and dabbling in data science with. Not long earlier, I was knee-deep in web development. And funny enough, I was enjoying it more than I'd ever enjoyed data science. So <strong>I sticked to web development.</strong>
          </Paragraph>
          <Paragraph>
          One online course led to another, and soon, I was devouring tutorials, mastering HTML, CSS, JavaScript, you name it. Meanwhile, I was cutting my teeth on all sorts of web development projects, building awesome websites and web apps. My remotely—yet practically—applied skills were making steady progress, bit by bit, byte by byte (see what I did there?).
          </Paragraph>
          <Paragraph>
          Now, I get that it might sound <strong>super cliché</strong>, but the truth? <strong>I genuinely want to leverage the power of programming to do some meaningful stuff.</strong> I want my code to make a difference, to have an impact. You see, for me, this journey from law to web development isn't just about career switches; it's about passion and fulfilment.
          <br/>
          So, that's my story. Just a lawyer-turned-web-developer trying to weave meaningful stories on the World Wide Web canvas, one line of code at a time. Who knew, right?
          </Paragraph>
        </Section>
      </Container>
    );
  };

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <Container>
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
        <div style={{ marginBottom: 40 }} key={index}>
        <h2>Career</h2>
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
          <br/>
          <p style={{ margin: 0 }}> More information about my education, career and </p> 
          <p style={{ margin: 0 }}>certificates can be seen on my <a href='https://www.linkedin.com/in/abdurshd'>LinkedIn</a></p>
        </div>
        </Container>
      );
    });
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
        <meta content="https://abdurashid.tech/about" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.tech/about" />
      </Head>

      {renderAll()}
      <br/>
      {renderIntro()}
    </>
  );
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@bp2": { flexDirection: "row" },
});

const Paragraph = styled("p", {
  "@bp2": { margin: "15px 0" },
});

const Section = styled("div", {
  marginTop: "0px",
  width: "auto",
});

About.Layout = Main;

export default About;
