import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    tasksEvents(): Observable<MessageEvent>;
    stagesEvents(): Observable<MessageEvent>;
    projectsEvents(): Observable<MessageEvent>;
}
