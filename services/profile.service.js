import env from "../util/server.json";
import axios from "axios";

export const getProfile = async (userId) => {
  return await axios.get(env.SERVER + "/user/profile/" + userId);
};
