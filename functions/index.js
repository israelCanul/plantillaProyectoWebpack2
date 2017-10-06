var functions = require('firebase-functions');
var mifuncion = require('./otrafuncion');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// // converts the "text" key of messages pushed to /messages to uppercase
// exports.upperCaser = functions.database().path('/messages/{id}').on('write', function(event) {
//   // prevent infinite loops
//   if (event.data.child('uppercased').val()) { return; }
//
//   return event.data.ref.update({
//     text: event.data.child('text').val().toUpperCase(),
//     uppercased: true
//   });
// });


exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text

  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original + mifuncion.mifuncion()}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

exports.addNewMessage = functions.https.onRequest((req, res) => {
  var original = String(req.query.text);
  original = original.toLowerCase();
  var ref = admin.database().ref('TVMORE');


  admin.database().ref('/messages').push({original: "Text passed : "+original }).then(snapshot => {

  });

  ref.once('value').then(function(snapshot) {
      var data = {resultCount : 0,results : []};
      var count = 0;
      snapshot.forEach(function(childSnapshot) {
          var title = String(childSnapshot.val().title);
          title = title.toLowerCase();
          //var category = childSnapshot.category.val();
          var guardar = false; // flag para guardar el item en la lista de resultados

          if(title.search(original) != -1 ){
              guardar = true;
          }
          childSnapshot.child("category").forEach(function(childSnapshot2) {
            var valor = String(childSnapshot2.val().val);
            valor = valor.toLowerCase();
            //data.results.push({item : childSnapshot2.val().val});
             if(valor.search(original) != -1 ){
                 guardar = true;
              }
          });


          if(guardar){
            data.results.push(childSnapshot.val());
            count ++;
          }
      });
      data.resultCount = count;
      //data.push({searchText:original , length : count});
      res.jsonp(data);
  });

  // admin.database().ref('/TVMORE').orderByChild('title')
  //               .startAt(original)
  //               .endAt(original)
  //               .equalTo(original)
  //               .then(snapshot => {
  //   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  //   res.jsonp({
  //     value : "mio"
  //   });
  //
  // });



});
