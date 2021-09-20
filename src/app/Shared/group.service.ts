import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";

export interface Group {
    id: number
    name: string
}

@Injectable({ providedIn: 'root' })
export class groupService {

    public groups: Group[] = [];

    // public addGroup(group: Group){
    //     this.groups.push(group)
    // }

}