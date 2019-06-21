export default function (date, dateFormat = '%Y-%M-%d %H:%m:%s') {
  if (date) {
    if (!(date instanceof Date)) {
      date = new Date(date.replace('GMT', ''))
    }
    return date.strftime(dateFormat)
  }
  return ''
}
