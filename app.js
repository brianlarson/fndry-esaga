{
  init: function(elevators, floors) {

    // use first and only elevator
    const elevator = elevators[0];

    // set up listeners for elevator calls on all floors
    for (let i = 0; i < floors.length; i++) {
      floors[i].on("up_button_pressed", function () {
        if (!elevator.destinationQueue.includes(i)) {
          elevator.destinationQueue.push(i);
        }
      });
      floors[i].on("down_button_pressed", function () {
        if (!elevator.destinationQueue.includes(i)) {
          elevator.destinationQueue.push(i);
        }
      });
    }

    // when a passenger pushes a floor button ...
    elevator.on("floor_button_pressed", function(floorNum) {
      elevator.goToFloor(floorNum);
    });

    // when passing a floor ...
    elevator.on("passing_floor", function(floorNum, direction) {
    });

    // when elevator is stopped at a floor ...
    elevator.on("stopped_at_floor", function(floorNum) {
    });

    // when elevator is idle ...
    elevator.on("idle", function () {
      elevator.goToFloor(0);
    });

  },
  update: function(dt, elevators, floors) {
    console.log(`destinationQueue: ${elevators[0].destinationQueue}`);
  }
}