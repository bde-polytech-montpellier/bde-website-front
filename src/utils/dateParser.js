function dateParser(date) {
  const ts = new Date(date);
  return ts.getDate() + "/" + (ts.getMonth() + 1) + "/" + ts.getFullYear();
}

function dateParserForInputs(date) {
  if (!date) return ""
  const ts = new Date(date);
  let parsedDate = ts.getFullYear();

  if (ts.getMonth() + 1 < 10) parsedDate += "-0" + (ts.getMonth() + 1);
  else parsedDate += "-" + (ts.getMonth() + 1);

  if (ts.getDate() < 10) parsedDate += "-0" + ts.getDate();
  else parsedDate += "-" + ts.getDate();

  return parsedDate;
}

module.exports = {
  dateParser,
  dateParserForInputs,
};
