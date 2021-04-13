import React from 'react';
import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';

interface AlertProps extends AntAlertProps {
  closeText?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
}

const Alert = (props: AlertProps) => {

    const { message, description, closeText, ...rest } = props || {};
    const newProps = {
      message: message,
      description: description,
      closeText: closeText,
      ...rest,
    };
    return <AntAlert {...newProps} />;
  };

export default Alert
