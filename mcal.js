// Defines the namespace
var SvetlinAnkov = {};

SvetlinAnkov.Calendar = function() {

  var context = { };

  function saveAs(obj) {
    var uri = 'data:Application/octet-stream;base64,' + btoa(obj);
    context.contentWindow.open(uri);
  }

  function readSingleFile(e, onload) {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
      onload(e.target.result);
    };

    reader.readAsText(file);
  }

  function loadFile(e) {
    readSingleFile(e, displayFile);
  }

  function test() {
    var storage = context.contentWindow.localStorage;
    var id, obj;

    if (typeof(storage) === "undefined") {
      context.contentWindow.alert("localStorage not supported");
      return;
    }

    // storage.removeItem("myvar");
    if (storage.getItem("myvar") === null) {
      context.contentWindow.alert("Creating an ID for the first time");
      id = Math.floor(Math.random() * 100)
      storage.setItem("myvar", JSON.stringify({id: id}));
    }

    obj = JSON.parse(storage.getItem("myvar"));
    context.contentWindow.alert("Your ID is: " + obj.id);

    // Save settings
    saveAs(JSON.stringify({id: obj.id + 1}));
  }

  function displayFile(contents) {
    var obj = JSON.parse(contents);
    context.contentWindow.alert("Read ID is: " + obj.id);
  }

  function contentLoaded(contentWindow) {
    context.contentWindow = contentWindow;
    test();
  }

  // Public API

  // Called when an iframe has loaded
  this.contentLoaded = contentLoaded;
  this.loadFile = loadFile;
};
