import { BehaviorSubject} from 'rxjs'
import { ACTIONS } from '../../../chrome/actions'
import { sendMessage } from '../../../chrome/utils'
import { isExtensionContext } from '../../../service/chrome-runtime.service';
import { DateTimeService } from '../../../service/date-time/date-time.service';
import { ActionTask } from './task.interface';

const CRM_TASK_START_ASSIGN_DATE_TIME = 'crmTaskStartAssignDate'
const CRM_TASK_START_ASSIGN_ID = 'crmTaskStartAssignId'

class Task {
    private isActiveTask = new BehaviorSubject<boolean>(false);
    isActiveTask$ = this.isActiveTask.asObservable();

    private startAssignDate = new BehaviorSubject<string>('');
    startAssignDate$ = this.startAssignDate.asObservable();

    constructor() {
        this.subscribeOnChangeHashActiveTask()
        this.updateStartAssign()
    }

    private updateStartAssign(): void {
        sendMessage(ACTIONS.GET_CURRENT_TASK, '', (result: any) => {
            if (!result.data) {
                return;
            }

            const crmTaskStartAssignDateTime = localStorage.getItem(CRM_TASK_START_ASSIGN_DATE_TIME)
            const crmTaskStartAssignId = localStorage.getItem(CRM_TASK_START_ASSIGN_ID)

            if (!crmTaskStartAssignDateTime || !crmTaskStartAssignId) {
                this.createTaskStartAssignDataTimeToStorage()
                this.createTaskStartAssignIdToStorage(result.data.id)
                return;
            }

            if (result.data.id === Number(crmTaskStartAssignId)) {
                this.startAssignDate.next(crmTaskStartAssignDateTime)
                return;
            }

            this.createTaskStartAssignDataTimeToStorage()
            this.createTaskStartAssignIdToStorage(result.data.id)
        })
    }

    private subscribeOnChangeHashActiveTask(): void {
        const onMessage = (request: any) => {
            if (request.event === "webRequestCompleted") {
                const actonTaskData = this.getRequestAction(request.data.url)

                switch (actonTaskData?.action) {
                    case 'take':
                        this.isActiveTask.next(true)
                        this.createTaskStartAssignIdToStorage(actonTaskData.taskId);
                        this.createTaskStartAssignDataTimeToStorage();
                        break;
                    case 'priority':
                        this.isActiveTask.next(true)
                        this.createTaskStartAssignDataTimeToStorage();
                        this.updateAssignTaskIdToLocaleStorage()
                        break;

                    case 'complete':
                        this.isActiveTask.next(false)
                        break;
                    default:
                        break;
                }
            }
        }

        if(isExtensionContext()){
            chrome.runtime.onMessage.addListener(onMessage);
        }

        sendMessage(ACTIONS.GET_TASK_HASH_AVAILABLE, '', (result: any) => {
            if (result.data) {
                this.isActiveTask.next(result.data.hasActiveTask)
            }
        })
    }

    private createTaskStartAssignDataTimeToStorage(): void {
        const dateTime = DateTimeService.getFormateDateTime('yyyy.MM.dd, HH:mm:ss')
        localStorage.setItem(CRM_TASK_START_ASSIGN_DATE_TIME, dateTime)
        this.startAssignDate.next(dateTime)
    }

    private createTaskStartAssignIdToStorage(taskId: number): void {
        localStorage.setItem(CRM_TASK_START_ASSIGN_ID, `${taskId}`)
    }

    private getRequestAction(url: string): ActionTask | null {
        const taskIdRegex = /\/task\/(\d+)/;
        const takeRegex = /\/task\/(\d+)\/take/;
        const completeRegex = /\/task\/(\d+)\/complete/;
        const priorityRegex = /\/task\/priority/;

        const task = url.match(taskIdRegex);

        if (!task) {
            return null;
        }

        const taskId = Number(task[1])

        if (takeRegex.test(url)) {
            return { action: 'take', taskId: taskId };
        } else if (completeRegex.test(url)) {
            return { action: 'complete', taskId: taskId };
        } else if (priorityRegex.test(url)) {
            return { action: 'priority' };
        } else {
            return null;
        }
    }

    private updateAssignTaskIdToLocaleStorage(): void {
        sendMessage(ACTIONS.GET_CURRENT_TASK, '', (result: any) => {
            if (!result.data) {
                return;
            }

            this.createTaskStartAssignIdToStorage(result.data.id)
        })
    }
}

const TaskService = new Task()

export { TaskService, CRM_TASK_START_ASSIGN_DATE_TIME }