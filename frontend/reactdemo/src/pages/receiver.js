import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";


var socketClient = null;

const Receiver = () =>{
  const { username } = useParams();

    const [globalMessage,setGlobalMessage] = useState({
        text:""
    });

    const [privateMessage,setPrivateMessage] = useState({
      text:""
  });

    const subscrivbeToGlobalMessage=()=>{
      socketClient.subscribe('/global/message', function (msg) {
            if (msg.body) {
              var jsonBody = JSON.parse(msg.body);
              setGlobalMessage(jsonBody);
            }
        });
    }

    const subscrivbeToPrivateMessage=()=>{
      socketClient.subscribe('/user/'+ username +'/message', function (msg) {
            if (msg.body) {
              var jsonBody = JSON.parse(msg.body);
              setPrivateMessage(jsonBody);
            }
        });
    }

    const connectToSocket = () => {
        let socket = new SockJS("http://localhost:8080/ws");
        socketClient = over(socket);
        socketClient?.connect({}, () => {
            console.log('Connected to WebSocket');
            subscrivbeToGlobalMessage();
            subscrivbeToPrivateMessage();
          },(error)=>{
            console.log(error);
          });
    }

    useEffect(()=>{
        connectToSocket();
    },[]);

    return <>
    <h1>Reciever</h1>
    <br/>
    <h2>Global Message Recieved = {globalMessage?.text}</h2>
    <h2>Private Message Recieved = {privateMessage?.text}</h2>
    </>
};

export default Receiver;