// ShopPage.styles.ts
import styled from "styled-components";

export const ShopPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #f1f8e9;
  padding-top: 30px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 30px 20px 10px;
  border-bottom: 1px solid rgba(72, 69, 69, 0.7);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffc857;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Stats = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(145deg, #16a085, #1abc9c);
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
`;

export const FormWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const FormButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px;
`;

export const CompanionWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 10;
`;

export const InventoryButton = styled.button`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(145deg, #3498db, #2980b9);
  color: white;
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #2980b9, #3498db);
    transform: translateX(-50%) scale(1.05);
  }

  &:active {
    background: #1e5799;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`;
