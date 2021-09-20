import { Component, OnInit } from '@angular/core';
import { Group, groupService } from './Shared/group.service';
import { lessonService } from './Shared/lesson-service';
import { reqestService } from './Shared/request.service';
import { tutorService } from './Shared/tutor.service';
import { WebSocketService } from './Shared/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Расписание';
  dayNames: string[] = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  constructor(
    public groupService: groupService,
    public requestService: reqestService,
    private webSocketService: WebSocketService,
    public lessonService: lessonService,
    public tutorService: tutorService
  ) {
    this.webSocketService.listen('resGroups').subscribe((data) => {
      this.groupService.groups = JSON.parse(data);
    });
    this.webSocketService.listen('resLessons').subscribe((data) => {
      this.lessonService.lessons = JSON.parse(data);
    });
    this.webSocketService.listen('resTutors').subscribe((data) => {
      this.tutorService.tutors = JSON.parse(data);
    });
  }

  ngOnInit(): void {
    this.webSocketService.emit('reqGroups', 'some text');
    this.webSocketService.emit('reqLessons', 'some text');
    this.webSocketService.emit('reqTutors', 'some text');
  }
  // common
  isMaxGroups() {
    return this.groupService.groups.length == 4;
  }
  getGroups(): Group[] {
    return this.groupService.groups;
  }

  //clicks
  addGroupButtonClick() {
    let name = prompt('Введите название группы');
    if (name != null && name != ''){
      this.webSocketService.emit('reqAddGroup', name);
    };
  }
  deleteGroupButtonClick(group: Group) {
    if (confirm(`Удалить группу ${group.name}?`)){
      this.webSocketService.emit('reqDeleteGroup', group.id)
    }
  }
}
