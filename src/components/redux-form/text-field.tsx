import React from 'react';
import { Field } from 'redux-form';
import { FieldRenderProps } from 'react-final-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

const FieldProps = {
  name: 'name',
  label: 'Label',
  type: 'text',
};

interface FormTextFieldProps extends FieldRenderProps<string, HTMLElement>, Omit<TextFieldProps, 'name' | 'onChange' | 'value'> {
}

const MuiTextField = ({ input, meta, ...rest }: FormTextFieldProps) => (
  <TextField
    {...input}
    {...rest}
    fullWidth
    error={meta.touched && Boolean(meta.error)}
    helperText={meta.touched && meta.error ? meta.error : null}
  />
);

const RFTextField: React.FC<typeof FieldProps> = ({ name, label, type, ...rest }) => (
  <Field
    {...rest}
    name={name}
    label={label}
    type={type}
    component={MuiTextField}
  />
);

export default RFTextField;
