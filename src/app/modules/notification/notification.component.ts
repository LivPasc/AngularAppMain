import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationModel } from 'src/app/notification-model';
import { PostNotificationService } from 'src/app/shared/post-notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public addForm = new FormGroup({
    notificationDetails: new FormControl(''),
    microcontrollerID: new FormControl(''),
    startDate: new FormControl([
      { value: '', disabled: true },
      Validators.required,
    ]),
  });
  notification: NotificationModel[];
  not = new NotificationModel();

  constructor(
    private postNotification: PostNotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addForm.get('startDate').setValue(new Date()),
      this.addForm.get('startDate').enable();
  }

  deleteForm() {
    this.addForm.reset();
  }
  onSubmit() {
    this.not.microcontrollerID = parseInt(this.addForm.value.microcontrollerID);
    this.not.notificationDetails = this.addForm.value.notificationDetails;
    this.not.dateTime = new Date(
      new Date(this.addForm.value.startDate).getTime() + 60 * 60 * 1000
    );

    console.log(this.not);
    if (this.not.microcontrollerID != null)
      this.postNotification
        .postNotificationMessage(this.not)
        .subscribe((data) => {
          this.deleteForm();
          console.log(data);
        });
  }
}
