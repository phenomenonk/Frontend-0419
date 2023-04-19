import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BoardModify.css";

const instance = axios.create({
  baseURL: "http://192.168.25.19/api",
});

function BoardModify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams(); // URL 파라미터로 받아온 게시글 ID 값

  useEffect(() => {
    async function fetchPostData() {
      const response = await instance.get(`/posts/${postId}`);
      const post = response.data.post;
      setTitle(post.title);
      setContent(post.content);
    }
    fetchPostData();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await instance.put(`/posts/${postId}`, {
      title: title,
      content: content,
    });

    navigate("/Community");
  };

  return (
    <div className='modify-container'>
      <h1>게시글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>제목</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='content'>내용</label>
          <textarea
            id='content'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type='submit'>수정</button>
      </form>
    </div>
  );
}

export default BoardModify;
