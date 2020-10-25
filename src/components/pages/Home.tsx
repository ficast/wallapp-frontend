import React, { ReactElement, useEffect, useState } from "react";
import Loading from "../atoms/Loading";
import Header from "../organisms/Header";
import Post from "../organisms/Post";
import Api from "../services/Api";

function Home(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  // const [user, setUser] = useState("");
  const [posts, setPosts] = useState([
    { title: "", body: "", author: { name: "" } },
  ]);
  const [error, setError] = useState(false);

  const getPosts = async (): Promise<void> => {
    try {
      const response = await Api.getPosts(page);
      setPosts(response);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      {posts.map(
        ({ title, body, author }, index): ReactElement => (
          <Post key={index} title={title} body={body} author={author} />
        )
      )}
      ;
    </>
  );
}

export default Home;
