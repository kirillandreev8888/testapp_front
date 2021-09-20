import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../Shared/group.service';
import { Lesson, lessonService } from '../Shared/lesson-service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  @Input() day: number = 0;
  @Input() time: number = 0;
  @Input() group!: Group;

  constructor(public lessonService: lessonService) {}

  ngOnInit(): void {}

  //common

  //есть ли в данной ячейке занятие
  isLesson(): boolean {
    return (
      this.lessonService.lessons.filter(
        (v) =>
          v.day === this.day &&
          v.time === this.time &&
          v.group!.id == this.group.id
      ).length != 0
    );
  }

  //найти занятие из данной ячейки
  findThisLesson(): Lesson {
    return this.lessonService.lessons.filter(
      (v) =>
        v.day === this.day &&
        v.time === this.time &&
        v.group!.id == this.group.id
    )[0];
  }

  //buttons

  //нажатие на занятие
  editLesson() {
    if (this.isLesson()) {
      this.lessonService.clickedLesson = this.findThisLesson();
    } else {
      this.lessonService.clickedLesson = false;
    }
    this.lessonService.clickedLessonData = {
      day: this.day,
      time: this.time,
    };
    this.lessonService.clickedLessonGroup = this.group;
  }

}
