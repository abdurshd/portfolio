import Link from 'next/link'
import { useState, useEffect } from 'react'
import { styled } from '../stitches.config'

const StyledLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  color: '$primary',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '$borderRadius',
  border: '1px solid $primary',
  transition: 'all 0.2s ease',
  marginTop: '20px',
  
  '&:hover': {
    background: '$primary',
    color: '$background'
  },
  
  'kbd': {
    background: '$hover',
    padding: '2px 6px',
    borderRadius: '4px',
    margin: '0 4px',
    fontSize: '14px'
  }
})

export default function ShortcutError() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

  return (
    <Link href="/" passHref legacyBehavior>
      <StyledLink>
        {isMobile ? 'Tap to go home →' : 'Press G H to go home →'}
      </StyledLink>
    </Link>
  )
}