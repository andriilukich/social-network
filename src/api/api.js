import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b68d2bce-2883-476f-99fa-113beee74d3c',
  }
});

export const userAPI = {
  async getUsers(pageSize = 5, currentPage = 1) {
    try {
      const response = await instance.get(`users?count=${pageSize}&page=${currentPage}`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async follow(userId = 1) {
    try {
      const response = await instance.post(`follow/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async unfollow(userId = 1) {
    try {
      const response = await instance.delete(`follow/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
};

export const profileAPI = {
  async getProfile(userId = 1) {
    try {
      const response = await instance.get(`profile/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async getStatus(userId = 1) {
    try {
      const response = await instance.get(`profile/status/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async updateStatus(status = '') {
    try {
      const response = await instance.put(`profile/status`, { status: status });
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async updatePhoto(image) {
    const formData = new FormData();
    formData.append('img', image);
    try {
      const response = await instance.put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async updateProfileInfo(formData) {
    try {
      const response = await instance.put(`profile`, formData);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
};

export const authAPI = {
  async me() {
    try {
      const response = await instance.get(`auth/me`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async login(email, password, rememberMe = false, captcha) {
    try {
      const response = await instance.post(`auth/login`, { email, password, rememberMe, captcha });
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async logout() {
    try {
      const response = await instance.delete(`auth/login`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.data);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
  async captcha() {
    try {
      const response = await instance.get(`security/get-captcha-url`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.error(`${err.name}: ${err.message} => ${err.stack}`);
    }
  },
};

