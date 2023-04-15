const { Food } = require("./food");
const { Item } = require("./item");

class Player extends Item {
  constructor(name, startingRoom) {
    super(name);
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    for (let item of this.currentRoom.items) {
      if (item.name === itemName) {
        this.items.push(
          this.currentRoom.items.pop(item)
        );
        console.log(itemName + ' picked');
        return;
      } else {
        console.log(itemName + ' not found');
      }
    }
  }

  dropItem(itemName) {
    for (let item of this.items) {
      if (item.name == itemName) {
        this.currentRoom.items.push(
          this.items.pop(item)
        );

        console.log("droped");
      }
    }
  }

  eatItem(itemName) {
    if (!this.items.length) {
      console.log("You have no items");
      return;
    }

    for (let item of this.items) {
      if (item.name == itemName) {
        if (item instanceof Food) {
          this.items.pop(item);
          console.log("You've eaten " + item.description);
        } else {
          console.log("You can't eat " + itemName);
        }
      }
    }
  }

  getItemByName(itemName) {
    for (let item of this.items) {
      if (item.name == itemName) {
        return item;
      }
    }
    console.log(itemName + "can not be found in your pack");
  }
}

module.exports = {
  Player,
};
