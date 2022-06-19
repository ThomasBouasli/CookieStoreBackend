import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  box-sizing: border-box;
`;

export const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr) 2fr;
  place-items: center;
  grid-row-gap: 40px;

  height: 100%;

  * {
    width: 100%;
    max-width: 300px;
  }
`;
