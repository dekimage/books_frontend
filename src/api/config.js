import { mutate } from "swr";
import useSWR from "swr";
import { normalize } from "../app/utils/functions";
import Token from "../app/utils/token";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const safeAPI = (cb) => async (data) => {
  try {
    await cb(data);
  } catch (e) {
    throw e;
  }
  return { error: undefined };
};

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });

const apiHeaders = () => {
  const token = Token.get();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const addApiPrefix = (url) =>
  url.startsWith("http")
    ? url
    : process.env.NEXT_PUBLIC_API_URL + "/api/" + url;

export const fetcher = async (url) => {
  const response = await fetch(addApiPrefix(url), {
    method: Method.GET,
    headers: apiHeaders(),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const poster = async (url, data = {}, method = Method.POST) => {
  const response = await fetch(addApiPrefix(url), {
    method: method,
    headers: apiHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const swrOptions = {
  suspense: true,
  revalidateOnFocus: false,
};

export const useGetRequest = (url, options) => {
  const { data, error } = useSWR(url, (url) => fetcher(url), {
    ...swrOptions,
    ...options,
  });

  const loading = !data && !error;

  if (!data?.meta) {
    return { data, error, loading };
  }

  // const normalizedData = normalize(data.data);
  return { res: { data: data.data, meta: data.meta }, error, loading };
};

export function createQueryString(filters) {
  const queryString = Object.keys(filters)
    .map((key) => {
      const value = filters[key];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          return value
            .map((v) => {
              if (typeof v === "number") {
                return `${encodeURIComponent(key)}=${v}`;
              } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(v)}`;
              }
            })
            .join("&");
        } else {
          if (typeof value === "number") {
            return `${encodeURIComponent(key)}=${value}`;
          } else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        }
      }
      return "";
    })
    .filter((query) => query !== "") // Remove empty queries
    .join("&");

  return queryString;
}
