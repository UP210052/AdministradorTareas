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
const getProjectsAndTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/project/task`, {
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

const createProject = async (ProjectData) => {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${API_URL}/project`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ProjectData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create task');
    }
    const data = await response.json();
    return data;
};

const projectApiService = {
    getIdProject,
    getProjectsAndTasks,
    createProject
  };
export default projectApiService;