import { mutate } from "swr";
import { poster, Method } from "./config";
import { filters } from "./filters";

export const bookApi = {
  favoriteBook: async (id) => {
    await poster(`book/favoriteBook`, { id }, Method.PUT);
  },
};
