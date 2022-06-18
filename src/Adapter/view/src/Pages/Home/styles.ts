import styled from 'styled-components';

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  place-items: center;

  height: 100%;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: Dosis;
  font-size: 48px;
  font-weight: 700;
  line-height: 61px;
  letter-spacing: 0em;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
