import React, { useState } from "react";
import "./BoardCreate.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoardCreate.css";

const instance = axios.create({
  baseURL: "http://192.168.25.19/api",
});

function BoardCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmResult = window.confirm("게시판 글을 등록하시겠습니까?");
    if (!confirmResult) return;

    const response = await instance.post("/posts", {
      title: title,
      content: content,
    });

    navigate(`/Community/board/${response.data.post.id}`);
  };

  return (
    <div className='board-create-container'>
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>제목</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>내용</label>
          <textarea
            id='content'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type='submit'>등록</button>
      </form>
    </div>
  );
}

export default BoardCreate;
