import env from "../util/server.json";
import axios from "axios";

export const getUserProfile = async (userId) => {
  return await axios.get(env.SERVER + "/user/profile/" + userId);
};
