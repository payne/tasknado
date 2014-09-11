barfJson = function(res, msg, err) {
    if (!err) {
        err = { status: '', stack: '' };
    }
    console.error(msg, err);
    res.send("{ error: err, message: msg }");
};

module.exports = function(app) {
    app.get('/tasks', function(req, res) {
        query = require('../models/db-util.js').query();
        query('select id, title, description, status from tasks', function(err, rows, result) {
            var tasks = [];
            if (err) {
                barfJson(res, 'error running query', err);
                return;
            }
            rows.forEach( function(row) {
                tasks.push( { id: row.id, title: row.title, description: row.description, status: row.status } );
            } );
            res.send( JSON.stringify(tasks) );
        });
    });

    // FIXME should this be PUT or POST?
    app.post('/tasks/:id', function(req, res) {
/*
        console.log('DB update on task id ' + req.params.id);
        console.log('title: ' + req.body.title);
        console.log('description: ' +  req.body.description);
        console.log('status: ' + req.body.status);
*/
        query = require('../models/db-util.js').query();
        query('update tasks set title = $2, description = $3, status = $4 where id = $1',
              [req.params.id, req.body.title, req.body.description, req.body.status],
            function(err, rows, result) {
                // FIXME Send either error or good result
                console.log('Attempted DB update on task id ' + req.params.id);
            });
        res.send(true);
    });
};
