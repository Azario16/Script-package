import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { Collapse, Dropdown } from 'bootstrap';
import { createPopper } from '@popperjs/core';
import { sendMessage } from '../../../chrome/utils';
import { ACTIONS } from '../../../chrome/actions-bg';

const SendCommentAndAnswer = (props: any) => {
    const [TYPE_SEND, setTypeSend] = useState(true)
    const [INPUT_COLOR, setInputColor] = useState('secondary')
    const [BUTTON_COLOR, setButtonColor] = useState('secondary')
    const [TEXT_SEND, setText] = useState('')
    const [buttonDropdownMenuActiv, setDropdownMenuActiv] = useState<any | null>({})

    const buttonDropdownRef = useRef<any | null>(null)


    const colorTypeRef = useRef({
        comment: 'bg-comment text-light',
        message: '',
        buttonComment: 'btn-secondary',
        buttonMessage: 'btn-primary'
    })

    const dropdownHide = (element: any) => {
        const dropValue = new Dropdown(element)
        dropValue.hide()
    }

    const handleComment = () => {
        setDropdownMenuActiv([
            'active',
            ''
        ])
        setInputColor(colorTypeRef.current.comment)
        setButtonColor(colorTypeRef.current.buttonComment)
        dropdownHide(buttonDropdownRef.current)
        setTypeSend(true)
    }

    const handleMessage = () => {
        setDropdownMenuActiv([
            '',
            'active'
        ])
        setInputColor(colorTypeRef.current.message)
        setButtonColor(colorTypeRef.current.buttonMessage)
        dropdownHide(buttonDropdownRef.current)
        setTypeSend(false)
    }

    const dropDomnToogle = (element: any) => {
        const dropdown = new Dropdown(element, {
            popperConfig: {
                placement: "bottom",
                strategy: 'fixed',
                modifiers: [
                    {
                        name: "offset",
                        enabled: true,
                        options: {
                            roundOffsets: false,
                            offset: [0, 0]
                        }
                    }
                ],
                onFirstUpdate: (elem) => {
                    console.log(elem)
                }
            }
        }
        )
        dropdown.toggle()
    }
    const sendCommentOrAnswer = () => {
        console.log(props)
        const valueMessage = {
            userId: props.userId,
            chatId: props.chatId,
            sendText: TEXT_SEND,
            commentValue: TYPE_SEND,
        }
        sendMessage(ACTIONS.GET_AUTOFAQ_SEND_MESSAGE, valueMessage, (result: any) => {
            props.updateChat()
            setText('')
        })
    }

    useMemo(() => {
        setDropdownMenuActiv([
            'active',
            ''
        ])
        setInputColor(colorTypeRef.current.comment)
        setButtonColor(colorTypeRef.current.buttonComment)
    }, [])

    return (
        <div className="d-flex flex-row justify-content-center ">
            <form className="input-group">

                <textarea
                    className={`form-control ${INPUT_COLOR} h-50px resize-none overflow-hidden `}
                    id="staticEmail2"
                    value={TEXT_SEND}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setText(e.target.value)
                    }}
                    onClick={() => {
                        dropdownHide(buttonDropdownRef.current)
                    }}
                />
                <div className="btn-group">
                    <button type="button" className={`btn ${BUTTON_COLOR} fs-custom-0_9`}
                        onClick={sendCommentOrAnswer}
                    >Отправить</button>
                    <button className={`btn  ${BUTTON_COLOR} dropdown-toggle border`} type="button"
                        onClick={() => {
                            dropDomnToogle(buttonDropdownRef.current)
                        }}
                        ref={buttonDropdownRef}
                    />
                    <ul className="dropdown-menu dropdown-menu-dark "
                    // ref={buttonDropdownRef}
                    >
                        <li className={`dropdown-item ${buttonDropdownMenuActiv[0]}`}
                            onClick={handleComment}
                        >Комментарий</li>
                        <li className={`dropdown-item ${buttonDropdownMenuActiv[1]}`}
                            onClick={handleMessage}
                        >Сообщение</li>
                    </ul>
                </div>

            </form>
        </div>
    )
}

export default SendCommentAndAnswer