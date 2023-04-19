import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://192.168.25.19/api",
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // access token 가져오기
  function getAccessToken() {
    const name = "accessToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let c = cookieArray[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // access token 쿠키에 저장
  function setAccessToken(token) {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24시간 유지
    const expires = "expires=" + date.toUTCString();
    document.cookie = `accessToken=${token}; ${expires}; path=/`;
  }

  // access token 삭제
  function removeAccessToken() {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  useEffect(() => {
    // 새로고침 이벤트 감지
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      // 토큰 정보 검증
      const decodedToken = jwt_decode(token);
      const now = new Date().getTime() / 1000; // 초 단위 시간 계산
      if (decodedToken.exp < now) {
        console.error("토큰 만료");
        window.alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        removeAccessToken();
      } else if (decodedToken.iss !== "http://192.168.25.19/api") {
        console.error("조작된 토큰");
        window.alert("올바르지 않은 인증 정보입니다. 다시 로그인해주세요.");
        removeAccessToken();
      } else {
        // 토큰 정보를 쿠키에 다시 저장
        setAccessToken(token);
      }
    }
  }, []);

  const handleBeforeUnload = (e) => {
    const token = getAccessToken();
    if (token) {
      // 토큰 정보 검증
      const decodedToken = jwt_decode(token);
      const now = new Date().getTime() / 1000; // 초 단위 시간 계산
      if (decodedToken.exp > now) {
        // 만료되지 않은 경우 토큰 정보를 쿠키에 다시 저장
        setAccessToken(token);
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    // 서버로 데이터 보낼 준비
    const data = {
      username,
      password,
    };

    // API call 만들기
    instance
      .post("/login", data)
      .then((response) => {
        console.log("인증 성공");
        const token = response.data.accessToken; // 응답에 포함된 토큰 정보 저장

        // 토큰 정보 검증
        const decodedToken = jwt_decode(token);
        const now = new Date().getTime() / 1000; // 초 단위 시간 계산
        if (decodedToken.exp < now) {
          console.error("토큰 만료");
          window.alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          return;
        }
        if (decodedToken.iss !== "http://192.168.25.19/api") {
          console.error("조작된 토큰");
          window.alert("올바르지 않은 인증 정보입니다. 다시 로그인해주세요.");
          return;
        }

        // 토큰 정보를 쿠키에 저장
        document.cookie = `accessToken=${token}; path=/`;
        navigate("/");
      })
      .catch((error) => {
        console.error("로그인 검증 실패:", error);
        window.alert("로그인에 실패했습니다. 다시 확인해주세요.");
        window.location.reload();
      });
  };

  // 모든 HTTP 응답에 대해 처리하는 interceptors 설정
  instance.interceptors.response.use(
    (response) => {
      // 상태 코드가 200인 경우
      return response;
    },
    (error) => {
      // 상태 코드가 200이 아닌 경우
      console.error("에러 발생:", error);
      if (error.response.status === 401) {
        // 인증 실패
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return (
    <form className='Login_container' onSubmit={handleLoginFormSubmit}>
      <input
        className='Login_username'
        type='text'
        id='username'
        name='username'
        placeholder='아이디를 입력하세요'
        required
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        className='Login_password'
        type='password'
        id='password'
        name='password'
        placeholder='비밀번호를 입력하세요'
        required
        value={password}
        onChange={handlePasswordChange}
      />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default Login;
