class LoggerService {

    private isDebug = localStorage.getItem(`extensionDebug`)

    debug(...logs: any): void {
        if(this.isDebug){
            logs
                .forEach((log: any )=> {           
                    console.log(log)
                });
        }
    }
}

const Logger = new LoggerService()

export { Logger };