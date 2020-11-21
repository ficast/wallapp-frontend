import React, { ReactElement, useCallback, useEffect, useState } from "react";
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
  const [pages, setPages] = useState(0);
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
    console.log('post n', page)
    try {
      const response = await Api.getPosts(page);
      if (!pages) {
        setPages(response.pages - 1);
      }
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

  useEffect(() => {
    setLoading(true);
    console.log('agora é', page)
    getPosts();
  }, [page]);

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
              setPage(page - 1);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
        {page < pages && (
          <MdArrowForward
            size={"2em"}
            color={theme.colors.primary[300]}
            onClick={() => {
              setPage(page + 1);
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </Container>
      {posts && posts.map(
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

const Title = styled.h3`
  color: ${theme.colors.primary[300]};
`;
