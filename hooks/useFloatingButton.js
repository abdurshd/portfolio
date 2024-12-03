import { styled } from '../stitches.config'
import { useRouter } from 'next/router'
import { RoughNotation } from "react-rough-notation"
import { useState } from 'react'

const FloatingBackButton = styled('button', {
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  background: 'transparent',
  color: '$primary',
  border: 'none',
  padding: '12px 24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease-in-out',
  zIndex: 10,
  fontSize: '16px',
  
  '&:hover': {
    transform: 'translateY(-2px)',
  }
})

export function useFloatingButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const FloatingButton = ({ path, buttonText }) => (
    <FloatingBackButton 
      onClick={() => router.push(path)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RoughNotation
        type="circle"
        show={isHovered}
        color="var(--colors-primary)"
        strokeWidth={2}
        padding={8}
        animationDuration={300}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
          <i className="ri-arrow-left-line" />
          {buttonText}
        </div>
      </RoughNotation>
    </FloatingBackButton>
  )

  return { FloatingButton }
} 