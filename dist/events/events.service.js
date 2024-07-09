"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = exports.EventType = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
var EventType;
(function (EventType) {
    EventType["TaskCreated"] = "task.created";
    EventType["TaskUpdated"] = "task.updated";
    EventType["TaskDeleted"] = "task.deleted";
    EventType["StageCreated"] = "stage.created";
    EventType["StageUpdated"] = "stage.updated";
    EventType["StageDeleted"] = "stage.deleted";
    EventType["ProjectCreated"] = "project.created";
    EventType["ProjectUpdated"] = "project.updated";
    EventType["ProjectDeleted"] = "project.deleted";
})(EventType || (exports.EventType = EventType = {}));
let EventsService = class EventsService {
    constructor() {
        this.tasksMessageEvent = new rxjs_1.Subject();
        this.stagesMessageEvent = new rxjs_1.Subject();
        this.projectsMessageEvent = new rxjs_1.Subject();
    }
    sendEvent(event, data) {
        if (event.startsWith('task')) {
            this.tasksMessageEvent.next({ data: { event, data } });
        }
        else if (event.startsWith('stage')) {
            this.stagesMessageEvent.next({ data: { event, data } });
        }
        else if (event.startsWith('project')) {
            this.projectsMessageEvent.next({ data: { event, data } });
        }
    }
    getTaskObservable() {
        return this.tasksMessageEvent.asObservable();
    }
    getStageObservable() {
        return this.stagesMessageEvent.asObservable();
    }
    getProjectObservable() {
        return this.projectsMessageEvent.asObservable();
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
//# sourceMappingURL=events.service.js.map