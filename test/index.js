const { lock, LockObj } = require("../dist/index");
const wait = (time) => new Promise(resolve => setTimeout(resolve, time));

const loop = (time, fn) => {
  for(let i = 0; i < time; i++) fn();
};

let num = 0;

const delayIncrement = async () => {
  const numcpy = num;
  await wait(1);
  num = numcpy + 1;
};

const locker = new LockObj();
const delayIncrementMutexed = async () => {
  await lock(locker, async() => {
    const numcpy = num;
    await wait(1);
    num = numcpy + 1;
  })
}

(async () => {
  console.log("Normal:");
  loop(100, delayIncrement);
  await wait(1);
  loop(100, delayIncrement);
  await wait(3000);
  console.log("num is", num, "that was expected to be", 200);
  console.log();
  num = 0;
  console.log("Mutexed:");
  loop(100, delayIncrementMutexed);
  await wait(1);
  loop(100, delayIncrementMutexed);
  await wait(3000);
  console.log("num is", num, "that was expected to be", 200);
  if(num !== 200) process.exit(1);
})();