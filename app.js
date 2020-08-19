{
  init: function(elevators, floors) {

    // use first and only elevator
    const elevator = elevators[0];

    // when a passenger pushes a floor button ...
    elevator.on("floor_button_pressed", function(floorNum) {
      // go to that floor
      elevator.goToFloor(floorNum);
    });

    // when elevator is idle ...
    elevator.on("idle", function () {
      // go back to floor 0 where most people may be making requests
      elevator.goToFloor(0);
    });

  },
  update: function(dt, elevators, floors) {
  }
}