import React, { useState } from "react";
import Questions from "./Questions";

const QUESTIONS_PER_PAGE = 20;

const QuestionList = ({ questionsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(questionsList.length / QUESTIONS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const currentQuestions = questionsList.slice(startIdx, endIdx);

  return (
    <>
      {currentQuestions.map((question) => (
        <Questions question={question} key={question._id} />
      ))}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '32px 0 0 0', fontSize: '1.2rem', color: '#ccc' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ background: 'none', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', color: currentPage === 1 ? '#bbb' : 'var(--text-primary)', fontSize: '1.2rem' }}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: currentPage === i + 1 ? 'var(--accent-color)' : 'var(--text-primary)',
                fontWeight: currentPage === i + 1 ? 700 : 400,
                fontSize: '1.2rem',
                margin: '0 2px',
                textDecoration: currentPage === i + 1 ? 'underline' : 'none',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ background: 'none', border: 'none', cursor: currentPage === totalPages ? 'default' : 'pointer', color: currentPage === totalPages ? '#bbb' : 'var(--text-primary)', fontSize: '1.2rem' }}>&gt;</button>
        </div>
      )}
    </>
  );
};

export default QuestionList;
