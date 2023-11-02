import { ButtonStyle, WrapperButton } from './Button.styled';


export const Button = ({ onClickRender }) => (
  <WrapperButton>
    <ButtonStyle type="button" onClick={onClickRender}>
      Load more
    </ButtonStyle>
  </WrapperButton>
);


