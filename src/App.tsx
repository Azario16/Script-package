
import ReactDOM from 'react-dom/client';
import { renderApp } from './core/create-render-app'
import ModalWindow from './app/modal-window'
import './app/dark-mode'
import UserInfo from './app/user-info'
import { AutoFaqPeople } from './app/autofaq-people'
import SearchChat from './app/autofaq-search-chat';
import TimTableInfo from './app/time-table';
import СreateCmsButtonfrom from './app/vimbox-cms'
import ShadowView from './shadow-view';
import Storage from './service/storage/storage.service';
import { AutoFaqUserInfoService } from './service/autofaq/user-info.servise';

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
  const elm: HTMLElement = document.createElement('div');
  const appenfElem = document.querySelector('div[class="app-content"] > ul[role="menu"]');
  if (appenfElem !== null) {
    appenfElem.append(elm)
  }
  outerHTMLElement(elm)
}


const App: any = () => {
  renderApp(
    <ShadowView>
      <ModalWindow />
    </ShadowView>,
    'modal-window'
  )

  switch (window.location.hostname) {
    case 'localhost':
      const body = document.querySelector('body')
      if (body) {
        body.style.background = 'black'
      }
      renderApp(<UserInfo />, 'main')

      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>
        , 'search-chat'
      )
      renderApp(
        <ShadowView>
          <AutoFaqPeople />
        </ShadowView>
        , 'people-list'
      )

      break;
    case 'crm2.skyeng.ru':
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main'
      )
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>, 'search-chat'
      )

      break;
    case 'build.extension-test.ru':
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>,
        'search-chat'
      )

      break;
    case 'datsy.ru':
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')
      renderApp(
        <ShadowView>
          <SearchChat styleElement="position-fixed top-0 end-0" />
        </ShadowView>,
        'search-chat'
      )

      break;
    case 'skyeng.autofaq.ai':
      AutoFaqUserInfoService.saveUserInfoForStore()
    
      renderApp(<ShadowView>
        <UserInfo />
      </ShadowView>, 'main')

      renderApp(
        <ShadowView>
          <SearchChat styleElement="float-end vh-100" />
        </ShadowView>,
        'search-chat'
      )

      window.onload = () => {
        Storage.read('autofaq-users-list').then(config => {
          if (config === undefined) config = true;
          if (config === false) return;

          setTimeout(async function () {
            createDivIdForReact();

            const root = ReactDOM.createRoot(
              document.getElementById('people_head') as HTMLElement
            );

            root.render(
              <ShadowView>
                <AutoFaqPeople />
              </ShadowView>
            );
          }, 3000);
        });
      }

      break;
    case 'timetable.skyeng.ru':
      renderApp(<ShadowView>
        <TimTableInfo />
      </ShadowView>, 'main')

      break;
    case 'vimbox.skyeng.ru':
      Storage.createSupportMark();
      СreateCmsButtonfrom();

      break;
    default:
  }
}

export default App;