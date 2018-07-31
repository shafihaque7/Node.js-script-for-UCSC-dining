const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();
const theCollection = 'allitems'

 var citiesRef = db.collection(theCollection);
 var allCities = citiesRef.get()
     .then(snapshot => {
       snapshot.forEach(doc => {
         console.log(doc.id, '=>', doc.data());
         db.collection(theCollection).doc(doc.id).delete();

       });
     })
     .catch(err => {
       console.log('Error getting documents', err);
     });
const request = require('request');
const cheerio = require('cheerio');
const dateFormat = require('dateformat');

const getRoutes = (currentDiningHall) => {

   return new Promise ((resolve, reject) => {
   
   request(currentDiningHall.link, function (error, response, html) {
      var order = 0
      if (!error && response.statusCode == 200) {         
         var $ = cheerio.load(html);

         $('table[height="100%"]').each(function(i, element){
            var a = $(this).html()
            $ = cheerio.load(a)

            var typeMeal = ""
            $('.menusampmeals').each(function(i, element){
               var b = $(this)
               // console.log(b.text())
               typeMeal = b.text()

            })

            $('.menusamprecipes').each(function(i, element){
               var c = $(this)
               // console.log(c.text())
               var thefood = c.text()
               

               var day=dateFormat(new Date(), "yyyy-mm-dd");
               // console.log(day)

               var data = {
                  date: day,
                  dininghallname: currentDiningHall.name,
                  food: thefood,
                  timeofmeal: typeMeal,
                  order: order


               }
               order++;
               // console.log(currentDiningHall)
               console.log(data)
               db.collection('allitems').doc().set(data)
               

            })
        
         })

         // return callback(null, error);
        
         
      }
      
      }
      );
      
         resolve(true)
     
}
   )}

async function doSomething()  {
   var finishedUrls=[
      {name:'Colleges Nine & Ten', link:'http://nutrition.sa.ucsc.edu/menuSamp.asp?locationNum=40&locationName=Colleges+Nine+%26+Ten+Dining+Hall&sName=&naFlag='},
      {name:'Cowell/Stevenson', link:'http://nutrition.sa.ucsc.edu/menuSamp.asp?locationNum=05&locationName=Cowell+Stevenson+Dining+Hall&sName=&naFlag='},
      {name:'Crown/Merrill', link:'http://nutrition.sa.ucsc.edu/menuSamp.asp?locationNum=20&locationName=Crown+Merrill+Dining+Hall&sName=&naFlag='},
      {name:'Porter/Kresge', link:'http://nutrition.sa.ucsc.edu/menuSamp.asp?locationNum=25&locationName=Porter+Kresge+Dining+Hall&sName=&naFlag='},
      {name:'Rachel Carson/Oakes', link:'http://nutrition.sa.ucsc.edu/menuSamp.asp?locationNum=30&locationName=Rachel+Carson+Oakes+Dining+Hall&sName=&naFlag='}
   ]
   
   for (var i = 0; i < finishedUrls.length; i++){
      await getRoutes(finishedUrls[i])
   }
}
doSomething()


