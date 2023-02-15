import styled, { css } from "styled-components"
import Colores from "../../constants/Colores"

const { orange } = Colores;
const minWidthModal = '15.625rem'

const webkitScrollbarStyle = css`
  &::-webkit-scrollbar {
    background: white;
    width: 0.625rem;
    height: 0.625rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${orange};
    border-radius: 0.5rem;
  }
`

const HoverBtn = css`
  &:hover {
    filter: brightness(1.05);
    cursor: pointer;
  }
`

export const ModalContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 10%;
  left: 20%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0.625rem;
  min-width: ${minWidthModal};
  padding-top: 2.625rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem gray;
`
  
export const TabTitle = styled.div`
  position: absolute;
  min-width: ${minWidthModal};
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background: ${orange};
  color: white;
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
`

export const FilesContainer = styled.div`
  overflow-y: scroll;
  resize: both;
  min-width: ${minWidthModal};
  width: 21.875rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;

  ${webkitScrollbarStyle}
`

export const ArrowButton = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  display: grid;
  place-items: center;
  color: white;
  background: ${props => props.disabled ? 'lightgray' : orange};

  ${HoverBtn}
`

export const SearchView = styled.p`
  background: ${orange};
  display: flex;
  align-items: center;
  color: white;
  flex: 1;
  padding: 0 0.625rem;
  border-radius: 0.4375rem;
`

export const FolderFile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 0.125rem 0;
  padding: 0.25rem 0.5rem;

  & > p {position: relative;}
  
  & > img {
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.25rem;
  }
  
  &:hover {
    &:before {
      border-radius: 0.25rem;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 100%;
      background: ${orange};
      opacity: .16;
    }
  }
`

export const TextContentArea = styled.textarea`
  width: 18.125rem;
  height: 12.5rem;
  margin-bottom: 1rem;
  outline: none;
  min-width: ${minWidthModal};
  ${webkitScrollbarStyle}
`

export const CloseModalBtn = styled.div`
  background: white;
  color: ${orange};
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;

  ${HoverBtn}
`

export const ModalBtn = styled.div`
  padding: 6px 1rem;
  color: white;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  background: ${orange};

  ${HoverBtn}
`

export const ContextContainer = styled.article`
  position: fixed;
  min-width: 7.5rem;
  left: ${props => props.l + 'px'};
  top: ${props => props.t + 'px'};
  background: black;
  padding: 0.625rem 0;
  z-index: 10;
  color: white;
  border: 0.125rem solid black;
  display: flex;
  flex-direction: column;

  & > span {
    padding: 0.125rem 0.5rem;
  }

  & > span:hover {
    background: white;
    color: black;
    cursor: pointer;
  }
`