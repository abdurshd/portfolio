import ErrorMessage from '../components/ErrorMessage'
import Main from '../layouts/Main'

function Custom500() {
  return <ErrorMessage />
}

Custom500.Layout = Main

export default Custom500