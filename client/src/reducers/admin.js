const adminReducer = (state = {
    dashboardStats: null,
    allUsers: [],
    loading: false
  }, action) => {
    switch (action.type) {
      case 'FETCH_DASHBOARD_STATS':
        return { ...state, dashboardStats: action.payload };
      
      case 'FETCH_ALL_USERS_ADMIN':
        return { ...state, allUsers: action.payload };
      
      case 'UPDATE_USER_ROLE':
        return {
          ...state,
          allUsers: state.allUsers.map(user =>
            user._id === action.payload._id ? action.payload : user
          )
        };
      
      case 'ADMIN_DELETE_QUESTION':
        return state; // Questions are managed in questionsReducer
      
      case 'ADMIN_DELETE_ANSWER':
        return state; // Answers are managed in questionsReducer
      
      default:
        return state;
    }
  };
  
  export default adminReducer; 