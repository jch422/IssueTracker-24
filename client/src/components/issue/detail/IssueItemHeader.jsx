import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #f1f8ff;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #e8e9ec;
  padding-left: 10px;
  padding-top: 10px;
  box-sizing: border-box;

  &:before {
    position: absolute;
    display: block;
    content: '';
    width: 0;
    height: 0;
    margin-left: -20px;
    margin-top: 11px;
    transform: scale(3);
    border-right-color: #e8e9ec;
    border-left-color: rgba(255, 255, 255, 0);
    border-top-color: rgba(255, 255, 255, 0);
    border-bottom-color: rgba(255, 255, 255, 0);
    border-style: solid solid outset;
  }
`;

const IssueItemHeader = ({ children }) => {
  return <Header>{children}</Header>;
};

export default IssueItemHeader;
