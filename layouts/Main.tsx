import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { RoughNotation } from "react-rough-notation";


export default function Main({ children } :{ children: React.ReactElement }) {
  const { title, tagline, primaryColor } = children?.props

  return (
    <div className='flex flex-col min-h-screen relative z-0'>
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
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[primaryColor] to-[secondaryColor]">
              <RoughNotation
                type="underline"
                color="white"
                show
                >
              {tagline ? tagline : title}
              </RoughNotation>
            </h1>
            {children}
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </div>
  );
}