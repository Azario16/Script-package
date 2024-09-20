class LoggerService {

    static isDebug = false;

    debug(...logs: any): void {
        if (LoggerService.isDebug) {
            logs
                .forEach((log: any) => {
                    console.log(log)
                });
        }
    }
}

const Logger = new LoggerService();

export { Logger };