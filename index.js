const firestore = firebase.firestore()

firestore
.collection("cities")
.get()
.then((collectionSnapshot) => {
  collectionSnapshot.forEach(doc => {
    document.write(doc.data().name + " \n")
  })
})
.catch(err => {
  console.log(err.message);
})