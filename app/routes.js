var Panda = require('./models/panda');

module.exports = function(app) {

	// api
	// get all pandas
	app.get('/api/pandas', function(req, res) {

		// use mongoose to get all pandas in the database
		Panda.find(function(err, pandas) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(pandas); // return all pandas in JSON format
		});
	});

	// create panda and send back all pandas after creation
	app.post('/api/pandas', function(req, res) {

		// create a panda
		Panda.create({
			name : req.body.name
		}, function(err, panda) {
			if (err)
				res.send(err);

			// get and return all the pandas after you create another
			Panda.find(function(err, pandas) {
				if (err)
					res.send(err)
				res.json(pandas);
			});
		});

	});
    // update the panda with this id
        app.put('/api/pandas/:panda_id',function(req, res) {
                Panda.findById(req.params.panda_id, function(err, panda) {
                        if (err)
                                res.send(err);
                        panda.name = req.body.name;
                        panda.save(function(err) {
                                if (err)
                                res.send(err);
                                res.json({ message: 'Panda updated!' });
                        });

                });
        })

	// delete a panda
	app.delete('/api/pandas/:panda_id', function(req, res) {
		Panda.remove({
			_id : req.params.panda_id
		}, function(err, panda) {
			if (err)
				res.send(err);

			// get and return all the pandas after you create another
			Panda.find(function(err, pandas) {
				if (err)
					res.send(err)
				res.json(pandas);
			});
		});
	});

	// application
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};