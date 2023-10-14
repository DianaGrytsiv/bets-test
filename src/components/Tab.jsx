import React from 'react';
import styled, { css } from 'styled-components';

export default function Tab({ title, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props}>{title}</Button>
  );
}

const Button = styled.button`
  background: #403c3d;
  border: none;
  border-radius: 10px;
  color: #bababa;
  width: 200px;
  height: 45px;
  font-size: 18px;
  cursor: pointer;

  ${(props) => props.isActive
    && css`
       background: #2e2a2b;
       border: 3px solid #54b754;
       color: white;
    `};

`;
