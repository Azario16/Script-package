import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';


const Event = (params: any) => {
    const eventName: any = {
        "NewConversation": 'Начат новый диалог',
        'RunIntegration': `Запущена интеграция ${params.value.payload.name}`,
        // 'RunIntegration' : `Запущена интеграция ${params.value.payload.name}`,
    }

    /* Разбтивка евентов из АФ в валидный вид имени ключа, почему АФ так делает загадка */
    // const splitRegistr = /(?=[A-Z])/g[Symbol.split](params.value.eventTpe)
    // const valueFirst: any = [splitRegistr[0]]
    // const valueAfterTheFirst = splitRegistr.filter((value, key) => {
    //     return key != 0
    // })
    // const changeAfterTheFirst = valueAfterTheFirst.join(' ').toLowerCase().split(' ')

    // const resultNameEvent = valueFirst.concat(changeAfterTheFirst).join(' ')
    // .join(' ')
    const resultNameEvent = eventName[params.value.eventTpe] !== undefined ? eventName[params.value.eventTpe] : params.value.eventTpe

    const eventTable = `${params.operatorName} ${resultNameEvent}`

    return (
        <div className="chat_event text-light bg-dark">
            <div className="chat_event-text bg-dark">
                {eventTable}
            </div>
            <div className="chat_event-time bg-dark">{params.dateTime.time}</div>
        </div >
    )
}

export default Event