import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BoardPage.css";

const instance = axios.create({
  baseURL: "http://192.168.25.19/api",
});

function BoardPage() {
  const [posts, setNewPosts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get("/posts");
      setNewPosts(response.data.posts);
      setIsDataFetched(true);
    }

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  return (
    <div className='container'>
      {posts.map((post) => (
        <div key={post.id}>
          <h1 className='title'>{post.title}</h1>
          <h3 className='author'>{post.author}</h3>
          <p className='content'>{post.content}</p>
          <div className='views-likes'>
            <p>조회수: {post.views}</p>
            <p>좋아요 수: {post.likes}</p>
          </div>
          <div className='comments'>
            <h3>댓글</h3>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id} className='comment-item'>
                  <p className='comment-content'>{comment.content}</p>
                  <p className='comment-author'>{comment.author}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoardPage;
