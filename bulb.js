// encapsulation
class Bulb {
  name;
  state;

  constructor(state, name) {
    (this.state = state), (this.name = name);
  }

  displayBulbState() {
    if (this.state === true) {
      console.log(`The bulb name is ${this.name} and it's On`);
    } else {
      console.log(`The bulb name is ${this.name} and it's Off`);
    }
  }

  attachBulb() {
    console.log("The bulb has been attached");
  }

  toggleBulbState() {
    this.state = !this.state;
  }
}

const phillips_bulb = new Bulb(false, "Phillips");
phillips_bulb.displayBulbState();
phillips_bulb.attachBulb();
phillips_bulb.toggleBulbState();
phillips_bulb.displayBulbState();
phillips_bulb.toggleBulbState();
phillips_bulb.displayBulbState();
