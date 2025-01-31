{
  init: function(elevators, floors) {

    for (let i = 0; i < elevators.length; i++) {

      // set elevator
      const elevator = elevators[i];

      // give each elevator an id
      elevators[i]["id"] = i + 1;
      
      // give each elevator an active status
      elevators[i]["active"] = false;

      // let's track when there are passengers waiting on each floor
      for (let i = 0; i < floors.length; i++) {
        floors[i]["waiting"] = false;
        floors[i].on("up_button_pressed", function() {
          floors[i]["waiting"] = true;
          if (elevator.getPressedFloors().includes(i)) {
            elevator.goToFloor(i, true);
          } else {
            elevator.goToFloor(i);
          }
        });
        floors[i].on("down_button_pressed", function() {
          floors[i]["waiting"] = true;
          if (elevator.getPressedFloors().includes(i)) {
            elevator.goToFloor(i, true);
          } else {
            elevator.goToFloor(i);
          }
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
      elevator.on("idle", function() {
        elevator.goToFloor(0);
      });

    }

  },
  update: function(dt, elevators, floors) {
    // silence is golden
  }
}