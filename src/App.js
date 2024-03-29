// App.js

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import VideoPlayer from "./components/VideoPlayer";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

const socket = io(process.env.REACT_APP_BASEURL); // Connect to WebSocket server

const App = () => {
  const [comments, setComments] = useState([]);
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  useEffect(() => {
    // Listen for new comments from WebSocket
    socket.on("newComment", (newComment) => {
      console.log(newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.off("newComment");
    };
  }, [comments]);

  const handleCommentSubmit = (comment) => {
    // Emit new comment to WebSocket server
    socket.emit("createComment", { text: comment, timestamp: videoTimestamp });
  };

  const handleVideoTimestampChange = (timestamp) => {
    setVideoTimestamp(Math.floor(timestamp));
    // Fetch comments based on the new timestamp from the backend API
    fetchComments(timestamp);
  };

  const fetchComments = async (timestamp) => {
    try {
      const response = await fetch(
        `http://localhost:5000/comments?timestamp=${Math.floor(timestamp)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      if (data?.length > 0) {
        // Filter out comments that already exist in state
        const filteredData = data.filter(
          (comment) => !comments.some((c) => c._id === comment._id)
        );
        setComments((prevComments) => [...prevComments, ...filteredData]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center md:justify-around md:px-4 items-center box-border gap-4 overflow-y-hidden">
      <h1 className="text-lg md:text-3xl font-bold underline text-center">
        Task 3 : Video Application with Chat
      </h1>
      <div className="flex md:h-[70vh] w-[100%] flex-col md:flex-row gap-2 md:gap-0">
        <VideoPlayer onTimestampChange={handleVideoTimestampChange} />
        <div className="flex md:hidden w-full items-center justify-center">
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
        <CommentList comments={comments} />
      </div>
      <div className="hidden md:flex">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default App;
