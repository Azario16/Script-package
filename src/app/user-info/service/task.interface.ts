export type ActionTask = TakeActionTask | CompleteActionTask | PriorityActionTask;

interface TakeActionTask {
    action: 'take';
    taskId: number;
}

interface CompleteActionTask {
    action: 'complete';
    taskId: number;
}

interface PriorityActionTask {
    action: 'priority';
}