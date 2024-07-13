function num2str(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}

export function dateToString(date: Date | string) {
  const d = new Date(date);
  const time = `${num2str(d.getHours())}:${num2str(d.getMinutes())}`;
  const day = `${num2str(d.getDate())}.${num2str(
    d.getMonth() + 1
  )}.${d.getFullYear()}`;

  return { day, time };
}
