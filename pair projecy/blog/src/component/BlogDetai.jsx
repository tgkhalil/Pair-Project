import React, { useState } from "react";
import axios from "axios";
import "./css/postdea.css";
import AllBlogs from "./AllBlogs";
function BlogDetai({ data, fn }) {
  const [view, setView] = useState(false);
  const refreshPage = () => {
    window.location.reload(false);
    fn("Allblogs")
  };
  const [comment, setComment] = useState("");

  // const render = fn();
  const addcoment=()=>{
    axios.put(`http://localhost:8000/comments/${data._id}`,{comment:comment}).then(()=>{console.log("added")}).catch(()=>{console.log("error")})
  }
  const handelview = () => {
    setView(!view);
  };
  const like = () => {
    const likes = data.Like + 1;
    axios
      .put(`http://localhost:8000/blogs/${data._id}`, { Like: likes })
      .then(() => {
        console.log("updated");
      })
      .catch(() => {
        console.log("err");
      });
  };

  return (
    <div class="post-grid">
      <div class="post">
        <h2
          class="post-title"
          onClick={() => {
            handelview();
          }}
        >
          {data.title}
        </h2>
        <p class="post-content">{data.content}</p>
        {view && (
          <>
            <div>
              {" "}
              <button
                onClick={() => {
                  like();
                  refreshPage();
                }}
              >
                Like{" "}
              </button>
              <h3>{data.Like}❤️</h3>
            </div>
            {console.log(comment)}
            <h4>comment</h4>
            {data.comment.map((e, i) => {
              return (
                <>
                  <p key={i}>{e}</p>
                </>
              );
            })}
                   <input
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Comment"
            />
            <button onClick={()=>{addcoment();refreshPage()}} >Add</button>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogDetai;
