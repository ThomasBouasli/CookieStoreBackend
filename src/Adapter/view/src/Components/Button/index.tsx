import * as S from './styles';

type props = {
  text?: string;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  onClick?: () => void;
};

export default function Button({
  text,
  primary,
  secondary,
  small,
  medium,
  large,
  onClick
}: props) {
  return (
    <S.Button
      primary={primary}
      secondary={secondary}
      small={small}
      medium={medium}
      large={large}
      onClick={onClick}
    >
      {text}
    </S.Button>
  );
}
