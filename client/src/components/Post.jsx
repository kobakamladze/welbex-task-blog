import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";
import { useDeletePostMutation, useEditPostMutation } from "../store/apiSlice";

const EditForm = ({ postId, title, content }) => {
  const [editPost] = useEditPostMutation();

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editPost({
      title: newTitle,
      content: newContent,
      postId,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        padding: "10px 20px",
        backgroundColor: "grey",
        left: "30%",
        zIndex: 10,
      }}
    >
      <form
        style={{ margin: "20px 0", backgroundColor: "black", padding: "20px" }}
      >
        <label>Title:</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />

        <label>Content:</label>
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

const Post = ({
  data: {
    id: postId,
    author: { name: author },
    title,
    content = null,
    imagePath = null,
    createdAt: uploadDate,
    updatedAt: updateDate,
    authorId,
  },
}) => {
  const [editFormState, setEditFormState] = useState(false);

  const {
    user: { id: userId },
  } = useSelector(userSelector.getUser);

  let imageSrc;
  console.log(imageSrc);

  if (imagePath)
    imageSrc = `${import.meta.env.VITE_SERVER_URL}/${imagePath
      .split(`\\`)
      .join("/")}`;

  console.log("modified === " + imageSrc);

  const date = updateDate > uploadDate ? updateDate : uploadDate;

  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    await deletePost({ postId, userId });
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: "grey",
        margin: "0 0 10px 0",
      }}
    >
      {authorId === userId ? (
        <div>
          <button onClick={() => setEditFormState(!editFormState)}>
            Edit post
          </button>
          <button
            style={{ margin: "0 0 0 10px", backgroundColor: "red" }}
            onClick={handleDelete}
          >
            Delete post
          </button>
        </div>
      ) : null}
      {editFormState ? (
        <EditForm postId={postId} title={title} content={content} />
      ) : null}
      <h2>{title}</h2>
      <p>{content}</p>
      {imagePath ? (
        <img style={{ maxHeight: "400px" }} src={imageSrc} alt="image" />
      ) : null}
      <div style={{ dislpay: "flex" }}>
        <p>Author: {author}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Post;
