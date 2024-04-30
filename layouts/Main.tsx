import { styled } from '../stitches.config'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { RoughNotation } from "react-rough-notation";


export default function Main({ children }) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <div>
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
                type="underline"
                color="white"
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
    </div>
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