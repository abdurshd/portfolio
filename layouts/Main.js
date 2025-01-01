import { styled } from '../stitches.config'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Wrapper } from "../components/Wrapper";
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { RoughNotation } from "react-rough-notation";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Main({ children }) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  const router = useRouter();
  const [key, setKey] = useState(0);

    // Reset the key when route changes to force re-render of RoughNotation
    useEffect(() => {
      setKey(prev => prev + 1);
    }, [router.asPath]);

  return (
    <Wrapper>
      <Navbar />
      <PostMain
        css={{
          '& ::selection': {
            background: `$${primaryColor}`,
            color: '#000',
            WebkitTextFillColor: '#000',
          },
        }}
      >
        <PostContent>
          <PostContainer>
            <GradientTitle
              css={{
                backgroundImage: `linear-gradient(
                135deg,
                $${primaryColor} 0%,
                $${secondaryColor} 100%
              );`,
              }}
            >
              <RoughNotation
                key={key}
                type="box"
                color="white"
                padding={8}
                iterations={2}
                animationDuration={2000}
                show
                >
              {tagline ? tagline : title}
              </RoughNotation>
            </GradientTitle>
            {children}
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  );
}

const GradientTitle = styled('h1', {
  backgroundSize: '100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
})