import { createQueryString, useGetRequest } from "./config";
import { filters } from "./filters";

export const useGetMyFavoriteBooks = () => {
  return useGetRequest(`book/getMyFavoriteBooks`);
};

export const useGetBookDetails = (id) => {
  // const queryStrings = createQueryString(filters);
  return useGetRequest(`books/${id}?${filters.bookDetails}`);
};

export const useGetBooks = (query) => {
  return useGetRequest(`books?populate=${query}&user={1}`);
};

export const useGetMyBookIdeas = (id) => {
  return useGetRequest(`idea/getBookIdeas?bookId=${id}`);
};

export const useGetBookFavorites = (id) => {
  return useGetRequest(`idea/getBookFavorites?bookId=${id}`);
};

export const useGetAllMyIdeas = () => {
  return useGetRequest(`idea/getAllMyIdeas`);
};

export const useGetAllSavedIdeas = () => {
  return useGetRequest(`idea/getAllSavedIdeas`);
};

export const useGetCategory = (id) => {
  return useGetRequest(
    `categories/${id}?populate=books, books.image, books.category`
  );
};
