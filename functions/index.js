var functions = require('firebase-functions');
const admin = require('firebase-admin');


const cors = require('cors')({origin :true });

admin.initializeApp(functions.config().firebase);

//variables for log register [Start]
const refLog = admin.database().ref('Log');
//variables for log register [End]


const newItem = {
  "Categories" : [],
  "EN" : {
    "AddIcons" : [],
    "Banner" : "",
    "DisplayName:" : "",
    "Gallery" : [],
    "GeneralDescrip" : "",
    "HomeBanner" : {
      "Descript" : "",
      "ImgBanner" : "",
      "Subtitle" : "",
      "Title" : ""
    },
    "Included" : [],
    "MetaDesc" : "",
    "Recomendation" : "",
    "Schedules" : [],
    "SocialMediaDescrip" : "",
    "URL" : ""
  },
  "ES" : {
  	"AddIcons" : [],
    "Banner" : "",
    "DisplayName:" : "",
    "Gallery" : [],
    "GeneralDescrip" : "",
    "HomeBanner" : {
      "Descript" : "",
      "ImgBanner" : "",
      "Subtitle" : "",
      "Title" : ""
    },
    "Included" : [],
    "MetaDesc" : "",
    "Recomendation" : "",
    "Schedules" : [],
    "SocialMediaDescrip" : "",
    "URL" : ""
  }
};

const newItemCategories = {
  DisplayName : "",
  url: ""
}


exports.addNewMessage = functions.https.onRequest((req, res) => {
  var original = String(req.query.text);
  original = original.toLowerCase();
  var ref = admin.database().ref('TVMORE');

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
});

exports.UpdateItem = functions.https.onRequest((req, res) => {
  let ref = admin.database().ref('Items');
  let item;

  cors(req, res, () => {
    if (req.method == "POST") {
      item = req.body;

      ref.once('value').then(function(snapshot) {
        let agregado = false;
        snapshot.forEach(function(childSnapshot) {
          let itemCode = childSnapshot.val().itemCode;
          if(item.itemCode.trim() == itemCode){
            let refItem = admin.database().ref('Items/'+childSnapshot.key);
            item.itemCode = item.itemCode.trim();
            refItem.update(item);
            agregado = true;
          }
        });
        if(!agregado){
          item.itemCode = item.itemCode.trim();
          ref.push(item);
          res.jsonp({code : 1, desc :  "Item added"});
          refLog.push({ time :  ""+ new Date() ,log  : "Try - Success : Items Added/updated on UpdateItem function, path : " + req.path + " from : " + req.ip});
        }else{
          res.jsonp({code : 0, desc : "Item Updated"});
          refLog.push({ time :  ""+ new Date() ,log  : "Try - Success : Item Added/updated on UpdateItem function, path : " + req.path + " from : " + req.ip});

        }
      });

    }else{
      res.jsonp({code : 0, desc : "you need to send a jsossn object trought POST method"});
      refLog.push({ time :  ""+ new Date() ,log  : "Try - Failed : Item sent by Get Method on UpdateItem function" + req.path + " from : " + req.ip});
    }

  });
});
exports.addListItems = functions.https.onRequest((req, res) => {
  let ref = admin.database().ref('Items');
  var respLog = "";
  cors(req, res, () => {
    let variables;
    if (req.method == "POST") {
      variables = req.body;
      let contNews = 0;
      let contUpda = 0;
      //let newItems = [];
      ref.once('value').then(function(snapshot) {
        variables.map((item)=>{
          let agregado = false;
          snapshot.forEach(function(childSnapshot) {
              let itemCode = childSnapshot.child("GENESIS").val().itemCode;
              //itemCode = itemCode.trim();
              let refItem = admin.database().ref('Items/'+childSnapshot.key+"/GENESIS");
                //newItems.push(itemCode);
                if(item.itemCode.trim() == itemCode){
                  item.itemCode = item.itemCode.trim();
                  let itemNuevo = Object.assign({ GENESIS : item},newItemCategories);
                  refItem.update(item);
                  contUpda++;
                  agregado = true;
                }
          });
          if(!agregado){
            item.itemCode = item.itemCode.trim();
            let itemNuevo = Object.assign({ GENESIS : item}, newItem);
            ref.push(itemNuevo);
            contNews++;
          }
        });
        refLog.push({ time :  ""+ new Date() ,log  : "Try - Success : Items Added/updated on addListItems function, path : " + req.path + " from : " + req.ip});
        res.jsonp({code : 1, desc : contNews + " Nuevos items agregados, " + contUpda +" items actualizados"});
      });
    }else{
      variables = req.query;
      res.jsonp({code : 0, desc : " you need to send a jsossn object"});
      refLog.push({ time :  ""+ new Date() ,log  : "Try - Failed : Items sent by Get Method on addListItems function" + req.path + " from : " + req.ip});
    }
    respLog = "";
  });
});

