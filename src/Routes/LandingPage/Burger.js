import React, { useState } from 'react';
import styled from 'styled-components';

const BurgerMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    div {
      flex-direction: column;
      width: 2rem;
      height: 0.25rem;
      background-color: ${({ open }) => (open ? '#ccc' : '#333')};
      border-radius: 10px;
      transform-origin: 1px;
      transition: all 0.3s

      &:nth-child(1) {
        transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      }
      &:nth-child(2) {
        transform: ${({ open }) =>
          open ? 'translateX(100%)' : 'translateX(0)'};
        opacity: ${({ open }) => (open ? 0 : 1)};
      }
      &:nth-child(3) {
        transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      }
    }
  }
`;
const Burger = () => {
  const [Burger, setBurger] = useState(false);
  return (
    <BurgerMenu open={Burger} onClick={() => setBurger(!Burger)}>
      <div />
      <div />
      <div />
    </BurgerMenu>
  );
};

export default Burger;
