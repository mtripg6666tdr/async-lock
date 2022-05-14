# async-lock
Promise based simple mutex for JS: preventing from running same code block at the same time.  

## API
- LockObj (class)  
  used to store mutex statuses.
- lock (function)  
  used to lock statement, just like C# `lock{}`.

# Usage
```js
const { lock, LockObj } = require("@mtripg6666tdr/async-lock");

const locker = new LockObj();
const someFunction = async () => {
  return await lock(locker, () => {
    // do some stuff.
  });
};
```

## Example
Please see [test file](test/index.js).

## License
[MIT](LICENSE)
