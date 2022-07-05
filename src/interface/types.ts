export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    messageValue: any,
    messageName: string
}

export interface ChromeMessageApi {
    messageValue: any,
    messageName: string,
    tabId: string
}
