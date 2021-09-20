import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Group } from '../Shared/group.service';
import { Lesson, lessonService } from '../Shared/lesson-service';
import { Tutor, tutorService } from '../Shared/tutor.service';
import { WebSocketService } from '../Shared/web-socket.service';

interface clickedLessonData {
  day: number;
  time: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private lessonService: lessonService,
    private tutorService: tutorService,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.listen("resLessonModified").subscribe((data) => {
      this.closebutton.nativeElement.click();
    })
  }

  @ViewChild('closebutton') closebutton!: ElementRef;

  ngOnInit(): void {}

  //common

  //есть ли занятие в кликнутой ячейке
  isLesson(): boolean {
    return this.lessonService.clickedLesson !== false;
  }

  //получить данные занятия, если есть
  getLesson(): Lesson | any {
    if (this.lessonService.clickedLesson) {
      return this.lessonService.clickedLesson;
    } else {
      return false;
    }
  }

  getLessonInfo(): string{
    if (this.isLesson()){
      return this.getLesson().info;
    }else{
      return ''
    }
  }

  //получить списиок преподавателей
  getTutors(): Tutor[] {
    return this.tutorService.tutors;
  }

  //получить данные о кликнутом занятии (день и время)
  getClickedLessonData(): clickedLessonData {
    return this.lessonService.clickedLessonData;
  }

  //получить список свободных преподавателей
  getAvailTutors(): Tutor[] {
    const unavailTutors: number[] = this.lessonService.lessons
      .filter(
        (v) =>
          v.time == this.getClickedLessonData().time &&
          v.day == this.getClickedLessonData().day
      )
      .map((v) => v.tutor!.id);
    return this.getTutors().filter((v) => unavailTutors.indexOf(v.id) == -1);
  }

  //получить список занятых преподавателей
  getUnavailTutors(): Tutor[] {
    const unavailTutors: number[] = this.lessonService.lessons
      .filter(
        (v) =>
          v.time == this.getClickedLessonData().time &&
          v.day == this.getClickedLessonData().day
      )
      .map((v) => v.tutor!.id);
    try {
      return this.getTutors().filter(
        (v) =>
          unavailTutors.indexOf(v.id) != -1 && v.id != this.getLesson().tutor.id
      );
    } catch {
      return this.getTutors().filter((v) => unavailTutors.indexOf(v.id) != -1);
    }
  }

  //перевод в текст для HTML шаблона
  tutorToText(t: Tutor): string {
    return JSON.stringify(t);
  }

  //buttons


  //кнопка сохранить
  saveLesson(info: string, tutor: string) {
    const newLesson: any = {
      info: info,
      tutor: JSON.parse(tutor),
      day: this.getClickedLessonData().day,
      time: this.getClickedLessonData().time,
      group: this.lessonService.clickedLessonGroup,
    };
    if(this.isLesson()){
      newLesson.id = this.getLesson().id
    }
    // console.log(JSON.stringify(newLesson));
    this.webSocketService.emit('reqSaveLesson', newLesson);
  }

  //кнопка удалить
  deleteLesson(){
    this.webSocketService.emit('reqDeleteLesson', this.getLesson().id)
  }
}
