function num2str(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}

export function dateToString(val: Date | string) {
  const d = new Date(val);
  const time = `${num2str(d.getHours())}:${num2str(d.getMinutes())}`;

  const date = num2str(d.getDate());
  const month = num2str(d.getMonth() + 1);
  const year = d.getFullYear();

  const day = `${date}.${month}.${year}`;
  const dayISO = `${year}-${month}-${date}`;

  return { day, time, dayISO };
}
