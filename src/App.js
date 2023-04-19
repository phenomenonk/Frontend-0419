import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./lettrip-web/Header/Header";
import Navbar from "./lettrip-web/Home/Navbar";

//페이지 경로 설정
import Home from "./lettrip-web/Home/Home"; // ~:8080/ 홈 화면 (미정)
import Login from "./lettrip-web/Header/Login"; // ~:8080/Login 로그인 화면
import Sign from "./lettrip-web/Header/Sign"; // ~:8080/Sign 회원가입 화면
import BoardList from "./lettrip-web/Service/Board/BoardList"; // ~:8080/Community 게시판 전체 목록 화면
import BoardCreate from "./lettrip-web/Service/Board/BoardCreate"; // ~:8080/Community/board/create 게시판 글 등록 화면
import BoardModify from "./lettrip-web/Service/Board/BoardModify"; // ~:8080/Community/board/modify 게시판 글 수정 화면
import BoardPage from "./lettrip-web/Service/Board/BoardPage"; // ~:8080/Community/board 게시판 글 상세 화면

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Sign' element={<Sign />} />
          <Route path='/Community' element={<BoardList />} />
          <Route path='/Community/board/create' element={<BoardCreate />} />
          <Route path='/Community/board/modify' element={<BoardModify />} />
          <Route path='/Community/board' element={<BoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
