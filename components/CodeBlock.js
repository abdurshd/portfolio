import React, { useState } from 'react';
import { styled } from '../stitches.config';

const Pre = styled('pre', {
  position: 'relative',
  background: '#1a1a1a',
  padding: '20px',
  borderRadius: '8px',
  overflow: 'auto',
  margin: '20px 0',
  '&:hover button': {
    opacity: 1
  }
});

const CopyButton = styled('button', {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '8px',
  borderRadius: '4px',
  background: '$hover',
  border: 'none',
  cursor: 'pointer',
  color: '$primary',
  opacity: 0,
  transition: 'opacity 0.2s',
});

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof children === 'string') {
      await navigator.clipboard.writeText(children);
    } else if (children?.props?.children) {
      await navigator.clipboard.writeText(children.props.children);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Pre>
      <CopyButton onClick={handleCopy}>
        {copied ? '✓' : '📋'}
      </CopyButton>
      {children}
    </Pre>
  );
};

export default CodeBlock; 