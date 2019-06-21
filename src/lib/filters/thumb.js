export default function (url, thumbStyleName = '150x150') {
  if (url) {
    // 90x90 150x150
    return `${url}?x-oss-process=style/${thumbStyleName}`
  }
  return ''
}
