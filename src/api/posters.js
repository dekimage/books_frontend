import { mutate } from "swr";
import { poster, Method } from "./config";
import { filters } from "./filters";

export const api = {
  createIdea: async (data, id) => {
    await poster("idea/createIdea", data);
    mutate(`books/${id}?${filters.bookDetails}`);
    mutate(`idea/getBookIdeas?bookId=${id}`);
  },
  updateIdea: async (data) => {
    await poster("idea/updateIdea", data, Method.PUT);
  },
  deleteIdea: async (id) => {
    await poster(`idea/deleteIdea`, { id }, Method.PUT);
  },
  favoriteIdea: async (id, bookId) => {
    await poster(`idea/favoriteIdea`, { id }, Method.PUT);
    mutate(`idea/getBookFavorites?bookId=${bookId}`);
  },
  reportIdea: async (id) => {
    await poster(`idea/reportIdea`, { id }, Method.PUT);
  },
  followCategory: async (id) => {
    await poster(`category/followCategory`, { id }, Method.PUT);
  },
};
