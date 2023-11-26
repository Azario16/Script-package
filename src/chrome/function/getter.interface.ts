export interface Getter {
    name: string;
    call: GetterCallback;
}

export interface Call {
    messageValue: any;
    callback: any;
    sender?: any;
}

export type GetterCallback = (call: Call) => {}