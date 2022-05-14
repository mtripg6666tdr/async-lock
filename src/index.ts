import { LockObj } from "./lockobj";

export { LockObj };
export async function lock<T>(locker:LockObj, fn:()=>T){
  if(!(locker instanceof LockObj)) throw new Error("invalid locker was provided")
  if(locker["hasLocked"]) await locker["mutexProbe"]();
  locker["hasLocked"] = true;
  const result = await fn();
  locker["hasLocked"] = false;
  locker["finishHanders"].shift()?.();
  return result;
}