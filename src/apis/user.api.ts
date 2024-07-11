import { ApiResponse } from "../interfaces";
import { CurrentUser, UserLoginRequest } from "../interfaces/user.interface";
import fetcher from "./fetcher";

export const userApi = {
  login: async (data: UserLoginRequest) => {
    try {
     const response = await fetcher.post<ApiResponse<CurrentUser>>('/QuanLyNguoiDung/DangNhap', data);
     return response.data.content
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  // register: (data) => fetcher.post('/QuanLyNguoiDung/DangKy', data),
};
