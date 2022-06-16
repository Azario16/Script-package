import React from 'react';
import { render } from "react-dom";
import ReactDOM from 'react-dom/client';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { renderApp, renderAppAf } from './core/create-render-app'
import { renderAppAf2 } from './core/create-render-app2'
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
  // console.log(node.outerHTML)
  node.outerHTML = `
  <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
  </li>
  `;
}

function createDivIdForReact() {
  let elm: HTMLElement = document.createElement('li');
  const appenfElem = document.querySelector('div[class="app-content"] > ul[role="menu"]');
  if (appenfElem !== null) {
    appenfElem.append(elm)
  }
  outerHTMLElement(elm)
}


const App: any = () => {
  // console.log('App')
  switch (window.location.hostname) {
    case 'localhost':
      renderApp(<UserInfo />, 'main')
      break;
    case 'crm2.skyeng.ru':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      // window.onload = () => {
      //   setTimeout(async function () {
      //   }, 3000)
      // }
      renderApp(<SearchChat styleElement="position-fixed top-0 end-0" />, 'search-chat')
      break;
    case 'skyeng.autofaq.ai':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      renderApp(<SearchChat styleElement="float-end vh-100 " />, 'search-chat')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(
            <Reservation />
          );
        }, 3000)
      }

      break;
    case 'extension-test.ru':  // if (x === 'value2')
      renderApp(<UserInfo />, 'main')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(
            <Reservation />
          );
        }, 500)
      }
      renderApp(<SearchChat styleElement="position-fixed top-0 end-0" />, 'search-chat')
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
