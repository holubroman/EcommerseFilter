
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Field } from 'react-final-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
};

const FinalFormField = ({ name, label, type, ...other }: Props) => (
    <Field
      name={name}
      render={({ input, meta }) => (
        <TextField
          {...input}
          label={label}
          type={type}
          fullWidth
          error={meta.touched && !!meta.error}
          helperText={meta.touched ? meta.error : ''}
          {...other}
        />
      )}
    />
  );

export default FinalFormField;
