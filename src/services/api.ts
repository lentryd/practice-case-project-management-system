import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://pms.lentryd.su"
    : "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseApiUrl}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  refetchOnFocus: true,
  endpoints: () => ({}),
});
