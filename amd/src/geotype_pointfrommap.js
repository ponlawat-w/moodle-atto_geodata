define([
  'jquery',
  'local_leaflet/core',
  'local_leaflet/osmbasemap'
], (
  $,
  Leaflet,
  OsmBasemap
) => ({
  _map: null,
  _point: null,
  _marker: null,
  setPoint: function(point) {
    if (point && point.lat && point.lng) {
      this._point = point;
      if (this._marker) {
        this._marker.setLatLng(this._point);
      } else {
        this._marker = Leaflet.marker(this._point);
        this._map.addLayer(this._marker);
      }
      $('#atto_geodata-latlng').html(
        `${M.str.atto_geodata.latitude}: ${this._point.lat},` +
        ` ${M.str.atto_geodata.longitude}: ${this._point.lng}`
      );
    } else {
      this._point = null;
      if (this._marker) {
        this._map.removeLayer(this._marker);
      }
      $('#atto_geodata-latlng').html(M.str.atto_geodata.nopointselected);
    }
  },
  init: function(defaultValue) {
    const $body = $('#atto_geodata-body');

    $('<div>')
      .attr('id', 'atto_geodata-latlng')
      .addClass('text-center')
      .html(M.str.atto_geodata.nopointselected)
      .appendTo($body);

    $('<div>')
      .attr('id', 'atto_geodata-map')
      .css('width', '100%')
      .css('height', '50vh')
      .appendTo($body);
      
      this._map = Leaflet.map('atto_geodata-map');
      this._map.addLayer(OsmBasemap);
      this._map.setView([0, 0], 1);
      this._map.on('click', function(e) {
        this.setPoint(e.latlng);
      }.bind(this));
      $('#atto_geodata-map').addClass('leaflet-crosshair');
    
    if (defaultValue) {
      const data = defaultValue.split(',').map(x => parseFloat(x.trim()));
      if (data.length > 1) {
        this.setPoint({lat: data[0], lng: data[1]});
      }
    }
  },
  save: function() {
    if (this._point && this._point.lat && this._point.lng) {
      const $result = $('<span>')
        .addClass('filter-geodata filter-geodata-point')
        .html(`${this._point.lat},${this._point.lng}`);
      return $result[0].outerHTML;
    }
    return false;
  },
  dispose: function() {
    if (this._map) {
      if (this._marker) {
        this._marker.remove();
      }
      this._marker = null;

      if (this._map) {
        this._map.off();
        this._map.remove();
      }
      this._map = null;
    }
  }
}));
