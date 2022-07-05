import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';


const Question = (params: any) => {
    return (
        <div className="chat-message chat-question">
            <div className="chat-message-block chat-message-block--text">
                <div className="chat-message-header">
                    <div className="chat-message-sender text-blue-relation">{params.userName}:
                    </div>
                    <div className="chat-message-time chat-message-time-question">{params.dateTime.dateTime}</div>
                    <div className="chat-message-icons active">
                    </div>
                </div>
                <span className="text-light" dangerouslySetInnerHTML={{ __html: params.text }}>
                </span>
            </div>
        </div>
    )
}

export default Question