import * as React from 'react';
import classNames from 'classnames';
import styles from './style/index.scss';

interface propsType{
  children?: Array<React.ReactNode>,
  className?: string,
};

export default function Group(props: propsType): React.ReactNode {
  const { children, className, ...rest } = props;
  return (
    <div className={classNames(styles.linkGroup, className)} {...rest}>
      {children}
    </div>
  );
}
