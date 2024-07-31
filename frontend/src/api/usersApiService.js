import { API_URL } from './config';
const getIdUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/user/id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
};
const usersApiService = {
    getIdUsers,
  };
export default usersApiService;