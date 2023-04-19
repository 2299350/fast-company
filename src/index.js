import React from "react";
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import Users from "./components/users";



const App = () => {
  return <Users />;
}

const rootDir = document.getElementById('root');
const root = createRoot(rootDir);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();