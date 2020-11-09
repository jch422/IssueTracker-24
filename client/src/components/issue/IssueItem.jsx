import React, { useContext, memo, useMemo } from 'react';
import styled from 'styled-components';
import IssueLogo from './IssueLogo';
import IssueContent from './IssueContent';
import { IssuesContext } from '../../pages/issue-list/IssueListPage';
import { CHECK_ISSUE, UNCHECK_ISSUE } from '../../pages/issue-list/reducer';

const IssueItemWrapper = styled.div`
  width: 80%;
  height: 75px;
  font-size: 14px;
  display: flex;
  margin: 0 auto;
  padding: 20px;
  &:hover {
    background-color: #e9e9e9;
  }
  border: 1px solid #eaecef;
  box-sizing: border-box;
`;
const IssueItem = memo(({ issue }) => {
  const { dispatch } = useContext(IssuesContext);

  const onCheckBoxChange = (e) => {
    if (e.target.checked) {
      dispatch({ type: CHECK_ISSUE, id: issue.id });
    } else {
      dispatch({ type: UNCHECK_ISSUE, id: issue.id });
    }
  };

  return useMemo(
    () => (
      <>
        <IssueItemWrapper>
          <input
            type="checkbox"
            onChange={onCheckBoxChange}
            checked={issue.checked}
          />
          <IssueLogo issueState={issue.state} />
          <IssueContent issue={issue} />
        </IssueItemWrapper>
      </>
    ),
    [issue.checked, issue],
  );
});

export default IssueItem;
