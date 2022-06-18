import styled from 'styled-components';

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;

  small?: boolean;
  medium?: boolean;
  large?: boolean;
};

export const Button = styled.button<ButtonProps>`
  width: ${(props) => {
    if (props.small) {
      return '100px';
    }
    if (props.medium) {
      return '200px';
    }
    if (props.large) {
      return '300px';
    }

    return '200px';
  }};
  height: 50px;

  border-radius: 10px;
  border: none;

  background-color: ${(props) => {
    if (props.primary) {
      return '#D5A150';
    }
    if (props.secondary) {
      return '#AD712C';
    }

    return '#D5A150';
  }};

  color: white;

  font-family: Dosis;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.1);
  }
`;
