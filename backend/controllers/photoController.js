var photoModel = require('../models/photoModel.js');
var decay = require('decay');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        photoModel.find({flagCount: {$lte: 5}}).sort('-date').exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            var data = [];
            data.photos = photos;
            return res.json(photos);
        });
    },

    decay: function (req, res) {
        photoModel.find({flagCount: {$lte: 5}}).exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            var hotScore = decay.hackerHot();

            photos.sort((a,b) => { return hotScore(b.likes,b.date) - hotScore(a.likes,a.date) } );
            var data = [];
            data.photos = photos;
            return res.json(photos);
        });
    },

    search: function (req, res) {
        photoModel.find({tag: RegExp(".*" + req.params.tag + ".*")}).exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            var data = [];
            data.photos = photos;
            return res.json(photos);
        });
    },

    dodaj: function(req, res){
        return res.render('photo/dodaj');
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        photoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }
            return res.json(photo);
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new photoModel({
			name : req.body.name,
			path : 'images/'+req.file.filename,
			views : req.body.views,
			likes : 0,
            author : req.session.username,
            date : new Date(),
            tag : req.body.tag,
            likedBy : [],
            comments : [],
            flagCount : 0
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }
            return res.status(201).json(photo);
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        photoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            console.log(req.body);

            photo.name = req.body.name ? req.body.name : photo.name;
			photo.path = req.body.path ? req.body.path : photo.path;
			photo.views = req.body.views ? req.body.views : photo.views;
			photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.author = req.body.author ? req.body.author : photo.author;
            photo.date = req.body.date ? req.body.date : photo.date;
            photo.tag = req.body.tag ? req.body.tag : photo.tag;
            photo.flagCount = req.body.flagCount ? req.body.flagCount : photo.flagCount;

            if(req.body.likedBy != null)
                photo.likedBy.push(req.body.likedBy);

            if(req.body.comment != null)
                photo.comments.push(req.body.comment);

            
			
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        photoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
