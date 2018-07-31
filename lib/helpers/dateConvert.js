const now = new Date()
const fullYear = now.getFullYear()
const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
const date = now.getDate()

export default () => `${fullYear}${month}${date}`