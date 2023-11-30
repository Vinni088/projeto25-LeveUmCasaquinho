import React from 'react';
import styled from 'styled-components';
import casaco from '../assets/casaco.png';

const Logo = () => {
    return (
        <LogoDiv>
            <img
                src={casaco}
                alt="Logomarca 'Levo um casasquinho' TM "
                title="Logomarca 'Levo um casasquinho' TM "
            />
            <p>
                Levo um <br />casaquinho?
            </p>
        </LogoDiv>
    );
};

export default Logo;

const LogoDiv = styled.div`
  padding: 4.2vmin;
  height: 120px;
  width: 100%;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 10vmin;
    width: 10vmin;
  }
  p {
    font-family: 'Poppins', 'sans-serif';
    font-size: 3.6vmin;
    font-weight: 700;
    text-align: left;
    color: #222222;
  }
`