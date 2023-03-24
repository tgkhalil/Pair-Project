import React, { useState } from "react";
import axiox from "axios";
import "./css/create.css";
function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const add = () => {
    axiox
      .post("http://localhost:8000/blogs", { title: title, content: content })
      .then(() => {
        console.log("added");
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <form className="blog-form">
      <h2>Create New Blog Post</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter title"
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        placeholder="Enter post content"
        required
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>

      <button
        type="submit"
        onClick={() => {
          add();
        }}
      >
        Create Post
      </button>
    </form>
  );
}

export default Create;
