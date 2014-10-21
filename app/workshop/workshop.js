angular.module('workshop',['ngDraggable'])
    .controller('AppCtrl',['$http','$scope',function($http,$scope){
        var app = this;
        app.dragginColumn = '';
        app.gridSettings = {
            columns : ['name'],
            sortNames : {},
            intSort : [],
            filterValues : {},
            data : []
        };
        app.isImage = function(value){
            if(value.match){
                return (value.match(/\.(jpeg|jpg|gif|png)$/) != null);
            }else{
                return false;
            }
        };
        app.setSort = function(columnName){
            if(!app.gridSettings.sortNames[columnName]){
                app.gridSettings.sortNames[columnName] = {
                    property : columnName,
                    up : true
                }
            }else{
                if(app.gridSettings.sortNames[columnName].up){
                    app.gridSettings.sortNames[columnName].up = false;
                }else{
                    delete app.gridSettings.sortNames[columnName];
                }
            }
            app.interpretSort();
        };
        app.setSearch = function(columnName,initiate){
            if(!app.gridSettings.filterValues[columnName] && initiate){
                app.gridSettings.filterValues[columnName] = {};
            }
            if(app.gridSettings.filterValues[columnName] && !initiate){
                delete app.gridSettings.filterValues[columnName];
            }
        };
        app.toggleColumn = function(columnName){
                var idx = app.gridSettings.columns.indexOf(columnName);
                if (idx > -1) {
                    app.gridSettings.columns.splice(idx, 1);
                }else {
                    app.gridSettings.columns.push(columnName);
                }
        };
        app.interpretSort = function(){
            app.gridSettings.initSort = [];
            for(var i in app.gridSettings.sortNames){
                var addative =  app.gridSettings.sortNames[i].up? '+':'-';
                app.gridSettings.initSort.push(addative + i);
            }
        };

        app.dropColumn = function(dragging,event,column){
            //if(!(event.tx > 500)) {
                app.gridSettings.columns.splice(app.gridSettings.columns.indexOf(dragging), 1);
                app.gridSettings.columns.splice(app.gridSettings.columns.indexOf(column), 0, angular.copy(dragging));
            //}
        };



        app.url = 'http://localhost:3000/';

        $http.get(app.url  + 'game').success(function(result){
            app.gridSettings.data = result;
        });




    }]);