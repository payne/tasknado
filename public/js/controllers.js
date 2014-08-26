var tnApp = angular.module('Tasknado', []);

tnApp.controller('TasksCtrl', function($scope) {
    // A helper function (not exposed to the view) that allows us to build
    // a lookup table for objects (e.g., '{ name: "Open" }') based on one of
    // the object's properties.
    var buildIndex = function(source, propertyName) {
        var tempArray = [];

        for (var i = 0; i < source.length; i++) {
            tempArray[source[i][propertyName]] = source[i];
        }

        return tempArray;
    };

    $scope.currentTask;

    $scope.statuses = [
        { name: "Open" },
        { name: "In Progress" },
        { name: "Closed" }
    ];

    $scope.statusesIndex = buildIndex($scope.statuses, 'name');

    $scope.tasks = [
        { title: 'Create syllabi',
          description: 'Do CS-1, Discrete, and ProgLang',
          status: "Open" },
        { title: 'Prioritization PIF',
          description: 'Do sections labeled for me',
          status: "Open" },
        { title: 'Red folder',
          description: 'class evaluations, new faculty writers',
          status: "Open" },
        { title: 'Officer hours',
          description: 'post on Web site and door',
          status: "In Progress" },
        { title: 'New faculty Web site',
          description: 'do on github.io',
          status: "Open" }
    ];

    // Called whenever the user clicks on a single task in the task list.
    // This has the effect of loading data into the scope variables for
    // use in data binding.
    $scope.setCurrentTask = function(task) {
        $scope.currentTask = task;
        $scope.currentStatus = $scope.statusesIndex[task.status];
    };

    // Called whenever status is changed on the currentTask.
    // Through two-way data binding, this has the effect of updating the task list.
    $scope.setCurrentStatus = function(status) {
        if (typeof $scope.currentStatus !== 'undefined') {
            $scope.currentTask.status = status.name;
        }
    };

});

