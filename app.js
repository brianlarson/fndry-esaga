{
  init: function(elevators, floors) {

    // use first and only elevator
    const elevator = elevators[0];

    // let's track when there are passengers waiting on each floor
    for (let i = 0; i < floors.length; i++) {
      floors[i]["waiting"] = false;
      floors[i].on("up_button_pressed", function () {
        floors[i]["waiting"] = true;
      });
      floors[i].on("down_button_pressed", function () {
        floors[i]["waiting"] = true;
      });
    }

    // when a passenger pushes a floor button ...
    elevator.on("floor_button_pressed", function(floorNum) {
      elevator.goToFloor(floorNum);
    });

    // when passing a floor ...
    elevator.on("passing_floor", function(floorNum, direction) {
      if (floors[floorNum]["waiting"] == true) {
        elevator.goToFloor(floorNum, true);
      }
    });

    // when elevator is stopped at a floor ...
    elevator.on("stopped_at_floor", function(floorNum) {
      // clear passengers waiting on this floor
      floors[floorNum]["waiting"] = false;
    });

    // when elevator is idle ...
    elevator.on("idle", function () {
      elevator.goToFloor(0);
    });

    // function for updating up/down indicators
    function updateIndicators(direction = elevator.destinationDirection()) {
      switch (direction) {
        case "up":
          elevator.goingUpIndicator(true);
          elevator.goingDownIndicator(false);
          break;
        case "down":
          elevator.goingUpIndicator(false);
          elevator.goingDownIndicator(true);
          break;
        default:
          elevator.goingUpIndicator(true);
          elevator.goingDownIndicator(true);
          break;
      }
    }

  },
  update: function(dt, elevators, floors) {
    // silence is golden
  }
}