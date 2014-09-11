angular.module('tn.controllers', ['tn.services']).controller('TasksCtrl', function($scope, $http, tnHelper, tnModel) {
    tnModel.loadTasks($scope);
    $scope.statuses = tnModel.getStatuses();
    $scope.statusesIndex = tnHelper.buildIndex($scope.statuses, 'name');

    $scope.currentTask;

    $scope.saving = false;

    // Called whenever the user clicks on a single task in the task list.
    // This has the effect of loading data into the scope variables for
    // use in data binding.
    $scope.setCurrentTask = function(task) {
        $scope.currentTask = task;
        $scope.currentStatus = $scope.statusesIndex[task.status];
    };

    // Add a new blank task at the beginning of the array via 'unshift' (rather than at the end via 'push').  I think unshift is a stupid name for this method, ECMA people.
    $scope.addTask = function() {
        $scope.tasks.unshift( blankTask() );
    };

    // Called whenever status is changed on the currentTask.
    // Through two-way data binding, this has the effect of updating the task list.
    $scope.setCurrentStatus = function(status) {
        if (typeof $scope.currentStatus !== 'undefined') {
            $scope.currentTask.status = status.name;
        }
    };

    // Queues for tasks that need auto-saved.
    $scope.taskIDSaveQ = [];
    $scope.taskSaveQ = [];

    // Queue for auto-save if any of the fields change.
    $scope.$watch('currentTask.title', function() {
        queueTaskForSave();
    });
    $scope.$watch('currentTask.description', function() {
        queueTaskForSave();
    });
    // FIXME status... currentStatus or currentTask.status?  probably the former

    var queueTaskForSave = function() {
        if ($scope.currentTask) {
            var taskID = $scope.currentTask.id;
            if ($scope.taskIDSaveQ.indexOf(taskID) == -1) {
                $scope.taskIDSaveQ.push(taskID);
                $scope.taskSaveQ.push($scope.currentTask);
            }
            setTimeout(saveTasks, 2000);
        }
    };

    // Do auto-save.
    var saveTasks = function() {
        $scope.saving = true;
        if ($scope.taskSaveQ.length > 0) {
            $scope.taskSaveQ.forEach( function(task) {
                tnModel.updateTask(task);
            } );
            $scope.taskIDSaveQ.splice(0, $scope.taskIDSaveQ.length);
            $scope.taskSaveQ.splice(0, $scope.taskSaveQ.length);
            
            setTimeout(resetSavingFeedback, 1000);
        }
    };

    var resetSavingFeedback = function() {
        $scope.$apply(function(){
            $scope.saving = false;
        });
    };
});
