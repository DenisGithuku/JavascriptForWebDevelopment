class Person {
  //properties (variables)
  name;
  id;

  constructor(person_name, person_id) {
    //this means this class (Person)
    this.name = person_name;
    this.id = person_id;
  }

  //methods (functions)
  displayInfo() {
    console.log(this.name, this.id);
  }

  changeName(newName) {
    this.name = newName;
  }
}

const alice = new Person("Alice", 9);
const peter = new Person("Peter", 5);
const bob = new Person("Bob", 3);
const ahmed = new Person("Ahmed", 7);

bob.displayInfo();
bob.changeName("Bobby");
bob.displayInfo();
