import { mutate } from "swr";
import { poster, fetcher, Method } from "./config";

export const authApi = {
  login: async (data) => {
    return await poster("auth/local", data);
  },
  signup: async (data) => {
    return await poster("auth/local/register", data);
  },
  getUser: async () => {
    return await fetcher("book/getUser");
  },
};
