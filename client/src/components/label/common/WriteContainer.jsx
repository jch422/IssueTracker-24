import React from 'react';
import styled from 'styled-components';

const WriteWrapper = styled.div`
  margin-bottom: ${(props) => (props.edit ? '0px' : '20px')};
  background-color: #f6f8fa;
  border: 1px solid #eaecef;
  border-radius: ${(props) => (props.isCreate ? '7px' : 'none')};
  height: 146px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const WriteContainer = ({ edit, children, isCreate }) => {
  return (
    <WriteWrapper edit={edit} isCreate={isCreate}>
      {children}
    </WriteWrapper>
  );
};

export default WriteContainer;
