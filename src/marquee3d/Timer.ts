import { Clock } from "three";

export default class Timer {
  clock = new Clock();
  prevTime = 0;

  getDeltaTime():number{
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.prevTime;
    this.prevTime = elapsedTime;
    return deltaTime;
  }
}