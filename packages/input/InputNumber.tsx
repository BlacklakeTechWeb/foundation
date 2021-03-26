import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps as  AntInputNumberProps} from 'antd';

interface InputNumberProps extends AntInputNumberProps {

}

const InputNumber = (props: InputNumberProps) => {
  const { placeholder, ...rest } = props;
  return <AntInputNumber placeholder={placeholder || '请填写'} {...rest} />;
};
  
  export default InputNumber;