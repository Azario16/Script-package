import React from 'react'
import Colapse from 'bootstrap/js/dist/collapse.js';
import ReactDOM from 'react-dom/client';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions-bg";

import { navigateComponent } from '../autofaq-search-chat/page/home'

import UserStatus from './element/user-statuc-block'

function createDivIdForReact() {
    let elm: HTMLElement = document.createElement('li');
    const appenfElem = document.querySelector('div[class="app-content bg-dark"] > ul[role="menu"]');
    if (appenfElem !== null) {
        appenfElem.append(elm)
    }
    elm.outerHTML = `
        <li id="people_head" class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
        </li>
        `;
}

// type State {
//     active: boolean
//   }
interface ClassValue {
    status: string,
    color: string,
}

function innerTextElement(node: HTMLElement): string {
    return node.innerText; // Property 'innerText' does not exist on 'T'
}
// async function StatusAutofaqPeopleRender() {
class Reservation extends React.Component<{}, {
    userGroup: string,
    //userGroup: 'ТП',
    userName: string,
    //userName: 'ТП-Гусейнов Рахид',
    userKbs: any,
    error: any,
    data: any,
    isLoadedData: boolean,
    isLoaded: boolean,
    operStatus: any,
    ArrPeople: any,
    groupCnt: 0,
    class: Array<ClassValue>,
}> {
    constructor(props: any) {
        const userGroupElem: HTMLElement = document.querySelector('.user_menu-dropdown-user_name')!
        const userNameElem: HTMLElement = document.querySelector('.user_menu-dropdown-user_name')!
        let userGroup: string;
        let userName: string;

        userGroup = innerTextElement(userGroupElem).split('-')[0];;
        userName = innerTextElement(userNameElem);
        super(props);
        this.state = {
            userGroup: userGroup,
            // userGroup: 'ТП',
            // userGroup: '',
            userName: userName,
            // userName: 'ТП-Гусейнов Рахид',
            // userName: '',
            userKbs: [],
            error: null,
            data: [],
            isLoadedData: false,
            isLoaded: false,
            operStatus: [],
            ArrPeople: [],
            groupCnt: 0,
            class: [
                {
                    status: 'Online',
                    color: 'bg-success'
                },
                {
                    status: 'Busy',
                    color: 'bg-warning'
                },
                {
                    status: 'Pause',
                    color: 'bg-danger'
                }
            ],
        };
        // }

    }

    componentDidMount() {
        //console.log("componentDidUpdate")
        this.getCurrentState()
        // setTimeout(this.getCurrentState.bind(this), 3000)
        setInterval(this.getCurrentState.bind(this), 15000)
    }
    get_operator_chats(test: any) {
        console.log(test)
        console.log("Run")
    }
    getChatOperator(this: any, operatorId: string) {
        console.log(navigateComponent)
        navigateComponent.getNavigate(operatorId)
        // console.log('test')
        // const navigate = useNavigate();
        // navigate("/chat-list/1234");
    }
    async getCurrentState() {
        // console.log("getCurrentState")
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE, '', (result: any) => {
            const operState = result['people-list']
            // console.log(operState)
            // console.log(this.state)
            // console.log(this.state.groupCnt)
            const operStatus = this.parseStatus(operState)
            // console.log(operStatus)
            let operStatusRender = Object.assign({}, operStatus.Online, operStatus.Busy, operStatus.Pause);
            let cCntUndistributedGroup = this.checkSumContTematicGroup(operState)
            this.setState({
                isLoaded: true,
                data: operState,
                operStatus: operStatus,
                groupCnt: cCntUndistributedGroup,
                ArrPeople: operStatusRender
            })
            // console.log(this.state)
        })
    }
    parseStatus(data: any) {
        //console.log('parseStatus')
        const online = this.parse('Online', this.state.userGroup, data);
        const busy = this.parse('Busy', this.state.userGroup, data);
        const pause = this.parse('Pause', this.state.userGroup, data);

        const parseResult = {
            Online: online,
            Busy: busy,
            Pause: pause
        }
        return parseResult
    }
    parse(status: any, groupIdParse: any, data: any) {
        //console.log('parse')
        //console.log(status, groupIdParse)
        const userList: any = []
        const userKB: any = []
        let userInfo = {};
        // статус операторов на английском, решил в массиве сразу интерпретировать а не в момент когда буду делать строку для отправки
        // используется для бота, здесь просто оставлю возможно пригодится
        data.forEach((person: any, index: any) => {
            // AF вместо 0 чатов отдает null, тут условие чтобы были нули
            if (person.operator !== null) {
                // Ищем совпадения по имени того кто зашел в систему и присваиваем тематику в state
                if (person.operator.fullName === this.state.userName) {
                    this.setState({ userKbs: person.operator.kbs })
                    userKB.push(person.operator.kbs)
                    // console.log(this.state)
                    // console.log(person.operator.kbs)
                }

                if (person.operator.status === status && person.operator.fullName.split('-')[0] == groupIdParse) {
                    if (person.aCnt === null) {
                        data[index].aCnt = 0;
                    }
                    if (person.cCnt === null) {
                        data[index].cCnt = 0;
                    }
                    userInfo = {
                        name: person.operator.fullName,
                        id: person.operator.id,
                        stats: status,
                        aCnt: data[index].aCnt,
                        cCnt: data[index].cCnt,
                        sCnt: data[index].aCnt + data[index].cCnt,
                    }
                    userList.push(userInfo);
                }
            }
        });
        return userList;
    }
    colorUndistributed() {
        if (this.state.groupCnt < 5) {
            return "bg-success"
        } else {
            return "bg-danger"
        }
    }
    checkSumContTematicGroup(operState: any) {
        //console.log('checkSumContTematicGroup')
        const listCntUndistributed: any = [];
        const userKb = operState.find((person: any) => {
            return person.operator.fullName === this.state.userName
        })
        operState.forEach((operatorState: any) => {
            if (operatorState.operator === null) {
                if (userKb.operator.kbs.includes(operatorState.kb)) {
                    listCntUndistributed.push(operatorState.cCnt)
                }
            }
        });
        const summCnt = listCntUndistributed.reduce((sum: any, current: any) => sum + current, 0);
        return summCnt;
    }
    render() {
        // console.log('Render')
        // console.log(this.state.userKbs)
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <div className="ant-menu-item ant-menu-item-only-child">
                        <div className={this.colorUndistributed() + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>{this.state.groupCnt}</div>
                        <span className="">
                            <span className="ant-badge user-select-none  mx-1">Нераспред</span>
                        </span>
                    </div>
                    <div className="ant-menu-item ant-menu-item-only-child " data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <span className="ps-4 user-select-none "> Список </span>
                    </div>
                    <div className="collapse show" id="collapseExample">
                        <div className="card card-body ant-menu-dark ant-menu ant-menu-sub ant-menu-inline">
                            <div className="">
                                {
                                    this.state.operStatus.Online.map((body: any, number: any) => {
                                        const status = this.state.class.find((value: ClassValue) => {
                                            return value.status === body.stats
                                        })
                                        return (
                                            <UserStatus body={body} status={status} searchChat={this.getChatOperator.bind(this, body.id)} key={body.name} />
                                        )
                                    })
                                }

                                {
                                    this.state.operStatus.Busy.map((body: any) => {
                                        const status = this.state.class.find((value: ClassValue) => {
                                            return value.status === body.stats
                                        })
                                        return (
                                            <UserStatus body={body} status={status} searchChat={this.getChatOperator.bind(this, body.id)} key={body.name} />
                                        )
                                    })
                                }
                                {
                                    this.state.operStatus.Pause.map((body: any, number: any) => {
                                        const status = this.state.class.find((value: ClassValue) => {
                                            return value.status === body.stats
                                        })
                                        return (
                                            <UserStatus body={body} status={status} searchChat={this.getChatOperator.bind(this, body.id)} key={body.name} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div >
            )

        }
    }
}
// const root = ReactDOM.createRoot(
//     document.querySelector('#people_head') as HTMLElement
// );

// root.render(
//     <Reservation />
// );
// ReactDom.render(
//     <Reservation />, document.querySelector('#people_head'),
// );
// }
export default Reservation;