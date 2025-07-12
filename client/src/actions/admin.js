import * as api from '../api';

export const fetchDashboardStats = () => async (dispatch) => {
  try {
    const { data } = await api.getDashboardStats();
    dispatch({ type: 'FETCH_DASHBOARD_STATS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsersForAdmin = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsersForAdmin();
    dispatch({ type: 'FETCH_ALL_USERS_ADMIN', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserRoleAction = (id, role) => async (dispatch) => {
  try {
    const { data } = await api.updateUserRole(id, role);
    dispatch({ type: 'UPDATE_USER_ROLE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const adminDeleteQuestionAction = (id) => async (dispatch) => {
  try {
    await api.adminDeleteQuestion(id);
    dispatch({ type: 'ADMIN_DELETE_QUESTION', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const adminDeleteAnswerAction = (questionId, answerId) => async (dispatch) => {
  try {
    await api.adminDeleteAnswer(questionId, answerId);
    dispatch({ type: 'ADMIN_DELETE_ANSWER', payload: { questionId, answerId } });
  } catch (error) {
    console.log(error);
  }
}; 