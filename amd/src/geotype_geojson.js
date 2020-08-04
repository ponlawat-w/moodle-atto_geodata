define([
  'jquery',
  'local_leaflet/core'
  ], (
    $, L
  ) => ({
    init: function (defaultValue = '') {
      const $alert = $('<div>')
        .attr('id', 'atto_geodata-geojson_alert')
        .addClass('alert alert-danger mt-2');
      $alert.hide();

      const $textarea = $('<textarea>')
        .attr('id', 'atto_geodata-geojson')
        .css('font-family', 'monospace')
        .css('height', '50vh')
        .addClass('form-control mt-2')
        .val(defaultValue);

      $('#atto_geodata-body').html($alert).append($textarea);
    },
    _alert: function(text) {
      $('#atto_geodata-geojson_alert').html(text).show();
    },
    save: function() {
      try {
        const data = $('#atto_geodata-geojson').val();

        if (!data.trim()) {
          throw M.str.atto_geodata.geojsonempty;
        }

        const json = JSON.parse(data);
        if (!json) {
          throw M.str.atto_geodata.geojsoninvalid;
        }
        
        const geojson = L.geoJson(json);
        if (!geojson) {
          throw M.str.atto_geodata.geojsoninvalid;
        }

        const $result = $('<span>')
          .addClass('filter-geodata filter-geodata-geojson')
          .html(data);
        return $result[0].outerHTML;

      } catch (err) {
        this._alert(err);
        return false;
      }

    },
    dispose: () => {}
  })
);
