import React from 'react';

interface NewTagLink {
    href: string;
    children?: Array<React.ReactNode>,
}

const NewTagLink = ({ href, children, ...rest }: NewTagLink) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
);

export default NewTagLink;
