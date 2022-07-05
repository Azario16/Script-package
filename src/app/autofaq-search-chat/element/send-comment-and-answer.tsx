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
            sessionId: props.messageInfo.sessionId,
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

// вфетч из инт 24
// fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,ru;q=0.8",
//     "cache-control": "max-age=0",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundarywNkB9K7Y92D2XgUk",
//     "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://skyeng.autofaq.ai/tickets/assigned/c792ff2d-42a8-4e3a-a9ee-b0c050b203b6",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundarywNkB9K7Y92D2XgUk\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"15906237:customer_support_international\",\"conversationId\":\"c792ff2d-42a8-4e3a-a9ee-b0c050b203b6\",\"text\":\"<p>Message 2</p>\"}\r\n------WebKitFormBoundarywNkB9K7Y92D2XgUk--\r\n",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });


// fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "ru,en;q=0.9,mt;q=0.8",
//     "cache-control": "no-cache",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundary4KtHEYQgYopjdhoL",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Yandex\";v=\"22\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "none"
//   },
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundary4KtHEYQgYopjdhoL\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"15906237:customer_support\",\"conversationId\":\"c792ff2d-42a8-4e3a-a9ee-b0c050b203b6\",\"text\":\"test\",\"isComment\":true}\r\n------WebKitFormBoundary4KtHEYQgYopjdhoL--\r\n\"",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });