import React from 'react';

const QuestionCard = ({ type, question, answer, timeLimit, options,socket,room }) => {
    const sendQuestion = () => {
        socket.emit('send_question', { type, question, answer, timeLimit, options,room });
        alert("Question Sent")
    }
    if(question)
    return (
        <button className="bg-white shadow-md rounded-md p-4 mb-4 w-full mx-4 text-left hover:bg-gray-200" onClick ={()=>sendQuestion()}>
            {<h3 className="font-semibold mb-2">{type}</h3>}
            {<p className="mb-2 truncate">Question :{question}</p>}
        </button>
    );
};

const QuestionsList = ({ questions,socket,room }) => {
    return (
        <div className="container mx-auto">
            {questions.map((question, index) => {
                if(index !== 0)
                return <QuestionCard
                    key={index}
                    type={question[0]}
                    question={question[1]}
                    answer={question[2]}
                    timeLimit={question[3]}
                    options={question[4]}
                    socket={socket}
                    room={room}
                />
            }
            )}
        </div>
    );
};

export default QuestionsList;