import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import UserInfo from './app/user-info'

/* 
  Маппим приложения для конкретного домена
*/
const App: React.FunctionComponent  = () => {
  console.log('App')
  let app;
  switch (window.location.hostname) {
    case 'localhost':
      app = <UserInfo />
      return app
    case 'crm2.skyeng.ru':  // if (x === 'value2')
      app = <UserInfo />
      return app
    default:
      app = <UserInfo />
      return app
  }
  // return(
  //   <div>
  //     Test
  //   </div>
  // )
}

export default App;
