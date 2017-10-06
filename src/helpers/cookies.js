
exports.eraseCookieFromAllPaths= ()=>{
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

exports.setCookie = function(objeto) {

  if (typeof window.localStorage !== 'undefined') {
      // SETUP SESSION, AUHT, LOCALE, SETTINGS ETC
      //console.log(objeto);
      if(typeof objeto === "object"){
        for(var j in objeto){
          //console.log(j);
          //console.log(objeto[j]);


              var sub_key = j;
              var sub_val = objeto[j];
               if(typeof objeto[j] === 'string'){
                 console.log(j);
                 console.log(JSON.parse(window.atob(objeto[j])));
                 //console.log(JSON.parse(window.atob(objeto[j])));
                 document.cookie = j + "=" + objeto[j] +";";
               }
               console.log(document.cookie);
          }
          //console.log(document.cookie);
      }
  } else {
      // PROVIDE FEEDBACK TO THE USER
      console.log('no compatible');
  }
}
exports.setDataToEncode = function(obj) {
  let items = [];
  let localItems=[];


  if(localStorage.getItem('itemsTrans')){
    localItems =JSON.parse(window.atob(localStorage.getItem('itemsTrans')));
    localItems.push(obj);
  }else{
    localItems=[obj];
  }
  // let cookies = this.getCookie();
  // if(cookies.itemsTrans){
  //   items = JSON.parse(window.atob(cookies.itemsTrans));
  //   items.push(obj);
  // }else{
  //   items=[obj];
  // }

  localStorage.setItem('itemsTrans' , window.btoa(JSON.stringify(localItems)));
  //this.setCookie({itemsTrans : window.btoa(JSON.stringify(items)) });
}

exports.getCookie = function() {
var objJson = {};
  if (typeof window.localStorage !== 'undefined') {
      var ca = document.cookie.split(';');



      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          var obj = ca[i].split('=');


          if(obj[0]!='' && obj[1]!='') {
            var key = obj[0].trim();
            var value = obj[1].trim();
          }else{
            var key = obj[0];
            var value = obj[1];
          }

          objJson[key] = value;
      }
      return objJson;

    } else {
        // PROVIDE FEEDBACK TO THE USER
        console.log('no compatible');
        return objJson;
    }

}
