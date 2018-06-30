
export interface TaskUpdates {
    updateId:   string;
    updateText: string;
    updateTimeStamp: string
}

export enum TaskStatus {
    OPEN = 0,
    IN_PROGRESS = 1,
    BLOCKED = 2,
    COMPLETE = 3
}

export interface TouchStamp {
    timestamp: Date;
    touchMessage: string;
    stamp: ActivityStamp

}

export enum ActivityStamp {
    TASK_CREATE = 0,
    TASK_UPDATE = 1,
    TASK_STATUS_CHANGE = 2
}

export interface Task {
    taskId?:     string;
    taskTitle:  string;
    taskDesc?:  string;
    taskStatus: TaskStatus;
    taskUpdates?: TaskUpdates[];
    taskActivity?: TouchStamp[];
    lastUpdate?: any;
}

