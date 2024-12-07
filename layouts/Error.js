import { styled } from '../stitches.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Wrapper } from '../components/Wrapper'

const ErrorMain = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: '50px 20px',
  textAlign: 'center',
})

export default function Error({ children }) {
  return (
    <Wrapper>
      <Navbar />
      <ErrorMain>{children}</ErrorMain>
      <Footer />
    </Wrapper>
  )
} 