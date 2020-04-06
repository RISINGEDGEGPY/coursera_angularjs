(function (){
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


	function FoundItemsDirective(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
                found: '<',
                nothing: '<',
				onRemove: '&'
			}
		};

		return ddo;
	}

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService){
		var menu = this;
		menu.SearchedItem = "";
        menu.found = [];
        menu.nothing = false;
		
		menu.retrieveItems = function (){
            if(menu.SearchedItem==""){
                menu.found = [];
                menu.nothing = true;
            }
			else{
                MenuSearchService.getMatchedMenuItems(menu.SearchedItem)
			    .then(function(foundItems){
                    menu.found = foundItems;
                    if (foundItems.length==0){
                        menu.nothing = true;
                    }
                });
            }
		}

		menu.removeItem = function(index){
			menu.found.splice(index, 1);
		}
	}


	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service = this;

		service.getMatchedMenuItems = function (searchedItem){
		   return $http({
			   			method: "GET",
			   			url : ApiBasePath
		   			})
				   .then(function (response){
						var menuItems = response.data.menu_items;
						var length = menuItems.length;
						var foundItems = [];
						for(var i = 0; i < length; i++){
							if(menuItems[i].description.toLowerCase().search(searchedItem.toLowerCase()) !== -1){
								foundItems.push(menuItems[i]);
							}
						}
						return foundItems;
					});
		}
	}

})();