import Button from '../../Components/Button';
import * as PS from '../../Styles/pages';
import * as S from './styles';

export default function Home() {
  return (
    <PS.Page>
      <S.Wrapper>
        <S.Title>Cookie Store</S.Title>
        <S.ButtonWrapper>
          <Button text="Sign In" large />
          <Button text="Log In" secondary large />
        </S.ButtonWrapper>
      </S.Wrapper>
    </PS.Page>
  );
}
