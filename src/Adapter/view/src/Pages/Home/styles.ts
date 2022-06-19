import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto, 1fr);
  place-items: center;
`;

export const Cookie = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  place-items: center;

  margin-top: 20px;
  padding: 20px;

  width: 100%;
  max-width: 300px;
  height: 75px;

  border-radius: 10px;
  border: 1px solid black;

  box-sizing: border-box;

  img {
    width: 30px;
    height: 30px;
  }
`;
