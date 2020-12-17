import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from '../notification-model';

@Injectable({
  providedIn: 'root',
})
export class PostNotificationService {
  baseURL: string = 'https://localhost:44313/Values/notification';

  constructor(private http: HttpClient) {}

  public postNotificationMessage(
    notificationForm: NotificationModel
  ): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(this.baseURL, notificationForm);
  }

  getNotificationMessage(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.baseURL);
  }
}
