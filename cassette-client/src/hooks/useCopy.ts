import { useState } from 'react';

type onCopyType = (text: string) => Promise<boolean>;

const useCopy = (): [boolean, onCopyType] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setIsCopied(true);
      return true;
    } catch (error) {
      console.error(error);
      setIsCopied(false);
      return false;
    }
  };

  const onCopy: onCopyType = async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        return true;
      } catch (error) {
        console.error(error);
        setIsCopied(false);
        return copyToClipboard(text);
      }
    } else {
      return copyToClipboard(text);
    }
  };

  return [isCopied, onCopy];
};

export default useCopy;
