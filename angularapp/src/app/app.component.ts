import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Guid } from 'guid-typescript';
import { Subject, filter, takeUntil } from 'rxjs';
import { DataService } from 'src/app/data.services';
import { TodoTask } from 'src/app/todotask'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'angularapp';
  public task: TodoTask | undefined;
  public allTasks: TodoTask[] = [];
  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    private authService: MsalService,
    private dataService: DataService,
    http: HttpClient)
  {
  }
    
  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe
      (filter((interactionStatus: InteractionStatus) =>
        interactionStatus == InteractionStatus.None),
        takeUntil(this._destroy)).subscribe(x => { this.isUserLoggedIn = this.authService.instance.getAllAccounts().length>0 })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
    }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({ postLogoutRedirectUri:'http://localhos:4200'});
  }

  loadTasks() {
    this.dataService.getAllTasks().subscribe((data: TodoTask[]) => this.allTasks = data);
  }

  onSubmit(f: NgForm) {
    let todo = new TodoTask(Guid.create(), f.value.title, false);
    this.dataService.createTask(todo);
    this.allTasks.push(todo);
    f.resetForm();
  }

  onComplete(id: Guid) {
    let todo = this.allTasks.filter(x => x.id == id)[0];
    todo.completed = true;
    this.dataService.updateTask(todo);
  }

  onDelete(id: Guid) {
    let todo = this.allTasks.filter(x => x.id === id)[0];
    let index = this.allTasks.indexOf(todo, 0);
    if (index > -1) {
      this.allTasks.splice(index, 1);
    }
    this.dataService.deleteTask(id);
  }

}

