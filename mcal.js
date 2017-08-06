// Defines the namespace
var SvetlinAnkov = {};

SvetlinAnkov.Calendar = function() {

  var context = { };

  function test() {
    var storage = context.contentWindow.localStorage;

    if (typeof(storage) === "undefined") {
      context.contentWindow.alert("localStorage not supported");
      return;
    }

    if (storage.getItem("myvar") === null) {
      context.contentWindow.alert("Creating an ID for the first time");
      storage.setItem("myvar", Math.floor(Math.random() * 100));
    }

    context.contentWindow.alert("Your ID is: " + storage.getItem("myvar"));
  }

  function contentLoaded(contentWindow) {
    context.contentWindow = contentWindow;
    test();
  }

  // Public API

  // Called when an iframe has loaded
  this.contentLoaded  = contentLoaded;
};