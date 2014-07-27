Meteor.methods({
    saveFile : function(blob, name, encoding) {
        var name = cleanName(name || 'file'),
            encoding = encoding || 'binary',
            chroot = process.env.PWD + '/.uploads/affiches/';
        // Clean up the path. Remove any initial and final '/' -we prefix them-,
        // any sort of attempt to go to the parent directory '..' and any empty directories in
        // between '/////' - which may happen after removing '..'

        // TODO Add file existance checks, etc...
        fs.writeFile(chroot + name, blob, encoding, function(err) {
            if (err) {
                console.log(err);
                throw (new Meteor.Error(500, 'Failed to save file.', err));
            } else {
                console.log('The file ' + name + ' (' + encoding + ') was saved to ' + chroot);
            }
        });

        function cleanName(str) {
            return str.replace(/\.\./g, '').replace(/\//g, '');
        }

    }
});
