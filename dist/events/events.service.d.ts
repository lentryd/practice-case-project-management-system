import { MessageEvent } from '@nestjs/common';
export declare enum EventType {
    TaskCreated = "task.created",
    TaskUpdated = "task.updated",
    TaskDeleted = "task.deleted",
    StageCreated = "stage.created",
    StageUpdated = "stage.updated",
    StageDeleted = "stage.deleted",
    ProjectCreated = "project.created",
    ProjectUpdated = "project.updated",
    ProjectDeleted = "project.deleted"
}
export declare class EventsService {
    private tasksMessageEvent;
    private stagesMessageEvent;
    private projectsMessageEvent;
    sendEvent(event: EventType, data: any): void;
    getTaskObservable(): import("rxjs").Observable<MessageEvent>;
    getStageObservable(): import("rxjs").Observable<MessageEvent>;
    getProjectObservable(): import("rxjs").Observable<MessageEvent>;
}
