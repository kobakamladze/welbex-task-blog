import "./App.css";
import Header from "./components/Header";
import { useGetPostsQuery } from "./store/apiSlice";
import Post from "./components/Post";
import { useState } from "react";

const Pagination = ({ count, setPage }) => {
  const pagesAmount = Math.ceil(count / 20);
  const pages = [];
  for (let i = 0; i < pagesAmount; i++) {
    pages.push(
      <button
        onClick={() => setPage(i + 1)}
        key={i}
        style={{ margin: " 0 10px 0 0 " }}
      >
        {i + 1}
      </button>
    );
  }

  return <div style={{ display: "flex" }}>{pages}</div>;
};

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPostsQuery({ page });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>LOADING...</p>
      </div>
    );

  return (
    <>
      <Header />
      {data.posts?.length
        ? data.posts.map((postData) => (
            <Post key={postData.id} data={postData} />
          ))
        : "No posts..."}
      {data.count > 20 ? (
        <Pagination setPage={setPage} count={data.count} />
      ) : null}
    </>
  );
}

export default App;
