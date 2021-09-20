import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";

export interface Tutor {
    id: number
    name: string
}

@Injectable({ providedIn: 'root' })
export class tutorService {

    public tutors: Tutor[] = [];
    
}