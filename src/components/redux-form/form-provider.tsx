import React from 'react';
import { reduxForm, FormErrors, InjectedFormProps } from 'redux-form';

interface FormData {}

interface FormProviderProps {
  children: React.ReactNode;
  handleSubmit?: (values: FormData) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  formName?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  validate?: (values: any) => FormErrors<any>;
}
const FormProviderBase= ({
   children,
   handleSubmit,
 }: FormProviderProps & InjectedFormProps<FormData, FormProviderProps>) => (
  <form onSubmit={handleSubmit}>
    {children}
  </form>
);

const FormProvider = ({ formName = 'form', validate, ...rest }: FormProviderProps) => {
  const FormWithRedux = reduxForm<FormData, FormProviderProps>({
    validate,
    form: formName,
  })(FormProviderBase);

  return <FormWithRedux {...rest} />;
};

export default FormProvider;
