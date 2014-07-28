
// @blob is the file (https://developer.mozilla.org/en-US/docs/DOM/Blob)
// @name is the file's name
// @callback is the function to execute when upload is successfull

// For now this function always presupposes a binary file (i.e. an image, as opposed to a text file)

Meteor.saveFile = function(blob, name, path, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function(file) {
        // Meteor.call allows the client (local) to request for the server to exectute a function 
        // the function saveFile is defined in server/methods.js
        // the last argument of a Meteor.call (here “callback”), if it is a function, is considered as
        // a callabck function: it is not used by the function on the server, but on the client side.
        // When the server function (ex: “saveFile”) has run successfully, 
        // the client will run this callback function 
        // (this function here is defined in client/template.js)
        Meteor.call('saveFile', file.srcElement.result, name, path, callback);
    };
    fileReader.readAsBinaryString(blob);
};
