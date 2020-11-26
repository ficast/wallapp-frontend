import axios from "axios";
const API_BASE_URL = "https://wall-app-api-br.herokuapp.com"

type createUserParams = {
  name: string;
  password: string;
  email: string;
};

type authUserParams = {
  password: string;
  email: string;
};

type createPostParams = {
  title: string;
  body: string;
  token: string;
};

export default class Api {
  static createUser = async (params: createUserParams) => {
    await axios.post(`${API_BASE_URL}/user`, params);
  };

  static authUser = async (params: authUserParams) => {
    const response = await axios.post(
      `${API_BASE_URL}/user/authenticate`,
      params
    );
    return response.data;
  };

  static getPosts = async (page: number = 0): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/post/?page=${page}`);
    return response.data;
  };

  static createPost = async (params: createPostParams) => {
    await axios.post(`${API_BASE_URL}/post`, params);
  };
}
