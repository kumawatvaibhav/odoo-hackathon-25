import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import { deleteAnswer, acceptAnswer } from "../../actions/question";
import toast from 'react-hot-toast'
import HTMLReactParser from 'html-react-parser'

const DisplayAnswer = ({ question, handleShare }) => {

  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams()

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    toast.success('Answer deleted')
  }

  const handleAccept = (answerId) => {
    dispatch(acceptAnswer(id, answerId, User.result._id));
    toast.success('Answer accepted!')
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className={`display-ans ${ans.isAccepted ? 'accepted-answer' : ''}`} key={ans._id}>
          {ans.isAccepted && (
            <div className="accepted-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Accepted
            </div>
          )}
          <p>{HTMLReactParser(ans.answerBody)}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === question?.userId && !ans.isAccepted && (
                <button
                  type="button"
                  className="accept-btn"
                  onClick={() => handleAccept(ans._id)}
                >
                  Accept
                </button>
              )}
              {User?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayAnswer