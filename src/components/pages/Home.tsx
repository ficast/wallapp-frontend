import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../atoms/Loading";
import CreatePost from "../organisms/CreatePost";
import Header from "../organisms/Header";
import Post from "../organisms/Post";
import Api from "../services/Api";

function Home(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [userToken, setUserToken] = useState({
    token: "",
    email: "",
    name: "",
    id: "",
  });
  const [posts, setPosts] = useState([
    { title: "", body: "", author: { name: "" } },
  ]);

  const history = useHistory();
  const { state } = history.location;

  const getPosts = async (): Promise<void> => {
    try {
      const response = await Api.getPosts(page);
      setPosts(response);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    return setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (typeof state === "string") {
      setUserToken(JSON.parse(state));
      setUserIsAuth(true);
    }
    getPosts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header username={userToken.name} />
      {userIsAuth && <CreatePost onSubmit={getPosts} token={userToken} />}
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
