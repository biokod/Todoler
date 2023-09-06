import { Guid } from "guid-typescript";

export class TodoTask {
  constructor(
    public id: Guid,
    public title: string,
    public completed: boolean
  ) { }
}
