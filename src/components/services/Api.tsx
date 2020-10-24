import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default class Api {
  static createUser = () => {
  };

  // static loginAuth = ({password, email}) => {
  // };

  static getPosts = async (): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/post/`);
    return response.data;
  };
}
