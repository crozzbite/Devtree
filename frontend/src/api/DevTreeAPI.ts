import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../types";

const token = localStorage.getItem("AUTH_TOKEN");

export async function getUser() {

  try {
    const { data } = await api<User>("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateProfile(formData: ProfileForm) {
    try {
      const { data } = await api.patch<string>('/user', formData,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return data
    } catch (error) {
      if (isAxiosError(error) && error.message) {
        console.log(error.response?.data.error)
        throw new Error(error.response?.data.error);
      }
    }
  }
