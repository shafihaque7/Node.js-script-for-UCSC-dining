const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

 const data = {
    name: "Stevenson",
    food: "Hoogggggffla"
 }

 db.collection('users').doc().set(data).then(() => {
    console.log('new thing was added')
 })

var cityRef = db.collection('users').doc('food');
var getDoc = cityRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });


// var citiesRef = db.collection('users');
// var allCities = citiesRef.get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//         db.collection('users').doc(doc.id).delete();

//       });
//     })
//     .catch(err => {
//       console.log('Error getting documents', err);
//     });

// // console.log(allCities)

// var request = require('request');
// var cheerio = require('cheerio');


// request('https://dining.ucsc.edu/eat/', function (error, response, html) {
// if (!error && response.statusCode == 200) {
//    var arr = []
//       var $ = cheerio.load(html);
//       $('.btn-info').each(function(i, element){
//          var a = $(this)
//          var item = a.attr('href')
//          // console.log(item)
//          arr.push(item)

//          const data = {
//             name: "Dining hall urls",
//             food: item
//          }

//       // db.collection('users').doc().set(data)
      
      
//       })
//       console.log(arr)
// }
// });
