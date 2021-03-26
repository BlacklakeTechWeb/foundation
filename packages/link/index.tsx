import React, { useState, useEffect } from 'react';
// import Icon from 'components/icon';
import classNames from 'classnames';
import { Link as RRLink } from 'react-router-dom';
import { arrayIsEmpty } from '../_util/array';

import LinkGroup from './Group';
import styles from './style/index.scss';
import NewTagLink from './NewTagLink';
interface LinkProps{
  children?: string | React.ReactNode;
  style?: React.CSSProperties;
  icon?: string;
  iconStyle?: object;
  className: string;
  type: 'error' | 'primary' | 'grey';
  to: string;
  disabled?: boolean;
  iconType?: string;
  onClick?: () => {};
};

function Link(props: LinkProps): React.ReactNode {
  const {
    children,
    style,
    icon,
    iconStyle,
    className,
    type,
    disabled,
    to,
    iconType,
    onClick,
    ...rest
  } = props;

  let _disabled = disabled;
  const disabledStyle = { cursor: 'not-allowed', opacity: 0.3 };
  const linkProps = {
    style: _disabled
      ? { whiteSpace: 'nowrap', ...style, ...disabledStyle }
      : { whiteSpace: 'nowrap', cursor: 'pointer', ...style },
    className: classNames(styles.link, styles[`link-${type || 'primary'}`], className),
    onClick: _disabled ? () => {} : onClick,
  };
  const iconChildren = icon ? (
      <div>{icon}</div>
    // <Icon type={icon} style={{ marginRight: 4, padding: 0, fontSize: 14, ...iconStyle }} iconType={iconType} />
  ) : null;
  return (
    <>
      {to && !_disabled ? (
        <RRLink {...linkProps} to={to} {...rest}>
          {iconChildren}
          {children}
        </RRLink>
      ) : (
        <a {...linkProps} {...rest}>
          {iconChildren}
          {children}
        </a>
      )}
    </>
  );
}

Link.Group = LinkGroup;
Link.NewTagLink = NewTagLink;

export { Link };
