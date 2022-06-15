import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { renderApp } from './core/create-render-app'
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import UserInfo from './app/user-info'
import Reservation from './app/autofaq-people'
import SearchChat from './app/autofaq-search-chat';
/* 
  Маппим приложения для конкретного домена
*/
function outerHTMLElement(node: HTMLElement): void {
  node.outerHTML = `
  <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
  </li>
  `; // Property 'innerText' does not exist on 'T'
}

function createDivIdForReact() {
  let elm: HTMLElement = document.createElement('li');
  const appenfElem = document.querySelector('div[class="app-content"] > ul[role="menu"]');
  if (appenfElem !== null) {
    appenfElem.append(elm)
  }
  outerHTMLElement(elm)
  // elm.outerHTML = `
  //     <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
  //     </li>
  //     `;
}


const App: any = () => {
  console.log('App')
  switch (window.location.hostname) {
    case 'localhost':
      renderApp(<UserInfo />, 'main')
      break;
    case 'crm2.skyeng.ru':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      window.onload = () => {
        setTimeout(async function () {
          renderApp(<SearchChat />, 'search-chat')
        }, 3000)
      }
      break;
    case 'skyeng.autofaq.ai':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(
            <MemoryRouter initialEntries={["/chat-list"]}>
              <SearchChat />
              <Reservation />
            </MemoryRouter>
          );
          // renderApp(<Reservation />, 'people_head')
        }, 500)
      }
      // window.onload = () => {
      //   setTimeout(async function () {
      //     createDivIdForReact();
      //     renderApp(
      //       <MemoryRouter initialEntries={["/chat-list"]}>
      //         < SearchChat />
      //         <Reservation />
      //       </MemoryRouter >
      //       , 'people_head')
      //   }, 500)
      // }
      // renderApp(<SearchChat />, 'search-chat')
      // Создаем див на странице 

      // renderApp(<UserInfo />, 'main')
      break;
    case 'extension-test.ru':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(<Reservation />);
          // renderApp(<Reservation />, 'people_head')
        }, 500)
      }

      window.onload = () => {
        setTimeout(async function () {
          renderApp(
            <MemoryRouter initialEntries={["/chat-list"]}>
              < SearchChat />
              <Reservation />
            </MemoryRouter >
            , 'search-chat')
        }, 500)
      }


      break;
    default:
      console.log('Default')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(<Reservation />);
          // renderApp(<Reservation />, 'people_head')
        }, 500)
      }
      renderApp(<UserInfo />, 'main')
  }
  // return(
  //   <div>
  //     Test
  //   </div>
  // )
}

export default App;
