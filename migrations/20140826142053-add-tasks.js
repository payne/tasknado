var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('tasks', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        title: 'string',
        description: 'string',
        status: 'string'
//    }, addDummyTasks);
    }, callback);


/*
    var addDummyTasks = function(err) {
        if (err) { callback(err); return; }
        db.insert('tasks',
                  ['title', 'description', 'status'],
                  ['Dummy task', 'Dummy description', 'Open'], callback);
    };
*/
};

exports.down = function(db, callback) {
    db.dropTable('tasks', callback);
};
