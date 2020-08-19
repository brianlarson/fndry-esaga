{
  init: function(elevators, floors) {
    // use first and only elevator
    const elevator = elevators[0];
    // when elevator is idle ...
    elevator.on("idle", function () {
      // loop through floors picking up cute little bathroom sign folx willy nilly
      for (let i = 0; i < floors.length; i++) {
        elevator.goToFloor(i);
      }
    });
  },
  update: function(dt, elevators, floors) {
  }
}