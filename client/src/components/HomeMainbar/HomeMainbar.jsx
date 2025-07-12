import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const HomeMainbar = ({ filter }) => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionsList = useSelector(state => state.questionsReducer)

  // Filtering and sorting logic (moved from QuestionList)
  const filteredQuestions = useMemo(() => {
    if (!questionsList.data) return [];
    let list = [...questionsList.data];
    switch (filter) {
      case 'unanswered':
        list = list.filter(q => (q.noOfAnswers === 0 || !q.noOfAnswers));
        break;
      case 'most_answered':
        list = list.sort((a, b) => (b.noOfAnswers || 0) - (a.noOfAnswers || 0));
        break;
      case 'recent':
        list = list.sort((a, b) => new Date(b.askedOn) - new Date(a.askedOn));
        break;
      case 'newest':
      default:
        list = list.sort((a, b) => new Date(b.createdAt || b.askedOn) - new Date(a.createdAt || a.askedOn));
        break;
    }
    return list;
  }, [questionsList.data, filter]);

  const checkAuth = () => {
    if (user === null) {
      alert("Login or Signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* Heading removed as per request */}
        {/* Ask Question button removed as per request */}
      </div>
      <div>
        {questionsList.data === null ? (
          <Loader />
        ) : (
          <>
            <p><span style={{ fontWeight: 700, color: 'green', fontSize: '1.1em' }}>{filteredQuestions.length}</span> Questions</p>
            <QuestionList questionsList={filteredQuestions} filter={filter} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
