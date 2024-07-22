import { API_URL } from './config';
const getTasksToDo = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/task/allToDo`, {
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

const getTasksDone = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/task/allDone`, {
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

const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
};

const completeTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/task/status/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
};


  const taskApiService = {
    getTasksToDo,
    getTasksDone,
    deleteTask,
    completeTask
  };

  export default taskApiService;