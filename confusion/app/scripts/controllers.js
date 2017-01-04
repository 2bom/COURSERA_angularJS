'use strict';

angular.module('confusionApp')
    
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
      
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
      
      $scope.dishes= menuFactory.getDishes();
      
      
      $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
          $scope.filtText = "mains";
        }
        else if (setTab === 4) {
          $scope.filtText = "dessert";
        }
        else {
          $scope.filtText = "";
        }
      };
      
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };
      
      $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
      };
    }])
    
    .controller('ContactController', ['$scope', function($scope) {
      
      $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
      
      var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
      
      $scope.channels = channels;
      $scope.invalidChannelSelection = false;
      
    }])
    
    .controller('FeedbackController', ['$scope', function($scope) {
      
      $scope.sendFeedback = function() {
        
        console.log($scope.feedback);
        
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
          $scope.invalidChannelSelection = true;
          console.log('incorrect');
        }
        else {
          $scope.invalidChannelSelection = false;
          $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
          $scope.feedback.mychannel="";
          $scope.feedbackForm.$setPristine();
        }
      };
    }])
    
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
      
      var dish= menuFactory.getDish(parseInt($stateParams.id,10));
      
      $scope.dish = dish;
      
      // display rating by star.
      $scope.ratedStars = ['★', '★★', '★★★', '★★★★', '★★★★★'];
      $scope.getStars = function(comment, rate){
        if(1 <= rate && rate <= 5){
          return $scope.ratedStars[rate-1];
        }
      };
      
    }])
    
    .controller('DishCommentController', ['$scope', function($scope) {
      
      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
      
      $scope.submitComment = function () {
        
        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);
        
        $scope.dish.comments.push($scope.mycomment);
        console.log($scope.dish.comments);
        
        $scope.commentForm.$setPristine();
        
        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
      }
    }])
    
    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
      $scope.featuredDish = menuFactory.getDish(0);
      $scope.promotion = menuFactory.getPromotion(0);
      $scope.chef = corporateFactory.getLeader(3);
      console.log($scope.chef);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
      $scope.leaders = corporateFactory.getLeaders();
    }])

    
.controller('HeaderController', ['$scope', function($scope){
  var navClass= [0,0,0,0];
  $scope.navClass = navClass;
  $scope.navClicked = function(index){
    if ($scope.navClass[index] == 0){
      $scope.navClass = [0,0,0,0];
      $scope.navClass[index] = "active";
    }
  }
}])

;
