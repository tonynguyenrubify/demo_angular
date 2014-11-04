app.controller("ContactsEditCtrl", function($scope, $routeParams, $location, Contact) {

  if ($routeParams.id) {
    $scope.contact = Contact.show({ id: $routeParams.id });
  } else {
    $scope.contact = new Contact();
  }
  $scope.message = '';
  $scope.submit = function() {
    console.log("submit")

    function success(response) {
      console.log("success", response)
      $location.path("/contacts");
    }

    function failure(response) {
      console.log("failure", response)

      _.each(response.data, function(errors, key) {
        _.each(errors, function(e) {
          $scope.form[key].$dirty = true;
          $scope.form[key].$setValidity(e, false);
          $scope.message = $scope.message + e;
        });
      });
    }

    if ($routeParams.id) {
      Contact.update($scope.contact, success, failure);
    } else {
      Contact.create($scope.contact, success, failure);
    }

  };

  $scope.cancel = function() {
     if($scope.contact.id) {
        $location.path("/contacts/"+$scope.contact.id);
     }
     else {
        $location.path("/contacts");
     }
    
  };
  
  $scope.destroy = function() {
     // function success(response) {
     //   console.log("success", response)
     //   $location.path("/contacts");
     // }
     //
     // function failure(response) {
     //   console.log("failure", response)
     //
     //   _.each(response.data, function(errors, key) {
     //     _.each(errors, function(e) {
     //       $scope.form[key].$dirty = true;
     //       $scope.form[key].$setValidity(e, false);
     //       $scope.message = $scope.message + e;
     //     });
     //   });
     // }
     $location.path("/contacts");
     Contact.destroy($scope.contact);
     // $scope.contacts.$remove($scope.contact).then(function(data) {
     //     $location.path('/contacts');
     // });
  };

  $scope.errorClass = function(name) {
    var s = $scope.form[name];
    return s.$invalid && s.$dirty ? "error" : "";
  };

  $scope.errorMessage = function(name) {
    var s = $scope.form[name].$error;
    result = [];
    _.each(s, function(key, value) {
      result.push(value);
    });
    return result.join(", ");
  };
  
  // $scope.$watch('contact.firstname', function (newVal, oldVal) {
  //    if (typeof(newVal) == "undefined") {
  //      $scope.form['firstname'].$dirty = true;
  //      $scope.form['firstname'].$setValidity("firstname is required", false);
  //      $scope.message = $scope.message + "firstname is required";
  //      return;
  //    }
  //  });
  //  
  //  $scope.$watch('contact.lastname', function (newVal, oldVal) {
  //     if (typeof(newVal) == "undefined") {
  //       $scope.form['lastname'].$dirty = true;
  //       $scope.form['lastname'].$setValidity("lastname is required", false);
  //       $scope.message = $scope.message + "lastname is required";
  //       return;
  //     }
  //   }); 
  // 
  //   $scope.$watch('contact.age', function (newVal, oldVal) {
  //      if (typeof(newVal) == "undefined") {
  //        $scope.form['age'].$dirty = true;
  //        $scope.form['age'].$setValidity("age is required", false);
  //        $scope.message = $scope.message + "age is required";
  //        return;
  //      }
  //    });
});