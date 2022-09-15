const fruits = [
  {
    id: 0,
    name: "Avocado",
    count: 230,
    category: "Tropical",
  },
  {
    id: 1,
    name: "Apple",
    count: 403,
    category: "Tropical",
  },
  {
    id: 2,
    name: "Kiwi",
    count: 1243,
    category: "Tropical",
  },
];

console.log(`No of fruits: ${fruits.length}`);
for (let i = 0; i < fruits.length; i++) {
  console.log(`Name: ${fruits[i].name}, count: ${fruits[i].count}`);
}
