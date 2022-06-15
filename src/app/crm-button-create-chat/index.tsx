import React from 'react'
import ReactDom from 'react-dom'
import './../scss.scss'
import Colapse from 'bootstrap/js/dist/collapse.js';

let timer = setInterval(async function () {
    //console.log('Timer start ................')
    if (window.location.href.split('/')[6] == 'process' && document.querySelector('#email-af') == null) {
        //console.log('if ok ................')
        // if (window.location.href.split('/')[6] == 'task') {
        //console.log('Search element ................')
        setTimeout(async function () {
            //console.log('Start............')
            // clearInterval(timer);
            createDivIdForReact();
            await CreateChat();
        }, 1500)
    }
}, 1500)

// Создаем див на странице 
function createDivIdForReact() {
    let elm = document.createElement('div');
    // let test = 'mat-focus-indicator mat-menu-trigger mat-flat-button mat-button-base mat-primary'
    const crmElem = document.querySelector('[class="mat-focus-indicator mat-menu-trigger mat-flat-button mat-button-base mat-primary"]')
    if(crmElem !== null){
        // crmElem.parentElement.appendChild(elm);
    }
    // .parentElement.appendChild(elm);
    elm.outerHTML = `<div class="ps-3" id="email-af"/>`;
}
function get_operator_chats(test: any) {
    console.log(test)
    console.log("Run")
}
async function CreateChat() {
    class Reservation extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            const userID = window.location.href.split('/')[4];
            this.state = {
                userID: userID,
                error: null,
                isLoaded: false,
            };

        }

        async componentDidMount() {
            console.log("componentDidUpdate")
        }

        createChat() {
            let isAdmin = confirm("Запустится чат с учеником, вы уверены?");
            if (isAdmin) {
                let userID = this.state.userID;
                chrome.runtime.sendMessage({ greeting: "create", userID }, function (response) {
                    let result = (response.answer);
                    console.log(result)
                    if (result != 11) {
                        window.open('https://skyeng.autofaq.ai/tickets/assigned');
                    } else if (result == 11) {
                        alert('Код ошибки 11: пользователь не писал в чат')
                    } else {
                        alert('Что-то пошло не так')
                    }
                });
            }
        }

        render() {
            //console.log('Render')
            const { error, isLoaded } = this.state;
            if (error) {
                return <div>Ошибка: {error.message}</div>;
            } else if (isLoaded) {
                return <div>Загрузка...</div>;
            } else {
                return (
                    <button className="mat-focus-indicator mat-menu-trigger mat-flat-button mat-button-base mat-primary" onClick={this.createChat.bind(this)}>
                        <span className="mat-button-wrapper">Написать в АФ</span>
                    </button>
                )

            }
        }
    }

    ReactDom.render(
        <Reservation />, document.querySelector('#email-af'),
    );
}