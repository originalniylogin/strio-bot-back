import type React from 'react';

interface MessageTextProps {
  record: {
    params: {
      textContent: string;
    };
  };
}

const MessageText: React.FC<MessageTextProps> = ({
  record: {
    params: { textContent },
  },
}) => {
  return <p style={{ whiteSpace: 'pre-wrap' }}>{textContent}</p>;
};

export default MessageText;
