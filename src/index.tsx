import React from 'react';

import App from './App';
import './style.scss'
// import './index.css'; 
// import './main.css';
import ReactDOM from 'react-dom/client';
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

// function createDivIdForReact() {
//     let div = document.createElement('div');
//     div.id = "main";
//     document.body.append(div);
//     return div
// }
// // createDivIdForReact();
// console.log('Test render')

App()
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );

// root.render(
//     <MemoryRouter initialEntries={["/chat-list"]}>
//         <App />
//     </MemoryRouter>
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

