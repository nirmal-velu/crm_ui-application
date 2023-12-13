// AuthService.ts

import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Your API base URL

const AuthService = {

  generateOtp: async (data: any): Promise<any> => {
    try {
      const response = await axios.post(`${apiBaseUrl}/register/generate-otp`, data);
      return response.data; // Assuming your API returns data with status information
    } catch (error) {
      throw error;
    }
  },

};

export default AuthService;
