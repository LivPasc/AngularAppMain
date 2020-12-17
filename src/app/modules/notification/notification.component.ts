import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationModel } from 'src/app/notification-model';
import { PostNotificationService } from 'src/app/shared/post-notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'microcontrollerID', 'dateTime', 'notificationDetails'];

  dataSource: MatTableDataSource<NotificationModel>;

  notifications: NotificationModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    private formBuilder: FormBuilder,
    private notificationService: PostNotificationService
  ) {}

  ngOnInit(): void {
    this.setupTable();
    this.addForm.get('startDate').setValue(new Date()),
      this.addForm.get('startDate').enable();
  }

  private setupTable() {
    this.notifications = [];
    this.notificationService.getNotificationMessage().subscribe((res) => {
      this.notifications = res;
      this.dataSource = new MatTableDataSource<NotificationModel>(this.notifications);
      this.dataSource.data = this.notifications;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
    if (this.not.microcontrollerID != null)
      this.postNotification
        .postNotificationMessage(this.not)
        .subscribe((data) => {
          this.deleteForm();
          this.setupTable();
        },
        (error) => {
          this.deleteForm();
        });
  }
}
