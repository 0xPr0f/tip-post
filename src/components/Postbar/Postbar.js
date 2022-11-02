import React from "react";
import styles from "./Postbar.module.scss";
import { useNavigate } from "react-router-dom";

export const Postbar = ({ postname, postid, postdescription }) => {
  const navigate = useNavigate();
  const navigateToPosts = () => {
    navigate(`/posts/${postid}`);
  };
  return (
    <div className={styles.Postbarborder}>
      <div className={styles.PostbarDetails}>
        <div className={styles.postAndDesc}>
          <h3>{postname}</h3>
          <span
            style={{ fontSize: "17px", fontWeight: "200", textAlign: "left" }}
          >
            {postdescription.length > 119
              ? postdescription.slice(0, 120) + "..."
              : postdescription}
          </span>
        </div>
        <div style={{ border: "2px solid black" }}>
          <button
            style={{ width: "100%" }}
            className={styles.button}
            onClick={navigateToPosts}
          >
            View Post
          </button>
          <br />
          <button
            style={{ width: "100%" }}
            className={styles.button}
            onClick={navigateToPosts}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
