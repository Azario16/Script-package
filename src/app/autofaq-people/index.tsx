import React from 'react'
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions";

import UserStatus from './element/user-statuc-block'
import { Logger } from '../../service/logger/logger.service';

interface ClassValue {
    status: string,
    color: string,
}

class Reservation extends React.Component<object, {
    userKbs: any,
    userId: any,
    userGroup: any,
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
        super(props);
        this.state = {
            userKbs: [],
            userId: null,
            userGroup: null,
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

    openModalElenet(this: any, operatorId: string) {
        const messageValue = {
            message: 'open-operator-chat',
            operatorAfId: operatorId
        }

        sendMessage(ACTIONS.SEND_EVENT, messageValue, () => {

        })
    }

    componentDidMount() {
        sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: any) => {
            Logger.debug(result)
            this.setState({
                userKbs: result.settings.knowledgeBases,
                userId: result.id,
                userGroup: result.groupList[0]
            })
        })
        this.getCurrentState()
        setInterval(this.getCurrentState.bind(this), 15000)
    }

    async getCurrentState() {
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE, '', (result: any) => {
            Logger.debug(result);

            const operState = this.mutateToUniquePersons(result['people-list'].onOperator);
            const unAssigned = result['people-list'].unAssigned
            const operStatus = this.parseStatus(operState)
            const operStatusRender = Object.assign({}, operStatus.Online, operStatus.Busy, operStatus.Pause);
            const cCntUndistributedGroup = this.checkSumContTematicGroup(unAssigned)
            this.setState({
                isLoaded: true,
                data: operState,
                operStatus: operStatus,
                groupCnt: cCntUndistributedGroup,
                ArrPeople: operStatusRender
            })
        })
    }

    parseStatus(data: any) {
        const online = this.parse('Online', data);
        const busy = this.parse('Busy', data);
        const pause = this.parse('Pause', data);

        const parseResult = {
            Online: online,
            Busy: busy,
            Pause: pause
        }
        return parseResult
    }

    checkGroupOperator(knowledgeBases: any, groupValue: any) {
        let state = false
        this.state.userKbs.forEach((element: any) => {
            if (!state) {
                state = knowledgeBases.includes(element);
            }
        });

        if(!state && !knowledgeBases.length){
            state = this.state.userGroup === groupValue
        }
        return state
    }

    parse(status: any, data: any) {
        const userList: any = []
        let userInfo = {};
        // статус операторов на английском, решил в массиве сразу интерпретировать а не в момент когда буду делать строку для отправки
        // используется для бота, здесь просто оставлю возможно пригодится
        data.forEach((person: any, index: any) => {
            // AF вместо 0 чатов отдает null, тут условие чтобы были нули
            if (person.operator !== null) {
                if (person.operator.status === status && this.checkGroupOperator(person.operator.kbs, person.groupId)) {
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

    checkSumContTematicGroup(unAssigned: any) {
        const listCntUndistributed: any = [];
        unAssigned.forEach((unAssignedBody: any) => {
            if (this.state.userKbs.includes(unAssignedBody.kb)) {
                listCntUndistributed.push(unAssignedBody.count)
            } else if(!this.state.userKbs.length){
                if (this.state.userGroup == unAssignedBody.groupId) {
                    listCntUndistributed.push(unAssignedBody.count)
                }
            }
        });
        Logger.debug(listCntUndistributed)
        const summCnt = listCntUndistributed.reduce((sum: any, current: any) => sum + current, 0);
        return summCnt;
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div className="ant-menu app-content ant-menu-dark ant-menu-root ant-menu-inline">
                    <li className="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-active" role="PeopleList">
                        <div>
                            <div className="ant-menu-item ant-menu-item-only-child">
                                <div className={this.colorUndistributed() + " asign-slot-box fs-el-0_7 badge rounded-pill col-auto row g-0 badge border border-3 border-border-green"}>
                                    <div style={{ top: "1px", position: "relative" }}>{this.state.groupCnt}</div>
                                </div>
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
                                            this.state.operStatus.Online.map((body: any) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.stats
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.id)} key={body.name} />
                                                )
                                            })
                                        }

                                        {
                                            this.state.operStatus.Busy.map((body: any) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.stats
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.id)} key={body.name} />
                                                )
                                            })
                                        }
                                        {
                                            this.state.operStatus.Pause.map((body: any) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.stats
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.id)} key={body.name} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div >
                    </li>
                </div>
            )

        }
    }

    private mutateToUniquePersons(array: any) {
        return Object.values(
            array.reduce((result: any, person: any) => {
                const id = person.operator.id;
            
                if (!result.hasOwnProperty(id)) {
                    result[id] = person;
                    return result;
                }

                if (
                    (result[id].aCnt === 0 && person.aCnt > 0) ||
                    (result[id].cCnt === 0 && person.cCnt > 0)
                ) {
                    result[id] = person;
                    return result;
                }
            
                return result;
            }, {})
        );
    }
}

export default Reservation;