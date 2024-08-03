import { API_URL } from './config';
const getIdUsers = async () => {
    const response = await fetch(`${API_URL}/user/id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
};
const login = async (loginRequest) => {
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Invalid username or password');
    }
    return data;
  };

const usersApiService = {
    getIdUsers, login
  };
export default usersApiService;