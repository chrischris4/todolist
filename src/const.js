const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
  TASK: `${API_URL}/api/tasks/createTask`,
  GET_TASK: `${API_URL}/api/tasks/getAllTask`,
  GET_TASK_BY_ID: `${API_URL}/api/tasks/`,
  UPDATE_TASK: `${API_URL}/api/tasks/`,
  SIGN_UP: `${API_URL}/api/users/signup`,
  SIGN_IN: `${API_URL}/api/users/login`,
  USER_NAME: `${API_URL}/api/users/profile`,
  GET_ALL_USERS: `${API_URL}/api/users/users`,
};
