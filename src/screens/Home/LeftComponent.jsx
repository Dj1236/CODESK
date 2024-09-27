import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { ModalContext } from "../../context/ModalContext";

const StyledLeftComponent = styled.div`
  width: 30%;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: static;
    padding: 1rem;
  }
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 2rem;
`;

const MainHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const SubHeading = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  text-align: center;
`;

const AddNewButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const LeftComponent = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <StyledLeftComponent>
      <Logo src={logo} alt="CodeDesk Logo" />
      <MainHeading>CodeDesk</MainHeading>
      <SubHeading>Code. Compile. Debug.</SubHeading>
      <AddNewButton
        onClick={() =>
          openModal({
            show: true,
            modalType: 3,
            identifiers: {
              folderId: "",
              cardId: "",
            },
          })
        }
      >
        <span>+</span> Create New Playground
      </AddNewButton>
    </StyledLeftComponent>
  );
};

export default LeftComponent;
