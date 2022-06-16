export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    messageValue: any,
    messageName: string
}
