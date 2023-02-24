import { useState } from 'react';

type onCopyType = (text: string) => Promise<boolean>;

const useCopy = (): [boolean, onCopyType] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const onCopy: onCopyType = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setIsCopied(true);
      }

      return true;
    } catch (error) {
      console.error(error);
      setIsCopied(false);

      return false;
    }
  };

  return [isCopied, onCopy];
};

export default useCopy;
