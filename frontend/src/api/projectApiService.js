import { API_URL } from './config';
const getIdProject = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/project/id`, {
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
const projectApiService = {
    getIdProject,
  };
export default projectApiService;