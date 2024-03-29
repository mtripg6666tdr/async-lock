import { LockObj } from "./lockobj";

export { LockObj };
export async function lock<T>(locker:LockObj, fn:()=>T|Promise<T>){
  if(!(locker instanceof LockObj)) throw new Error("invalid locker was provided")
  if(locker["hasLocked"]) await locker["mutexProbe"]();
  locker["hasLocked"] = true;
  try{
    return await fn();
  }
  finally{
    locker["hasLocked"] = false;
    locker["finishHanders"].shift()?.();
  }
}