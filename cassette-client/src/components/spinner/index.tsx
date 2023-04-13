import { Spinner, SpinnerContainer } from './style';

export const SpinnerView = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

const SpinnerIcon = () => {
  return <Spinner />;
};

export default SpinnerIcon;
