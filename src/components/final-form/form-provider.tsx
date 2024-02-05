import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Form } from 'react-final-form';

type Props = {
  children: React.ReactNode;
  onSubmit?: VoidFunction;
};

export default function FinalFormProvider({ children, onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {children}
        </form>
      )}
    </Form>
  );
};

