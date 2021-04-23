import env from "../util/env.json";
import axios from "axios";

export const login = async (body) => {
  return await axios.post(env.SERVER + "/user/login", body);
};
