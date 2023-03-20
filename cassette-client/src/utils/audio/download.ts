const downloadFile = (file: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = file;
  downloadLink.download = 'audio.wav';
  downloadLink.target = '_blank';
  downloadLink.rel = 'noopener noreferrer';
  window.open(downloadLink.href);
};

export default downloadFile;
