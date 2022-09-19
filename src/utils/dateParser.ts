export function dateParser(date: string) {
  const ts = new Date(date);
  return ts.getDate() + "/" + (ts.getMonth() + 1) + "/" + ts.getFullYear();
}

export function dateParserForInputs(date?: string) {
  if (!date) return "";
  const ts = new Date(date);
  let parsedDate = ts.getFullYear().toString();

  if (ts.getMonth() + 1 < 10) parsedDate += "-0" + (ts.getMonth() + 1);
  else parsedDate += "-" + (ts.getMonth() + 1);

  if (ts.getDate() < 10) parsedDate += "-0" + ts.getDate();
  else parsedDate += "-" + ts.getDate();

  return parsedDate;
}
