import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Receiver from './pages/receiver';
import {Sender} from './pages/senderFile';

const router = createBrowserRouter([
  {
    path: "/sender",
    element: <Sender/>,
  },
  {
    path: "/reciever/:username",
    element: <Receiver/>,
  }
]);

function App() {


  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