exports.updateCategoriesItem =functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method == "POST"){
      //res.jsonp({value : "funciono"})

    }else{
      res.send("Entro");
    }

  });
});

exports.updateHomeContentItem =functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method == "POST"){
      res.jsonp({value : "funciono"})

    }else{
      res.send("Entro");
    }

  });
});
exports.deleteHomeContentItem =functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method == "POST"){
      res.jsonp({value : "funciono"})

    }else{
      res.send("Entro");
    }

  });
});



exports.deleteCategoriesItem =functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method == "POST"){
      //res.jsonp({value : "funciono"})

    }else{
      res.send("Entro");
    }

  });
});
exports.updateCategoriesList =functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method == "POST"){
      //res.jsonp({value : "funciono"})

    }else{
      res.send("Entro");
    }

  });
});

exports.generateThumbnail = functions.storage.bucket('thomasmore-44171.appspot.com').object().onChange(event => {
  //let ref = admin.database().ref('/images');
  //let ref = admin.database().ref('Items');
  const object = event.data;
  if(object.resourceState == "exists"){
    if(object.metadata.itemCode){
      let refItem = admin.database().ref('Items/'+object.metadata.itemCode);
      let item = {};
      item[object.metadata.key] ={ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name , data : object};
      refItem.once('value').then(function(snapshot) {
        if(object.metadata.itemCode){
          if(object.metadata.array){
            let refItemImagesGall = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key);
            if(snapshot.hasChild("images")){
              //let refItemImagesGall = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key);
              // if(snapshot.child("images").hasChild(object.metadata.key)){
              //   refItemImagesGall.child(object.metadata.key+"-"+object.metadata.array).set({ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name });
              // }else{
              //   //let refItemImages = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key);
              //   // item[object.metadata.key] = [{ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name }];
              //   // refItemImagesGall.update(item);
              //   refItemImagesGall.child(object.metadata.key+"-"+object.metadata.array).set({ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name });
              // }

              refItemImagesGall.child(object.metadata.key+"-"+object.metadata.array).set({ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name, data : object});
            }else{
              //let refItemImagesGall = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key);
              refItemImagesGall.child(object.metadata.key+"-"+object.metadata.array).set({ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name, data : object });
              //item[object.metadata.key] = [{ url :'https://firebasestorage.googleapis.com/v0/b/thomasmore-44171.appspot.com/o/'+encodeURIComponent(object.name)+'?alt=media&token='+object.metadata.firebaseStorageDownloadTokens, ref : object.name }];
              //refItem.update({"images":item});
            }
          }else{
            if(snapshot.hasChild("images")){
              let refItemImages = admin.database().ref('Items/'+object.metadata.itemCode+'/images');
              refItemImages.update(item);
            }else{
              refItem.update({"images":item});
            }
          }
        }
      });
    }

  }else{
    if(object.metadata.itemCode){
      if(object.metadata.array){
        let refItemImagesGall = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key+"/"+object.metadata.key+"-"+object.metadata.array);
        refItemImagesGall.remove()
      }else{
        let refItemImages = admin.database().ref('Items/'+object.metadata.itemCode+'/images/'+object.metadata.key);
        refItemImages.remove();
      }
    }
  }
});
