import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  UserResponse,
  User,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {unsetUser} from "./usersSlice";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

      keys.forEach(key => {
        const value = registerMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post<UserResponse>('/users', formData);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<UserResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/users/google', { credential });
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk(
  'users/logout',
  async (_, {dispatch}) => {
    await axiosApi.delete('users/sessions');
    dispatch(unsetUser());
  }
);