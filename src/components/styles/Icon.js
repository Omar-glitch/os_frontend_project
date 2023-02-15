import styled from "styled-components";
import Colores from "../../constants/Colores";

const { orange } = Colores;

export const Icon = styled.div`
  position: absolute;
  width: ${props => props.size || '4.375rem'};
  height: ${props => props.size || '4.375rem'};
  padding: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};

  &:hover {
    cursor: pointer;
    &::before {
      position: absolute;
      content: '';
      width: 94%;
      height: 94%;
      border-radius: 12%;
      background: ${orange};
      opacity: .3;
    }
  }

  & > img {
    position: relative;
    width: 100%;
    height: 100%;
  }
`