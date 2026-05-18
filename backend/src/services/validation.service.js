export const parseDate = (value) => {
  const dateString = String(value).trim();
  const match = /^\d{4}-\d{2}-\d{2}$/.exec(dateString);
  if (!match) {
    return null;
  }

  const start = new Date(`${dateString}T00:00:00.000Z`);
  const end = new Date(`${dateString}T23:59:59.999Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  return { start, end, date: dateString };
};
