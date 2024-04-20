import React from 'react';

const Question = ({ questionData }) => {
  const { type, question, answer, timeLimit, room } = questionData;

  return (
    <div className="p-4 border border-gray-200 rounded shadow-md">
      {type && <h2 className="text-xl font-bold">{type} Question</h2>}
      {question && (
        <div className="mt-4">
          <h3 className="font-bold">Question:</h3>
          <p className="mt-2">{question}</p>
        </div>
      )}
      {answer && (
        <div className="mt-4">
          <h3 className="font-bold">Answer:</h3>
          <pre className="mt-2 bg-gray-100 p-2 rounded">{answer}</pre>
        </div>
      )}
      {timeLimit && (
        <div className="mt-4">
          <h3 className="font-bold">Time Limit:</h3>
          <p className="mt-2">{timeLimit}</p>
        </div>
      )}
      {room && (
        <div className="mt-4">
          <h3 className="font-bold">Room:</h3>
          <p className="mt-2">{room}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
