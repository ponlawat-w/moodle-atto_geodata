define([
  'jquery',
  'core/modal_factory',
  'core/modal_events',
  'atto_geodata/geotype_pointfrommap',
  'atto_geodata/geotype_geojson'
], (
  $,
  ModalFactory,
  ModalEvents,
  GeoTypePointFromMap,
  GeoTypeGeoJSON
) => {

  const TEMPLATE = '<ul class="nav nav-tabs atto_geodata-geotypes">' +
    '<li class="nav-item"><a href="javascript:void(0);" data-geotype="point" class="nav-link">'
    + M.str.atto_geodata.geotype_pointfrommap + '</a></li>' +
    '<li class="nav-item"><a href="javascript:void(0);" data-geotype="geojson" class="nav-link">'
    + M.str.atto_geodata.geotype_geojson + '</a></li>' +
    '</ul>' +
    '<div id="atto_geodata-body"></div>';

  const typeMappings = {
    point: GeoTypePointFromMap,
    geojson: GeoTypeGeoJSON
  };

  let currentType = null;

  const updateType = (type, defaultValue = undefined) => {
    if (currentType) {
      currentType.dispose();
    }

    $('#atto_geodata-body').html('');

    const $geotypeTabs = $('.atto_geodata-geotypes');
    $geotypeTabs.find('a').removeClass('active');

    if (typeMappings[type]) {
      $geotypeTabs.find(`[data-geotype=${type}]`).addClass('active');
      currentType = typeMappings[type];
      currentType.init(defaultValue);
    }
  };

  const modalShown = (defaultType, defaultValue = undefined) => {
    updateType(defaultType, defaultValue);
    const $geotypeTabs = $('.atto_geodata-geotypes');
    $geotypeTabs.find('a').click(e => {
      const type = $(e.target).attr('data-geotype');
      updateType(type);
    });
  };

  return (type = 'point', value = undefined) => new Promise((resolve, reject) => {
    ModalFactory.create({
      type: ModalFactory.types.SAVE_CANCEL,
      title: 'Test',
      body: TEMPLATE,
      large: true
    }).then(modal => {
      modal.getRoot().on(ModalEvents.shown, () => { modalShown(type, value); });
      modal.getRoot().on(ModalEvents.hidden, () => {
        if (currentType) {
          currentType.dispose();
        }
        modal.destroy();
        reject();
      });
      modal.getRoot().on(ModalEvents.save, e => {
        if (currentType) {
          const saveData = currentType.save();
          if (saveData === false) {
            e.preventDefault();
            return;
          }
          resolve(saveData);
        }
        modal.hide();
      });
      modal.show();
    });
  });

});
