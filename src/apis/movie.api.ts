import { GROUP_CODE, PAGE_SIZE } from '../constants';
import { ApiResponse } from '../interfaces';
import fetcher from './fetcher';

export const movieApi = {
  getListMovies: async <T>(payload: { page: number; pageSize?: number }) => {
    const params = {
      maNhom: GROUP_CODE,
      soTrang: payload.page,
      soPhanTuTrenTrang: payload.pageSize || PAGE_SIZE,
    };

    try {
      const response = await fetcher.get<ApiResponse<T>>('/QuanLyPhim/LayDanhSachPhimPhanTrang', {
        params,
      });
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  addMovie: async (payload: FormData) => {
    try {
      const response = await fetcher.post('/QuanLyPhim/ThemPhimUpLoadHinh', payload);
      return response.data?.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  deleteMovie: async (idMovie: string) => {
    try {
      const response = await fetcher.delete(`/QuanLyPhim/XoaPhim?MaPhim=${idMovie}`);
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
