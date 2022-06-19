import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import * as PS from '../../Styles/pages';
import * as S from './styles';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PS.Page>
      <S.Wrapper>
        <PS.Title>Cookie Store</PS.Title>
        <S.ButtonWrapper>
          <Button text="Sign In" large onClick={() => navigate('sign-in')} />
          <Button
            text="Log In"
            secondary
            large
            onClick={() => navigate('log-in')}
          />
        </S.ButtonWrapper>
      </S.Wrapper>
    </PS.Page>
  );
}
