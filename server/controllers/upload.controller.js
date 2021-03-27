const fs = require('fs')

exports.getImage = async (req, res, next) => {
    const filename = req.params.filename

    try {
        fs.readFile('uploads/images/' + filename, function(err, data) {
            if(err) {
                res.send("Oops! Couldn't find that file.");
            } else {
                res.contentType(filename);
                res.send(data);
            }
            res.end();
        });
    } catch (error) {
        next(error)
    }
}