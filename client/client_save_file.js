/**
 * @blob (https://developer.mozilla.org/en-US/docs/DOM/Blob)
 * @name the file's name
 * @type the file's type: binary, text (https://developer.mozilla.org/en-US/docs/DOM/FileReader#Methods)
 *
 * TODO Support other encodings: https://developer.mozilla.org/en-US/docs/DOM/FileReader#Methods
 * ArrayBuffer / DataURL (base64)
 */
Meteor.saveFile = function(blob, name, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function(file) {
        Meteor.call('saveFile', file.srcElement.result, name, 'binary', callback);
    };
    fileReader.readAsBinaryString(blob);
};
