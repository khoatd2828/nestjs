import React, { useState } from 'react'
const { io } = require("socket.io-client");

const Socket = () => {
    // đối tượng socket client => connect voi sever
    const socket = io("ws://localhost:8081")
    //key, function
    let [data, setData] = useState("")
    socket.on("send-data", (dataSocket) => {
        document.querySelector('#noiDung').innerHTML+=dataSocket + " da ket noi - <br/>"
    })
    socket.emit("client-data", 123)
  return (
    <div id='noiDung' className='text-white'>
         
    </div>
  )
}

export default Socket