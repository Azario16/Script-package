import { ChromeMessage } from "../interface/types";
import { mapFunction } from "./function/map-function"

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].url);
    });
}

export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].id);
    });
}

export const getMessage = (callback: () => void): void => {
    callback();
}

export const sendMessage = (mesageName: string, messageValue: any, callbackSend: any) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === 'extension-test.ru') {
        // console.log('На текуйщей странице')
        // const getFunction = mapFunction(mesageName)
        // getFunction(messageValue, (result: any) => {
        //     callback(result)
        // })

        const callback = (result: any) => {
            callbackSend(result)
        }

        const sender = null

        const getFunction = mapFunction(mesageName)
        getFunction({ messageValue, sender, callback })
    } else {
        // console.log('Страниа бэкграунда ')
        const message: ChromeMessage = {
            messageValue: messageValue,
            messageName: mesageName,
        }
        chrome.runtime.sendMessage(message, (response) => {
            // 3. Got an asynchronous response with the data from the background
            callbackSend(response)
            // console.log(response);
        });
    }
};