import { styled } from '../stitches.config'
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShortcutHome from "../components/ShortcutHome";
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { RoughNotation } from "react-rough-notation";
import Image from 'next/image';


export async function getStaticProps() {

  return {
    props: {
      title: "Abdurashid Akbarov",
      description: "Building state of the art web apps, static sites and tools",
      seoDescription: "Front End Web Developer. Building front end web apps (at the same time getting into the back end world), static sites and tools. Programming since 2015, getting paid for it since 2022",
    },
  };
}

function Index(props) {
  const { title, description, seoDescription } = props;

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={seoDescription} name="description" />
        <meta content={seoDescription} property="og:description" />
        <meta content="https://abdurashid.com" property="og:url" />
        <link rel="cannonical" href="https://abdurashid.com" />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
              <RoughNotation
                type="box"
                color="cyan"
                padding={10}
                animationDuration={800}
                show
                >
                <strong>Full Stack Developer</strong><br />
                </RoughNotation>
                {/* <p> */}
                {description}
                {/* </p> */}
              </p>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
          <Image 
            src="https://i.ibb.co/g7tLxMc/giphy.gif" 
            alt='loading gif' 
            width={500} 
            height={500} 
            style={{borderRadius: '50%'}} 
            priority 
          />
      </Home>
      <Footer />
    </Wrapper>
  );
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})

export default Index;