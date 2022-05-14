export class LockObj {
  private finishHanders: (()=>void)[] = [];
  private hasLocked = false;
  private mutexProbe(){
    return new Promise<void>(resolve => this.finishHanders.push(resolve));
  }
}