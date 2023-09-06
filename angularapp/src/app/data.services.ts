import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoTask } from 'src/app/todotask'
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable()
export class DataService {

  private url = "/api/todotask";

  constructor(private http: HttpClient) {
  }

  getAllTasks(): Observable<TodoTask[]> {
    return this.http.get<TodoTask[]>(this.url);
  }

  getTask(id: Guid): Observable<TodoTask> {
    return this.http.get<TodoTask>(this.url + '/' + id);
  }

  createTask(task: TodoTask) {
    return this.http.post(this.url, task);
  }
  updateTask(task: TodoTask) {

    return this.http.put(this.url, task);
  }
  deleteTask(id: Guid) {
    return this.http.delete(this.url + '/' + id);
  }
}
