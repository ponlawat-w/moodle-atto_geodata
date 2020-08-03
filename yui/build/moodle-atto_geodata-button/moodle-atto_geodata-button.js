YUI.add('moodle-atto_geodata-button', function (Y, NAME) {

var COMPONENTNAME = 'atto_geodata',
  TEMPLATE = 'Hello World!';

Y.namespace('M.atto_geodata').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
  _currentSelection: null,
  _content: null,
  initializer: function() {
    this.addButton({
      icon: 'i/location',
      callback: this._activate,
      title: 'addgeodata'
    });
  },
  _activate: function() {
    require(['atto_geodata/dialogue'], function(OpenGeoDataDialogue) {
      var selection = this.get('host').getSelection();
      OpenGeoDataDialogue()
        .then(function(data) {
            this.get('host').setSelection(selection);
            this.get('host').insertContentAtFocusPoint(data);
          }.bind(this))
        .catch(function() {
          this.get('host').setSelection(selection);
        }.bind(this));
    }.bind(this));
  }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
