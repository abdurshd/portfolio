// _app.tsx
import '../public/static/css/global.css'
import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <CommandBar>
          {children}
        </CommandBar>
      </body>
    </html>
  )
}