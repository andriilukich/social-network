export const required = value => {
  if (!value) return 'This field is required';
  return undefined;
};

export const maxLength = (num) => value => {
  if (value && value.length > num) return `This field must have maximum ${num} characters`;
  return undefined;
};