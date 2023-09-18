import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var socketClient = null;

export const Sender = () =>{
 
    const [message,setMessage] = useState({
        receiverName:"siron",
        text:""
    });

    const sendMessage=()=>{
        console.log(message);
        console.log(socketClient)
        socketClient.send('/app/public-message', {}, JSON.stringify(message));
    }

    const sendPrivateMessage=()=>{
        console.log(message);
        console.log(socketClient)
        socketClient.send('/app/private-message', {}, JSON.stringify(message));
    }

    const connectToSocket = () => {
        let socket = new SockJS("http://localhost:8080/ws");
        socketClient = over(socket);
        socketClient?.connect({}, () => {
            console.log('Connected to WebSocket');
          },(error)=>{
            console.log(error);
          });
    }

    useEffect(()=>{
        connectToSocket();
    },[]);

    return <>
    <h1>Sender</h1>
    <br/>
    <input type="text" onChange={(e)=>setMessage({...message,text:e.target?.value})} value={message?.text}/>
    <button onClick={()=>sendMessage()}>Send Message</button>
    <button onClick={()=>sendPrivateMessage()}>Send Private Message</button>
    </>
};

