import React, { ReactElement, useEffect, useContext, useState } from "react";
import { ImHome } from "react-icons/im";
import Header from "../organisms/Header";
import Api from "../services/Api";

export default (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async (): Promise<void> => {
    try {
      const response = await Api.getPosts();
      setPosts(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Header />
      {loading && posts.forEach(({ title }) => <div>{title}</div>)}
    </>
  );
};
