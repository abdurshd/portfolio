import ErrorMessage from '../components/ErrorMessage'
import Error from '../layouts/Error'
import Head from 'next/head'

function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Abdurashid Abarov</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>
      <ErrorMessage code={404} />
    </>
  )
}

Custom404.Layout = Error

export default Custom404