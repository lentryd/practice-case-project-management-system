import { api } from "./api";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
  UserData,
} from "../types";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Define the login endpoint
    login: build.mutation<AuthResponse, LoginData>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    // Define the register endpoint
    register: build.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // Define the me endpoint
    me: build.query<User, void>({
      query: () => "users/me",
    }),
    // Define the updateUser endpoint
    updateUser: build.mutation<User, UserData>({
      query: (data) => ({
        url: "users/me",
        method: "PUT",
        body: data,
      }),
    }),
    // Define the deleteUser endpoint
    deleteUser: build.mutation<void, void>({
      query: () => ({
        url: "users/me",
        method: "DELETE",
      }),
    }),
    // Define the getUserById endpoint
    getUserById: build.query<User, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useLazyMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
} = userApi;

export const {
  endpoints: { login, register, me, updateUser, deleteUser, getUserById },
} = userApi;

export default userApi;
