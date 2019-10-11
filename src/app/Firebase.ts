export const firebaseconfig = {
      
 
    apiKey: "AIzaSyBZUBpjustp8KCkwxi9tLNIEHWQr3QQw1Y",
    authDomain: "hotelapp1-2b442.firebaseapp.com",
    databaseURL: "https://hotelapp1-2b442.firebaseio.com",
    projectId: "hotelapp1-2b442",
    storageBucket: "gs://hotelapp1-2b442.appspot.com/",
    messagingSenderId: "390492353579",
    appId: "1:390492353579:web:cbcab3793f6ceab0"
  }
 

  export const snapShots = snap => {
      let myArray = [];
      snap.forEach(Element => {
        let item = Element.val();
        item.key = Element.key;
        myArray.push(item);
      });
      return myArray;
  }
