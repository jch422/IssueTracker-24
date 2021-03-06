import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import './login-form.scss';
import { useHistory } from 'react-router-dom';
import { getCookie, deleteCookie } from '../../../utils/cookie';
import svg from '../../../utils/svg';
import { setToken } from '../../../utils/token';
import { AppContext } from '../../../App';
import { getCurrentUser } from '../../../lib/axios/user';

const LoginFormContainer = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setCurrentUser } = useContext(AppContext);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useLayoutEffect(() => {
    const token = getCookie('jwt');

    if (token) {
      setToken(token);
      deleteCookie('jwt');
      (async function () {
        const user = await getCurrentUser();
        setCurrentUser(user);
      })();
      history.push('/issues');
    }
  }, []);

  return (
    <>
      <form className="input-container">
        <div>
          <div className="input-title">아이디</div>
          <input
            type="text"
            className="input-value"
            value={id}
            onChange={onChangeId}
          />
          <div className="input-title">패스워드</div>
          <input
            type="text"
            className="input-value"
            value={password}
            onChange={onChangePassword}
          />
          <div className="input-common-button button">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </form>
      <div className="input-github-button button">
        <a
          href={
            process.env.NODE_ENV === 'development'
              ? `${process.env.DEV_AUTH_URL}`
              : `${process.env.PROD_AUTH_URL}`
          }
        >
          <button>
            Sign in with GitHub
            {svg['GithubLogo']}
          </button>
        </a>
      </div>
    </>
  );
};

export default LoginFormContainer;
