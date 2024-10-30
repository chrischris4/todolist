import { API_ROUTES } from '../src/const';
import axios from 'axios';

///////////////USERS////////////////////////////

export function storeInLocalStorage(token, userId) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
}

export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}

export async function createUser(data) {
  try {
    const response = await axios.post(API_ROUTES.SIGN_UP, data);
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export const loginUser = async (data) => {
  try {
    const response = await axios.post(API_ROUTES.SIGN_IN, data);

    if (response.status === 200) {
      const { token, userId } = response.data;
      storeInLocalStorage(token, userId);
      return response.data;
    } else {
      return {
        error: response.data.error || 'Erreur lors de la connexion',
      };
    }
  } catch (error) {
    console.error('Erreur:', error);
    return { error: 'Erreur de réseau ou de serveur' };
  }
};

export async function getUserName() {
  try {
    const token = getFromLocalStorage('token');

    const response = await axios.get(API_ROUTES.USER_NAME, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        userId: response.data._id,
      };
    } else {
      return {
        error: true,
        message: 'Erreur lors de la récupération du nom',
      };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du nom:', error.message);
    return {
      error: true,
      message: error.message,
    };
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_ROUTES.USER}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur:",
      error.message
    );
    return { error: true, message: error.message };
  }
};

export async function getAllUsers() {
  try {
    const token = getFromLocalStorage('token');
    const response = await axios.get(API_ROUTES.GET_ALL_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getFromLocalStorage('token');
    const userId = getFromLocalStorage('userId');
    if (!token) {
      return defaultReturnObject;
    }
    return { authenticated: true, user: { userId, token } };
  } catch (err) {
    console.error('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

///////////////////////////////////// TASK/////////////////////////////////////

export async function createTask(data) {
  try {
    const token = getFromLocalStorage('token');
    const userId = getFromLocalStorage('userId');
    const response = await axios.post(
      API_ROUTES.TASK,
      { ...data, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: true, message: err.message };
  }
}
export const getAllTask = async () => {
  try {
    const token = getFromLocalStorage('token');

    const response = await axios.get(`${API_ROUTES.GET_TASK}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { tasks: response.data.tasks };
    } else {
      return {
        error: true,
        message: 'Erreur lors de la récupération des tâches',
      };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    return {
      error: true,
      message: error.message,
    };
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_ROUTES.GET_TASK_BY_ID}${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Erreur lors de la récupération de la tâche' };
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const token = getFromLocalStorage('token');
    const response = await axios.put(
      `${API_ROUTES.UPDATE_TASK}${taskId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Tâche mise à jour avec succès',
        task: response.data.task,
      };
    } else {
      return {
        error: true,
        message: 'Erreur lors de la mise à jour de la tâche',
      };
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    return { error: true, message: error.message };
  }
};
