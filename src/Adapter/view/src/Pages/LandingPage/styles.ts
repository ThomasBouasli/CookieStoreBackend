import styled from 'styled-components';

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  place-items: center;

  height: 100%;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
