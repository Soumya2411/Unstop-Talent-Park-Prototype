import io from "socket.io-client";
import { useEffect, useState } from "react";
import ExcelFileDropzone from "./components/ExcelDropzone";
import Question from "./components/Question";

const socket = io.connect("https://unstop-talent-park-prototype.onrender.com/");

function App() {
  //Room State
  const [room, setRoom] = useState("");
  const [type, setType] = useState(0);
  const [tempa , setTempa] = useState('');
  const [recivedQues, setRecivedQues] = useState([]);
  // Messages States
  const [data, setData] = useState({});

  const createRoom = () => {
    socket.emit("create_room");
  };
  const joinRoom = () => {
    if (tempa !== "") {
      socket.emit("join_room", tempa);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("created_room", (data) => {
      setRoom(data)
    })
    socket.on("joined_room", (data) => {
      console.log(data)
      setRoom(data.room)
    }) 
    socket.on("room_not_found", (data) => {
      alert("Room not found")
    })
    socket.on("receive_question", (data) => {
      console.log(data)
      setRecivedQues([...recivedQues,data])
    }
    )  
  }, [socket]);
  return (
    <div className="App w-full p-9">
      <div className='w-full flex justify-center items-center gap-2'>
        <label htmlFor="" className='text-xl font-bold'>This User is</label>
        <select className="border border-gray-300 rounded-md p-2 text-xl font-bold uppercase" onChange={(e) => { setType(parseInt(e.target.value)) }}>
          <option value={0}>Inteviewer</option>
          <option value={1}>Candidate</option>
        </select>
      </div>
      {
        !type ?
        <>
          <div className='w-full mt-3 flex justify-center items-center gap-2'>
            <button className="modern-button bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>createRoom()}>
              Create a room
            </button>
          </div>
        </>
        :
        <>
          <div className='w-full mt-3 flex justify-center items-center gap-2'>
            <input type="text" className="border border-gray-300 rounded-md p-2 text-xl font-bold" placeholder="Enter Room ID" onChange={(e) => setTempa(e.target.value)} />
            <button className="modern-button bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>joinRoom()}>
              Join a room
            </button>
          </div>
        </>
      }

      {
        room &&
        <>
          <div className='w-full mt-3 flex justify-center items-center gap-2 flex-col'>
            <h1 className='text-xl font-bold'>Room Joined : {room}</h1>
           {!type && <p>Share this to candidate</p>}
          </div>
        </>
      }
      {
        !type &&
      <div className='mt-4'>
      <h1 className="text-xl font-bold"> Click to send the questions</h1>
      <ExcelFileDropzone socket= {socket} room={room} /> 
      </div>  
      }
      {
        type && recivedQues.length!=0 &&
        <>
          <div className='w-full mt-3 flex justify-center items-center gap-2 flex-col'>
            <h1 className='text-xl font-bold'>Questions Recived</h1>
            <div className='w-full flex justify-center items-center gap-2 flex-col'>
              {recivedQues.map((ques, index) => {
                return (
                  <div key={index} className='w-full flex justify-center items-center gap-2 flex-col'>
                    <Question questionData={ques}/>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
