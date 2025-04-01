import React from 'react'
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions";

import UserStatus from './element/user-statuc-block'
import { Logger } from '../../service/logger/logger.service';
import { OperatorInfo } from '../../models/autofaq/operator-info.model';
import { OnOperator, OperatorsStatisticCurrentStateResponse, OperatorStatus, UnAssigned } from '../../models/autofaq/operator-statistic.model';

export interface ClassValue {
    status: string,
    color: string,
}

interface IOperatorStatus {
    online: OnOperator[];
    busy: OnOperator[];
    pause: OnOperator[];
}

export class AutoFaqPeople extends React.Component<object, {
    userKbs: any,
    userGroup: any,
    error: any,
    data: any,
    isLoadedData: boolean,
    isLoaded: boolean,
    operatorStatus: IOperatorStatus,
    groupCnt: number,
    class: Array<ClassValue>,
}> {

    private userId = ''

    constructor(props: any) {
        super(props);
        this.state = {
            userKbs: [],
            userGroup: null,
            error: null,
            data: [],
            isLoadedData: false,
            isLoaded: false,
            operatorStatus: {
                online: [],
                busy: [],
                pause: []
            },
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
        sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: OperatorInfo) => {
            Logger.debug('AutoFaqPeople ', result)
            this.userId = result.id
            this.getCurrentState()
        })


        setInterval(this.getCurrentState.bind(this), 10000)
    }

    async getCurrentState() {
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE, '', (result: OperatorsStatisticCurrentStateResponse) => {
            Logger.debug('GET_AUTOFAQ_PEOPLE', result);

            const currentOperator = this.findCurrentOnOperator(result)
            Logger.debug('currentOperator', currentOperator);
            if (!currentOperator) {
                return;
            }
            Logger.debug('currentOperator', currentOperator);

            const operatorInGroup = this.findOnOperatorInGroup(currentOperator.groupId, result)
            Logger.debug(operatorInGroup);
            const operatorNotOffline = this.findOnOperatorNotOffline(operatorInGroup)

            const operatorStatus = this.parseStatus(operatorNotOffline)

            const countUnAssignedGroup = this.getCountUnAssignedGroup(currentOperator.groupId, result.unAssigned)
            this.setState({
                isLoaded: true,
                operatorStatus: operatorStatus,
                groupCnt: countUnAssignedGroup,
            })
        })
    }

    parseStatus(onOperators: OnOperator[]): IOperatorStatus {
        const online = this.parse('Online', onOperators);
        const busy = this.parse('Busy', onOperators);
        const pause = this.parse('Pause', onOperators);

        const parseResult = {
            online: online,
            busy: busy,
            pause: pause
        }

        return parseResult
    }

    checkGroupOperator(person: {
        groupId: string,
        groupsId?: Array<string>,
        operator: {
            kbs: Array<number>
        }
    }) {
        let state = false;

        for (let i = 0; i < this.state.userKbs.length; i++) {
            if (person.operator.kbs.includes(this.state.userKbs[i])) {
                state = true;
                break;
            }
        }

        if (!state || !person.operator.kbs.length) {
            state = this.state.userGroup === person.groupId;

            const groupsId = person.groupsId || [];
            if (!state && groupsId.length) {
                state = groupsId.includes(this.state.userGroup);
            }
        }

        return state;
    }

    parse(status: OperatorStatus, onOperators: OnOperator[]) {
        return onOperators
            .filter(onOperator => onOperator.operator.status === status)
    }

    colorUndistributed() {
        if (this.state.groupCnt < 5) {
            return "bg-success"
        } else {
            return "bg-danger"
        }
    }

    getCountUnAssignedGroup(groupId: string, unAssigneds: UnAssigned[]): number {

        const unAssigned = unAssigneds.find(value => value.groupId === groupId)
        if(!unAssigned){
            return 0;
        }

        Logger.debug(unAssigned.count)

        return unAssigned.count;
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
                                    <span className="ant-badge user-select-none  mx-1">Очередь</span>
                                </span>
                            </div>
                            <div className="ant-menu-item ant-menu-item-only-child " data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <span className="ps-4 user-select-none "> Список </span>
                            </div>
                            <div className="collapse show" id="collapseExample">
                                <div className="card card-body ant-menu-dark ant-menu ant-menu-sub ant-menu-inline">
                                    <div className="">
                                        {
                                            this.state.operatorStatus.online.map((body) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.operator.status
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.operator.id)} key={body.operator.fullName} />
                                                )
                                            })
                                        }

                                        {
                                            this.state.operatorStatus.busy.map((body) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.operator.status
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.operator.id)} key={body.operator.fullName} />
                                                )
                                            })
                                        }
                                        {
                                            this.state.operatorStatus.pause.map((body) => {
                                                const status = this.state.class.find((value: ClassValue) => {
                                                    return value.status === body.operator.status
                                                })
                                                return (
                                                    <UserStatus body={body} status={status} searchChat={this.openModalElenet.bind(this, body.operator.id)} key={body.operator.fullName} />
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

    private findCurrentOnOperator(operatorsStatisticCurrentState: OperatorsStatisticCurrentStateResponse): OnOperator | null {
        const onOperator = operatorsStatisticCurrentState.onOperator
            .find(onOperator => onOperator.operator.id === this.userId)
        return onOperator ? onOperator : null
    }

    private findOnOperatorInGroup(groupId: string, operatorsStatisticCurrentState: OperatorsStatisticCurrentStateResponse): OnOperator[] {
        return operatorsStatisticCurrentState.onOperator
            .filter(onOperator => onOperator.groupId === groupId)
    }

    private findOnOperatorNotOffline(onOperators: OnOperator[]): OnOperator[] {
        return onOperators
            .filter(onOperator => onOperator.operator.status !== "Offline")
    }
}