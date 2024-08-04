import axiosInstance from "./axiosInstance";

const apiService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/register", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUserData: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
