import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../atoms/Loading";
import CreatePost from "../organisms/CreatePost";
import Header from "../organisms/Header";
import Post from "../organisms/Post";
import Api from "../services/Api";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import theme from "../../theme/nice";
import styled from "styled-components";

function Home(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(1);
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
      console.log(response);
      console.log("page", page);
      setLastPage(response.pages);
      setPosts(response.items);
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
      <Container>
        {page > 0 && (
          <MdArrowBack
            size={"2em"}
            color={theme.colors.primary[300]}
            onClick={async () => {
              setLoading(true);
              setPage(page - 1);
              getPosts();
            }}
            style={{ cursor: "pointer" }}
          />
        )}
        {page != lastPage - 1 && (
          <MdArrowForward
            size={"2em"}
            color={theme.colors.primary[300]}
            onClick={() => {
              setLoading(true);
              setPage(page + 1);
              getPosts();
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </Container>
      {posts.map(
        ({ title, body, author }, index): ReactElement => {
          return (
            <Post
              key={index}
              title={title}
              body={body}
              author={(author && author.name) || "Anonymous"}
            />
          );
        }
      )}
    </>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
