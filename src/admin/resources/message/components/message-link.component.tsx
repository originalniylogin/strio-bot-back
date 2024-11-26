import type React from 'react';

interface MessageLinkProps {
  record: {
    params: {
      voiceLink: string | null;
    };
  };
}

const MessageLink: React.FC<MessageLinkProps> = ({
  record: {
    params: { voiceLink },
  },
}) => {
  return voiceLink !== null ? (
    <a href={voiceLink} target="_blank" rel="noreferrer" download={false}>
      Voice Link
    </a>
  ) : null;
};

export default MessageLink;
