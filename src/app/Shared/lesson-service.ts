import { Injectable } from "@angular/core";
import { Group } from "./group.service";
import { Tutor } from "./tutor.service";
import { WebSocketService } from "./web-socket.service";

export interface Lesson {
    id: number
    info: string
    day: number
    time: number
    group?: Group
    tutor?: Tutor

}

@Injectable({ providedIn: 'root' })
export class lessonService {

    // constructor(private webSocketService: WebSocketService ) {};

    public lessons: Lesson[] = [];
    public clickedLesson: Lesson | false = false;
    public clickedLessonData = {
        day: 0,
        time: 0,
    }
    public clickedLessonGroup! : Group;

    
}