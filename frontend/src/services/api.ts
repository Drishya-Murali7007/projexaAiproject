import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // As requested, though it might not exist

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = async (email: string, password?: string) => {
  // Mocking API call for now since backend might not be running
  console.log('Logging in user:', email, password ? 'with password' : 'no password');
  return { data: { success: true, user: { email } } };
};

export const getResources = async () => {
  // Mocking resources
  return {
    data: [
      { id: 1, title: 'Introduction to Algorithms', downloadUrl: '#' },
      { id: 2, title: 'Database Management Systems', downloadUrl: '#' },
      { id: 3, title: 'Operating Systems Concepts', downloadUrl: '#' },
      { id: 4, title: 'Computer Networks: A Top-Down Approach', downloadUrl: '#' },
      { id: 5, title: 'Artificial Intelligence: A Modern Approach', downloadUrl: '#' },
      { id: 6, title: 'Software Engineering Principles', downloadUrl: '#' },
    ]
  };
};

export default api;
