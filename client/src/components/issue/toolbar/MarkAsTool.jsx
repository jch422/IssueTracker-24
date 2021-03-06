import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { IssuesContext } from '../../../pages/issue-list/IssueListPage';
import DropDownIcon from '../../common/DropDownIcon';
import { axiosAll } from '../../../lib/axios/request';
import { patchIssue, getAllIssues } from '../../../lib/axios/issue';
import { CHANGE_ISSUES_OPEN_CLOSED } from '../../../pages/issue-list/reducer';
import DetailsMenuDropDown from './common/DetailsMenuDropDown';
import DetailsItem from './common/DetailsItem';

const DetailsButton = styled.button`
  font-size: 15px;
  height: 35px;
  margin-right: 0;
  box-sizing: border-box;
  background-color: #e9e9e9;
  border: 0;
  outline: 0;
  color: #586069;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const MarkAsTool = () => {
  const { state, dispatch } = useContext(IssuesContext);
  const { renderedIssues } = state;
  const [isShowMarkAs, setShowMarkAs] = useState(false);
  const onClickDetailsButton = () => setShowMarkAs(!isShowMarkAs);
  const markAsRef = useRef();

  useEffect(() => {
    const clickBody = (e) => {
      if (!markAsRef.current || !markAsRef.current.contains(e.target))
        setShowMarkAs(false);
    };

    document.body.addEventListener('click', clickBody);
    return () => {
      document.body.removeEventListener('click', clickBody);
    };
  }, []);

  const onClickOpenOrClosed = async (e) => {
    const AFTER = e.target.innerText;
    const BEFORE = AFTER === 'open' ? 'closed' : 'open';

    const axioses = [];
    renderedIssues.forEach((issue) => {
      if (issue.checked && issue.state === BEFORE)
        axioses.push(
          patchIssue(issue.id, { state: AFTER, closed_at: new Date() }),
        );
    });
    if (axioses.length > 0) await axiosAll(axioses);
    const issues = await getAllIssues();

    dispatch({ type: CHANGE_ISSUES_OPEN_CLOSED, issues: issues });
    setShowMarkAs(false);
    e.stopPropagation();
  };

  return (
    <>
      <DetailsButton onClick={onClickDetailsButton} ref={markAsRef}>
        Mark as
        <DropDownIcon />
      </DetailsButton>
      {isShowMarkAs && (
        <DetailsMenuDropDown left={'-120px'}>
          <DetailsItem>Actions</DetailsItem>
          <DetailsItem onClick={onClickOpenOrClosed}>open</DetailsItem>
          <DetailsItem onClick={onClickOpenOrClosed}>closed</DetailsItem>
        </DetailsMenuDropDown>
      )}
    </>
  );
};

export default MarkAsTool;
