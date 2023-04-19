import React, { useState, useEffect } from "react";
import "./BoardList.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./BoardList.css"; // BoardList.css 파일을 import 합니다.

const instance = axios.create({
  baseURL: "http://192.168.25.19/api",
});

function BoardList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get("/posts");
      setPosts(response.data.posts);
    }

    fetchData();
  }, []);

  const handleCreateClick = () => {
    navigate("/Community/board/create");
  };

  return (
    <div>
      <h1>게시글 목록</h1>
      <button onClick={handleCreateClick} className='create-button'>
        글 작성
      </button>
      <table className='post-table'>
        <thead>
          <tr>
            <th>글 제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>조회수</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link to={`/Community/board/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>{post.views}</td>
              <td>{post.comments.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
