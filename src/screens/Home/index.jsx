import React, { useContext } from "react";
import styled from "styled-components";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContext";

const StyledHome = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Home = () => {
  const { isOpenModal } = useContext(ModalContext);

  return (
    <StyledHome>
      <LeftComponent />
      <RightComponent />
      {isOpenModal.show && <Modal />}
    </StyledHome>
  );
};

export default Home;
