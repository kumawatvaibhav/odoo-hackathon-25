import axios from 'axios'
//https://stack-overflow-clone-server-vq27.onrender.com

const API = axios.create({ baseURL: "http://localhost:5000"})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// AUTH
export const logIn = (authData) => (
  API.post('/user/login', authData)
)
export const signUp = (authData) => (
  API.post('/user/signup', authData)
)

// QUESTION
export const postQuestion = (questionData) => (
  API.post('/questions/Ask', questionData)
)
export const getAllQuestions = () => (
  API.get('/questions/All')
)
export const deleteQuestion = (id) => (
  API.delete(`/questions/delete/${id}`)
)
export const voteQuestion = (id, value, userId) => (
  API.patch(`/questions/vote/${id}`, { value, userId })
)

// ANSWER
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => (
  API.patch(`/answer/post/${id}`, {id, noOfAnswers, answerBody, userAnswered, userId})
)
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

// USER
export const fetchAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, updatedData) =>
  API.patch(`/user/update/${id}`, updatedData);

// ADMIN
export const getDashboardStats = () => API.get("/admin/dashboard");
export const getAllUsersForAdmin = () => API.get("/admin/users");
export const updateUserRole = (id, role) => API.patch(`/admin/users/${id}/role`, { role });
export const adminDeleteQuestion = (id) => API.delete(`/admin/questions/${id}`);
export const adminDeleteAnswer = (questionId, answerId) => 
  API.delete(`/admin/questions/${questionId}/answers/${answerId}`);
