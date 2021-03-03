var app = angular.module("contactList",[]);
myCtrl = app.controller("myCtrl",function($scope){
    info = $scope.info = [
        {name:"Vuqar",tel:"+994-70-944-02-37",created:"01-02-2021 12:30",lastModified:"01-02-2021 13:30"},
        {name:"Orxan",tel:"+994-55-330-10-20",created:"01-02-2021 11:30",lastModified:"01-02-2021 14:30"},
        {name:"Samir",tel:"+994-70-200-02-03",created:"01-02-2021 10:30",lastModified:"01-02-2021 11:30"}
    ];
    
    $scope.saveLocal = function() {
        localStorage.setItem("contacts", JSON.stringify($scope.info));
    }
    if(localStorage.getItem('contacts') != null){
        $scope.info = JSON.parse(localStorage.getItem('contacts'));
    }
    $scope.addMe = function(){
        return {
            name: $scope.newName,
            tel: $scope.newTel,
            created:new Date(),
            lastModified:new Date()
        }
    }
    $scope.addItem = function(){
     for(var i=0;i<$scope.info.length;i++){
         if(($scope.info[i].name == $scope.addMe().name)&&
            ($scope.info[i].tel == $scope.addMe().tel)){
             alert("name and telphone number was repeated");
             return false;
         }

     }
     $scope.info.push($scope.addMe());
     $scope.saveLocal();
    }
    $scope.removeContact = function(){
        $scope.info.splice(this.$index,1)
        $scope.saveLocal();
    }       
    $scope.change = function(){
      index = this.$index;
      $scope.showMe = function(indx){
          if(indx == index){
           return true;                 
          }
      }
    }
    $scope.save = function(){
      index = this.$index;
      $scope.showMe = function(indx){
          if(indx == index){
           return false;                 
          }
      }
      $scope.info[this.$index].lastModified = new Date();
      $scope.saveLocal();
    }        
    //localStorage.removeItem('contacts');  
})
app.directive('fileReader', function() {
    return {
      scope: {
        fileReader:"="
      },
      link: function(scope, element) {
        (element).on('change', function(changeEvent) {
          var files = changeEvent.target.files;
          if (files.length) {
            var r = new FileReader();
            r.onload = function(e) {
                var contents = e.target.result;
                scope.$apply(function () {
                    function csvToJSON(csv) {
                        var record = csv.split(/\r\n|\n/);
                        var headers = record[0].split(',');
                        var lines = [];
                        var json = {};

                        for (var i = 0; i < record.length; i++) {
                            var data = record[i].split(',');
                            if (data.length == headers.length) {
                                var tarr = [];
                                for (var j = 0; j < headers.length; j++) {
                                    tarr.push(data[j]);
                                }
                                lines.push(tarr);
                            }
                        }
                        
                        for (var k = 0; k < lines.length; ++k){
                        json[k] = lines[k];
                        }
                        for(i=0; i<Object.keys(json).length; i++){
                            function importData() {
                                return {
                                    name: json[i][0],
                                    tel: json[i][1],
                                    created:new Date(),
                                    lastModified:new Date()
                                }
                            }
                            info.push(importData())
                        }
                        localStorage.setItem("contacts", JSON.stringify(info));
                        window.location.reload();
                    }  
                    csvToJSON(contents);
                });
            };
            
            r.readAsText(files[0]);
          }
        });  
      }
    };
  });