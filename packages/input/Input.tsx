import React, { useState } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

interface InputProps extends AntInputProps {
    value?: any;
    eye?: boolean;
    trim?: boolean;
    onChange?: (res) => {};
    onBlur?: (res) => {};
    placeholder?: string;
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    autocomplete?: string;
};

const Input = (props: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { eye, placeholder, ...rest } = props;
    let { autocomplete, type } = props;

    const getTrimValue = value => {
      return value && value.replace(
        /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
        '',
      )
    }
    const onChange = e => {
      const { onChange } = props;
      const value = e.target.value;
      let result = getTrimValue(value);
      if (onChange) {
        onChange(result);
      }
    };

    const onBlur = e => {
      const { trim, onBlur, onChange } = props;
      if (trim) {
        const value = e.target.value;
        let result = getTrimValue(value);
        e.target.value = result.trim();
        if (onChange) {
          onChange(e.target.value);
        }
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    const onPressEnter = e => {
      const { trim, onPressEnter, onChange } = props;
      if (trim) {
        const value = e.target.value;
        let result = getTrimValue(value);
        e.target.value = result.trim();
        if (onChange) {
          onChange(e.target.value);
        }
      }
      if (onPressEnter) {
        onPressEnter(e);
      }
    };

    if (eye) {
      rest.addonAfter = (
        <div
          // type={`${showPassword ? 'eye-o' : 'eye'}`}
          onClick={() => setShowPassword(!showPassword)}
        > EyeIcon</div>
      );
      type = showPassword ? rest.type : 'password';
      autocomplete = 'new-password';
    }

    return (
        <AntInput  
          autocomplete={autocomplete || "off"}
          placeholder={placeholder || '请填写'}
          onBlur={onBlur}
          onPressEnter={onPressEnter}
          onChange={onChange}
          type={type || 'text'}
          {...rest} 
      />
    )
};

Input.defaultProps = {
  autocomplete: 'off',
  placeholder: '请填写'
}

Input.TextArea = AntInput.TextArea;
Input.Search = AntInput.Search;
Input.Group = AntInput.Group;
Input.Password = AntInput.Password;

export default  Input ;