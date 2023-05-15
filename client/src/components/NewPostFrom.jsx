import React, { useState } from "react";
import { useAddPostMutation } from "../store/apiSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../store/authSlice";

const NewPostFrom = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    user: { id },
  } = useSelector(userSelector.getUser);

  const [addPost] = useAddPostMutation();

  const formData = new FormData();

  const newPostData = { data: { title }, authorId: id };
  if (content) newPostData.data.content = content;

  formData.set("data", JSON.stringify(newPostData));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(formData);
  };

  return (
    <div
      style={{
        position: "absolute",
        padding: "10px 20px",
        backgroundColor: "grey",
        zIndex: 10,
      }}
    >
      <form style={{ margin: "20px 0" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <input
          type="file"
          //   value={image}
          onChange={(e) => {
            e.preventDefault();
            formData.set("image", e.target.files[0]);
          }}
          accept="image/*"
          placeholder="Image"
        />
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewPostFrom;
