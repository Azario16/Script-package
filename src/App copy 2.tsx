import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { renderApp } from './core/create-render-app'


import UserInfo from './app/user-info'
function outerHTMLElement(node: HTMLElement): void {
  node.outerHTML = `
  <div id="people_head" role="PeopleList">
  </div>
  `;
}

function createDivIdForReact() {
  let elm: HTMLElement = document.createElement('div');
  const appenfElem = document.querySelector('div[class="app-content"] > ul[role="menu"]');
  if (appenfElem !== null) {
    appenfElem.append(elm)
  }
  outerHTMLElement(elm)
}


const App: any = () => {
  console.log('main')
  renderApp(
    <UserInfo />,
    'modal-window')
  switch (window.location.hostname) {
    case 'app.extension-test.ru':
      renderApp(
        <UserInfo />
        , 'main')
      break;
    default:
  }
}

export default App;
