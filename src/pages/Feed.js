import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "../services/api";
import io from "socket.io-client";

import "./Feed.css";

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

const { REACT_APP_API_URL } = process.env;
const socket = io(REACT_APP_API_URL);

const socketEvents = (setFeed, feed) => {
  socket.on("post", newPost => {
    setFeed([newPost, ...feed]);
  });

  socket.on("like", likedPost => {
    setFeed(feed.map(post =>
        post._id === likedPost._id ? likedPost : post
      )
    );
  });
}

function Feed() {
  const [feed, setFeed] = useState([]);

  const memoizedRegisterToSocket = useCallback(
    () => {
      socketEvents(setFeed, feed)
    }, [feed]
  );

  const memoizedHandleLike = useCallback(
    (id) => {
      api.post(`/posts/${id}/like`);
    },
    [],
  );
  
  useEffect(() => {
    memoizedRegisterToSocket();
    console.log("memoizedRegisterToSocket");
  }, [memoizedRegisterToSocket]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    try {
      async function fetchData() {
        const { data } = await api.get("posts", {
          cancelToken: source.token
        });
        console.log("got response");
    
        setFeed(data);
      }

      fetchData()
    } catch(error) {
      if (axios.isCancel(error)) {
        console.log('request cancelled');
      } else {
        console.error(error)
      }
    }
        
    return () => {
      console.log("unmounting");
      source.cancel();
    }
  }, []);

  return (
    <section id="post-list">
      {feed.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>

            <img src={more} alt="Mais" />
          </header>

          <img src={`${REACT_APP_API_URL}/files/${post.image}`} alt="Mais" />

          <footer>
            <div className="actions">
              <button type="button" onClick={() => memoizedHandleLike(post._id)}>
                <img src={like} alt="" />
              </button>
              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>
            <strong>{post.likes} curtidas</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}

export default Feed;
