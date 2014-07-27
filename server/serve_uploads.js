// thanks! http://stackoverflow.com/questions/13201723/generating-and-serving-static-files-with-meteor

WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/affiches\/(.*)$/.exec(req.url);
    if (re !== null) {   // Only handle URLs that start with /uploads/*
        var filePath = process.env.PWD + '/.uploads/affiches/' + re[1];
        var data = fs.readFileSync(filePath, data);
        res.writeHead(200, {
                'Content-Type': 'image'
            });
        res.write(data);
        res.end();
    } else {  // Other urls will have default behaviors
        next();
    }
});
