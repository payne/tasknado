// ---------- Domain objects and utility functions ----------

function Task(title, description, status) {
    this.title = title;
    this.description = description;
    this.status = status;
}

function blankTask() {
    return new Task('insert title', 'insert description', 'Open');
}

// ---------- Angular factories ----------

angular.module('tn.services', [])
.factory('tnHelper', function() {
    // A helper function that allows us to build a lookup table for
    // objects (e.g., '{ name: "Open" }')
    // based on one of the object's properties (in this case 'name').
    // We need this, for example, because we want to associate a task's status
    // property value like 'Open' with the HTML select option value {name: 'Open'},
    // but we want to do it generically.
    // This function is taken from Brian T. Ford's book "AngularJS In Action."
    var buildIndex = function(source, propertyName) {
        var tempArray = [];

        for (var i = 0; i < source.length; i++) {
            tempArray[source[i][propertyName]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
})
.factory('tnModel', function($http) {
    return {
        // Inserts an array of Task objects to ctrl$scope.tasks.
        loadTasks: function(ctrl$scope) {
            $http.get('/tasks').
                success(function(data, status, headers, config) {
                    ctrl$scope.tasks = data;
                });
        },
        createTask: function() {
            //$http.post('/tasks/create')
        },
        updateTask: function(task) {
            console.log("Updating task ID " + task.id);
            $http.post('/tasks/'+task.id, task, function() { console.log('updated'); }  );
        },
        deleteTask: function(task) {
            //$http.delete('/tasks/'+task.id)
        },
        getStatuses: function() {
            return [
                { name: "Open" },
                { name: "In Progress" },
                { name: "Closed" }
            ];
        }
    };
});
