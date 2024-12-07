import ShortcutError from "./ShortcutError";
import { Box } from './Box'
import { styled } from '../stitches.config'
import Image from 'next/image'

const ErrorContainer = styled(Box, {
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px'
})

const ErrorTitle = styled('h1', {
  color: '$primary',
  fontSize: '2.5rem',
  marginBottom: '1rem',
})

const ErrorDescription = styled('p', {
  color: '$secondary',
  fontSize: '1.1rem',
  marginBottom: '2rem',
})

export default function ErrorMessage({ code }) {
  let title = "Oops! An Error Occurred"
  let description = "Something went wrong on our end. Please try again later."

  if (code === 404) {
    title = "Page Not Found"
    description = "The page you're looking for doesn't exist or has been moved."
  }

  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{description}</ErrorDescription>
      <ShortcutError />
    </ErrorContainer>
  )
}