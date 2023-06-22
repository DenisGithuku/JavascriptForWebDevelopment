const numbers = [5, 2, 6, 4, 3, 7]
 
// 1.map - transform based on a function
const squares = numbers.map(number => { return number * number})


// 2. filter - select based on criteria
const greaterThan5 = numbers.filter(number => { return number > 5 })


// 3. sort - arrange in order
const sorted = numbers.sort()

// 4. finding a number
const num = numbers.find(number => { return number >= 4 })

// 5. checking if value is in array
const numberInList = numbers.includes(15)


// 6. remove the last element
const removed = numbers.pop()
console.log(removed);

// 7. push
numbers.push(15)
console.log(numbers);

const firstNames = ['Ali', 'Said', 'Ahmed']
const lastNames = ['Mohamed', 'Anab', 'Deeq']

const firstLetters = firstNames.map(firstName => { return firstName[0] })
console.log(firstLetters);

// flatmap -combine 2 lists together
const lastnameList = lastNames.flatMap(lastName => { return lastName.split('') })
console.log(lastnameList);


