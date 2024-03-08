import React, { useEffect, useState } from "react";
import "../CSS/post.css";
import person from "../image/person.jpg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/ToolAction";
import axios from "axios";

const Post = () => {
  const [page, setPage] = useState();
  const [cardData, setCardData] = useState([]);
  const nav = useNavigate();
  const posts = useSelector((state) => state.getPost.posts);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=40&_page=${page}`
      );
      const mainData = await response.json();
      dispatch(getPosts(mainData));
    } catch (error) {
      console.log(error);
    }
  };
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }
  };

  const handleInfinityScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      setCardData((prev) => [...prev, ...posts]);
    }
  }, [posts]);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);
  }, []);

  return (
    <div className="post-container">
      {cardData.length == 0 ? (
        <div>Loading....</div>
      ) : (
        cardData?.map((post, index) => (
          <div className="post-card" key={index}>
            <div className="image">
              <img src={person} alt="post photo" />
            </div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-footer">
              <span className="author">ID: {post.id}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
