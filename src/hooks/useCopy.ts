import { useState } from 'react';

type onCopyType = (text: string) => Promise<boolean>;

const useCopy = (): [boolean, onCopyType] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

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
