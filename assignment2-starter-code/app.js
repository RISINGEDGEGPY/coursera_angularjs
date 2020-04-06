(function () {
'use strict';

angular.module('BuyApp', [])
.controller('ShoppingListController', ShoppingListController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.service('ShoppingListService', ShoppingListService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var itemList = this;

  itemList.items=[
    { name: "cookies", quantity: 10 },
    { name: "carrots", quantity: 10 },
    { name: "milk", quantity: 10 },
    { name: "candy", quantity: 10 },
    { name: "fruit", quantity: 10 }
  ];

  itemList.buyItem = function (index) {
    var tmpItem = itemList.items[index];
    itemList.items.splice(index,1)
    ShoppingListService.addItem(tmpItem);
  }
}


ShoppingListBoughtController.$inject = ['ShoppingListService'];
function ShoppingListBoughtController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

//   showList.removeItem = function (itemIndex) {
//     ShoppingListService.removeItem(itemIndex);
//   };
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (item) {
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();
