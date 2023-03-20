const formattedDate = (date: string): string => {
  return date ? date.slice(2, 10).replaceAll('-', '.') : '';
};

const formattedCreateDate = (date: Date): string => {
  return date.toLocaleDateString().slice(2).split(' ').join('');
};

const date = {
  formattedDate,
  formattedCreateDate,
};

export default date;
