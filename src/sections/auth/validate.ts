export const validate = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};
  const requiredFields: string[] = [
    'email',
    'password',
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};
