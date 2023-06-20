const firestore_db = firebase.firestore()

// reading data
firestore_db
.collection('cities')
.get()
.then((citiesSnapshot) => {
  citiesSnapshot.docs.forEach(doc => {
    console.log(doc.data());
  })
})
.catch(err => {
  console.log(err.message)
})

// adding
firestore_db
.collection('cities')
.add({
  name: "Kismayo",
  population: 6000000
})
.then((citiesSnapshot) => {
  console.log("New city added successfully");
})
.catch(err => {
  console.log(err.message);
})

// update
firestore_db
.collection('cities')
.doc("Hqthyp2Cxfa9OvZqxz8H")
.set({
  population: 10000000
}, {merge: true})
.then(() => {
  console.log("Document update successful");
})
.catch(err => {
  console.log(err.message);
})

//delete
firestore_db.collection('cities')
.doc("3Wmc5MNDFNUnfgdiaZXK")
.delete()
.then(() => {
  console.log('Document deleted successfully');
})
.catch(err => {
  console.log(err.message);
})

// querying
firestore_db.collection('cities')
.where("population", "==", 10000000)
.get()
.then((collectionSnapshot) => {
  console.log(collectionSnapshot.docs);
})
.catch(err => {
  console.log(err.message);
})