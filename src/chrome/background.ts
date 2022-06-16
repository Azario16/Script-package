import { ChromeMessage, Sender } from "../interface/types";
import { mapFunction } from "./function/map-function"
type MessageResponse = (response?: any, arg2?: () => void) => void


const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: any,
) => {


    console.log(sender)
    console.log(message)
    const getFunction = mapFunction(message.messageName)
    getFunction(message.messageValue, (result: any) => {
        response(result)
    })
    console.log('MESSAGE: ');
    let msg = 'test';
    console.log('got msg form device -> ', msg);
    // chrome.tabs.query({ active: true }, function (tabs: any) {
    //     console.log(tabs);
    //     console.log('tab > ', tabs[0].url, tabs[0].id);
    //     let convertedData = 'test';
    //     chrome.tabs.sendMessage(tabs[0].id, {
    //         action: msg === 'removed' ? msg : 'showDepositModal',
    //         data: convertedData
    //     }, function (response) {
    //         console.log(response);
    //     });
    // })

    return true;

}

const messagesFromApiExtension = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: any,
) => {


    console.log(message)
    console.log(sender)
    // console.log(response)
    let msg = 'test';
    chrome.tabs.query({ active: true }, function (tabs: any) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, message);
    })
}


const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessageExternal.addListener(messagesFromApiExtension);

    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);


    // chrome.runtime.onMessageExternal.addListener(messagesFromApiExtension);

    // chrome.runtime.onConnectExternal.addListener(function (port) {
    //     port.onMessage.addListener(messagesFromApiExtension);
    // });

}

main();


