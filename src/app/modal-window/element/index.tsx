import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { Modal } from 'bootstrap';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";

const ModalElements = () => {
    return {
        AssignChat: (props: any) => {
            const [show, setShow] = useState(false);
            const [showAnimat, setShowAnimat] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            const [MODAL_ELEMENT, setModalElement] = useState<any>()
            const modalRef = useRef<any>()


            const toogelModalElenet = () => {
                if (MODAL_ELEMENT !== undefined) {
                    modalRef.current.toggle()
                    setShowAnimat(true)
                    handleShow()
                }
            }

            const assignChatAf = (callback: any) => {
                const getParams = {
                    chatId: props.param.chatId,
                    operatorAfId: props.param.afUserId,
                }
                sendMessage(ACTIONS.GET_AUTOFAQ_ASSIGN_CHAT, getParams, (result: any) => {
                    callback(result)
                })
            }

            useEffect(() => {
                if (MODAL_ELEMENT) {
                    MODAL_ELEMENT.addEventListener('hide.bs.modal', (event: any) => {
                        setShowAnimat(false)
                    })
                    MODAL_ELEMENT.addEventListener('hidden.bs.modal', (event: any) => {
                        props.handleClose()
                        handleClose()
                    })
                    modalRef.current = new Modal(MODAL_ELEMENT)
                    toogelModalElenet()
                }
            }, [MODAL_ELEMENT])

            return (
                <>
                    <div
                        className="modal fade"
                        ref={ref => setModalElement(ref)}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-b-border fs-4">
                                    <h5 className="modal-title text-light" id="exampleModalLabel">Ассайн чата {props.chatId}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"
                                        onClick={() => {
                                            if (MODAL_ELEMENT) {
                                                toogelModalElenet()
                                            }
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body bg-dark text-light">
                                    Забрать чат может только супервизор
                                </div>
                                <div className="modal-footer bg-dark">
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => {
                                            if (MODAL_ELEMENT) {
                                                assignChatAf((result: any) => {
                                                    if (result["assign-chat"]?.id) {
                                                        toogelModalElenet()
                                                    } else {
                                                        const value: string = `Не удалось создать чат`
                                                    }
                                                })
                                            }
                                        }}
                                    >Подтвердить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!!show &&
                        <div className={`modal-backdrop fade ${showAnimat ? 'show' : ''}`}></div>
                    }
                </>
            )
        },
        CreateChat: (props: any) => {
            const [show, setShow] = useState(false);
            const [showAnimat, setShowAnimat] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            const [MODAL_ELEMENT, setModalElement] = useState<any>()
            const modalRef = useRef<any>()
            const [BODY_VALUE, setBodyValue] = useState<any>('Эта функция временно работает только для сотрудников ТП')
            const [ERROR, setError] = useState<boolean>(false)
            const errorValue = useRef<any>()

            const startChatAutofaq = (callback: any) => {
                const getParams = {
                    userId: props.param.userId,
                    afOperatorValue: props.param.afOperatorValue,
                }
                sendMessage(ACTIONS.GET_AUTOFAQ_START_CHAT, getParams, (result: any) => {
                    callback(result)
                })
            }

            const toogelModalElenet = () => {
                if (MODAL_ELEMENT !== undefined) {
                    modalRef.current.toggle()
                    setShowAnimat(true)
                    handleShow()
                }
            }

            useEffect(() => {
                if (MODAL_ELEMENT) {
                    MODAL_ELEMENT.addEventListener('hide.bs.modal', (event: any) => {
                        setShowAnimat(false)
                    })
                    MODAL_ELEMENT.addEventListener('hidden.bs.modal', (event: any) => {
                        props.handleClose()
                        handleClose()
                    })
                    modalRef.current = new Modal(MODAL_ELEMENT)
                    toogelModalElenet()
                }
            }, [MODAL_ELEMENT])

            return (
                <>
                    <div
                        className="modal fade"
                        ref={ref => setModalElement(ref)}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-b-border fs-4">
                                    <h5 className="modal-title text-light" id="exampleModalLabel">Создание чата с {props.param.userId}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"
                                        onClick={() => {
                                            if (MODAL_ELEMENT) {
                                                toogelModalElenet()
                                            }
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body bg-dark text-light">
                                    {BODY_VALUE}
                                    <br />
                                    {
                                        ERROR &&
                                        <div>
                                            <pre>
                                                {errorValue.current}
                                            </pre>
                                        </div>
                                    }
                                </div>
                                {
                                    !ERROR &&
                                    <div className="modal-footer bg-dark">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            onClick={() => {
                                                if (MODAL_ELEMENT) {
                                                    startChatAutofaq((result: any) => {
                                                        if (result["start-chat"]?.conversationId) {
                                                            window.open(`https://skyeng.autofaq.ai/tickets/assigned/${result["start-chat"].conversationId}`)
                                                            toogelModalElenet()
                                                        } else {
                                                            const value: string = `Не удалось создать чат`
                                                            errorValue.current = JSON.stringify(result, null, 2)
                                                            setError(true)
                                                            setBodyValue(value)
                                                        }
                                                    })


                                                }
                                            }}
                                        >Открыть вкладку на чат</button>
                                        <button type="button" className="btn btn-primary"
                                            onClick={() => {
                                                if (MODAL_ELEMENT) {
                                                    startChatAutofaq((result: any) => {
                                                        if (result["start-chat"]?.conversationId) {
                                                            toogelModalElenet()
                                                        } else {
                                                            const value: string = `Не удалось создать чат`
                                                            errorValue.current = JSON.stringify(result, null, 2)
                                                            setError(true)
                                                            setBodyValue(value)
                                                        }
                                                    })
                                                }
                                            }}
                                        >Запустить чат без вкладки</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {!!show &&
                        <div className={`modal-backdrop fade ${showAnimat ? 'show' : ''}`}></div>
                    }
                </>
            )
        }

    }
}

export { ModalElements }