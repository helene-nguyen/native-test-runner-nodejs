//~import modules
import { describe, it, beforeEach } from 'node:test';
import { deepStrictEqual, CallTracker, snapshot } from 'node:assert';
import Database from './database.js';

const tracker = new CallTracker();

//~First launched
describe('First launched', () => { 

  //~test if it's working properly
  it.todo('some test I wanna do in the feature');
  it.skip('some test I wanna skip');
})

//~tests
describe('Using native test runner suite', () => {
  let db;

  //before each test, reset the instance of db
  beforeEach(() => {
    db = new Database();
  });

  
  //~using our database
  //   it.todo('it should save data on db test have to be ko', async () => {
  //     //use the db instance and add data
  //     await db.create({ username: 'yumicode', hobby: 'coding' });

  //     //use read() method from db
  //     const data = await db.read();
  //     //test if it's strictly equal
  //     deepStrictEqual(data, { username: 'yumicode'});
  //   }); //! ERROR ! TESTS FAILS

  it.todo('it should save data on db test have to be ok', async () => {
    //use the db instance and add data
    await db.create({ username: 'yumicode', hobby: 'coding' });

    //use read() method from db
    const data = await db.read();
    //test if it's strictly equal
    deepStrictEqual(data, [{ username: 'yumicode', hobby: 'coding' }]);
  }); //! GOOD TEST

  //& Track our function => CallTracker from node:assert
  it('tracking calls', async () => {
    const spy = tracker.calls();

    // replace our function from db
    // here, everytime we will add something, we will call our spy function

    db.database = {
      add: spy,
    };

    //one method to call data
    const data = [{ username: 'yumicode', hobby: 'coding' }];
    await db.create([...data]);

    // another method to do it
    // const data = { username: 'yumicode', id: 4 };
    // await db.create(data);
    // use stringify to see what we need for our tracker function
    console.log(JSON.stringify(tracker.getCalls(spy)));

    //construct the object now with our tracker
    const [
      {
        thisArg: { add },
        arguments: fnArgs,
      },
    ] = tracker.getCalls(spy);

    //do the assert
    deepStrictEqual(add, db.database.add);
    //can check if our arguments is and array of our data
    deepStrictEqual(fnArgs, [data]);

    // reset the tracker
    tracker.reset();
    deepStrictEqual(tracker.getCalls(spy).length, 0);

    //* deepStrictEqual(WHAT WE HAVE, WHAT WE EXPECT)
  });

  //& Snapshot from node:assert
  it('snapshot', async () => {
    await db.create({ name: 'Fredo' }); //! if we modify this value, it will not equal to the snapshot anymore

    //Result
    const result = await db.read();

    //Will create a snapshot of what we read (new file)
    await snapshot(result, 'dbData');
    //Will create a snapshot formatted
    await snapshot(JSON.stringify(result), 'dbDataFormatted');
  });
});
