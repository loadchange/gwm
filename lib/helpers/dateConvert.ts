const now: Date = new Date();
const fullYear: number = now.getFullYear();
const month = `${now.getMonth() >= 9 ? '' : '0'}${now.getMonth() + 1}`;
const date = `0${now.getDate()}`;

export default () => `${fullYear}${month}${date}`;
