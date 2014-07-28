// creates all the functions that can be called with Meteor.call on the client
Meteor.methods({
    saveFile : function(blob, name, path) {
        var name = cleanName(name || 'file');
        var path = path || 'affiches'
        var chroot = process.env.PWD + '/.uploads/'+ path +'/';
        // Clean up the path. Remove any initial and final '/' -we prefix them-,
        // any sort of attempt to go to the parent directory '..' and any empty directories in
        // between '/////' - which may happen after removing '..'

        // TODO Add file existance checks, etc...
        fs.writeFile(chroot + name, blob, 'binary', function(err) {
            if (err) {
                console.log(err);
                throw (new Meteor.Error(500, 'Failed to save file.', err));
            } else {
                console.log('The file ' + name + ' (binary) was saved to ' + chroot);
            }
        });

        function cleanName(str) {
            return str.replace(/\.\./g, '').replace(/\//g, '');
        }

    }
});
