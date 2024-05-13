export default function stripHtml(str: string) {
  return str?.replace( /(<([^>]+)>)/ig, '')
}