
import ReactDOM from 'react-dom/client';
import { renderApp } from './core/create-render-app'
import ModalWindow from './app/modal-window'
import './app/dark-mode'
import UserInfo from './app/user-info'
import Reservation from './app/autofaq-people'
import SearchChat from './app/autofaq-search-chat';
import TimTableInfo from './app/time-table';
import СreateCmsButtonfrom from './app/vimbox-cms'

import ShadowView from './shadow-view';

/* 
  Маппим приложения для конкретного домена
*/
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
  // console.log('App')
  renderApp(
    <ShadowView>
      <ModalWindow />
    </ShadowView>,
    'modal-window')
  // renderApp(<ModalWindow />, 'modal-window1')

  switch (window.location.hostname) {
    case 'localhost':
      renderApp(<UserInfo />, 'main')
      break;
    case 'crm2.skyeng.ru':  // if (x === 'value2')
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>
        , 'search-chat')
      // renderApp(
      //   <SearchChat styleElement="position-fixed top-0 end-0" />
      //   , 'search-chat')
      break;
    case 'build.extension-test.ru':  // if (x === 'value2')
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>
        , 'search-chat')
      break;
    case 'datsy.ru':  // if (x === 'value2')
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>
        , 'search-chat')
      break;
    case 'skyeng.autofaq.ai':  // if (x === 'value2')
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="float-end vh-100" />
        </ShadowView>
        , 'search-chat')
      window.onload = () => {
        setTimeout(async function () {
          createDivIdForReact();
          const root = ReactDOM.createRoot(
            document.getElementById('people_head') as HTMLElement
          );

          root.render(
            <ShadowView>
              <Reservation />
            </ShadowView>
          );
        }, 3000)
      }

      break;
    case 'timetable.skyeng.ru':
      renderApp(<ShadowView>
        <TimTableInfo />
      </ShadowView>, 'main')
      break;
    case 'vimbox.skyeng.ru':
      СreateCmsButtonfrom()
      break;
    case 'extension-test.ru':
      // renderApp(<ShadowView>
      //   <UserInfo />
      // </ShadowView>, 'main')

      renderApp(
        // <ShadowView>
        <SearchChat styleElement="position-fixed top-0 end-0" />
        // </ShadowView>
        , 'search-chat')

      // window.onload = () => {
      //   setTimeout(async function () {
      //     createDivIdForReact();
      //     const root = ReactDOM.createRoot(
      //       document.getElementById('people_head') as HTMLElement
      //     );

      //     root.render(
      //       <ShadowView>
      //         <Reservation />
      //       </ShadowView>
      //     );
      //   }, 3000)
      // }
      break;
    case 'app.extension-test.ru':
      renderApp(
        <ShadowView>
          <UserInfo />
        </ShadowView>
        , 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>
        , 'search-chat')
      break;
    default:
    // // console.log('default')
    // renderApp(<ShadowView>
    //   <UserInfo />
    // </ShadowView>, 'main')
    // // renderApp(<UserInfo />, 'main-test')
    // renderApp(
    //   <ShadowView>
    //     <SearchChat styleElement="position-fixed top-0 end-0" />
    //   </ShadowView>
    //   , 'search-chat')

    // window.onload = () => {
    //   setTimeout(async function () {
    //     createDivIdForReact();
    //     const root = ReactDOM.createRoot(
    //       document.getElementById('people_head') as HTMLElement
    //     );

    //     root.render(
    //       <ShadowView>
    //         <Reservation />
    //       </ShadowView>
    //     );
    //   }, 3000)
    // }
  }
  // return(
  //   <div>
  //     Test
  //   </div>
  // )
}

export default App;
