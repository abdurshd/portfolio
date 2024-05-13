import '../public/static/css/global.css'
import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children } : {children: any} ) => children

export default function MyApp({ Component, pageProps } : {Component: any, pageProps: any}) {
  const Layout = typeof Component.Layout === 'function' ? Component.Layout : Noop

  return (
      <Layout>
        <CommandBar>
          <Component {...pageProps} />
        </CommandBar>
      </Layout>
  )
}