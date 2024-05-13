import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ShortcutError() {
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    if (isMobile) {
      return <Link href="/" className="btn-transparent btn-primary" legacyBehavior>
        Tap to go home →
      </Link>
    }

    return <Link href="/" className="btn-transparent btn-primary" legacyBehavior>
      Press <kbd>G</kbd> <kbd>H</kbd> to go home →
    </Link>
  }

  return <div />
}