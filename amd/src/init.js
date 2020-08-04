define([
  'jquery',
  'atto_geodata/dialogue',
  'filter_geodata/getgeodataformat'
], ($,
  OpenDialogue,
  GetGeodataFormat
) => {
  const initCss = () => {
    const url = M.cfg.wwwroot + '/lib/editor/atto/plugins/geodata/style.css';
    if (!$(`link[href="${url}"]`).length) {
      $('<link>')
        .attr('rel', 'stylesheet')
        .attr('type', 'text/css')
        .attr('href', url)
        .appendTo($('head'));
    }
  };

  return host => {
    initCss();

    const $editor = $(host.editor._node);
    $editor.on('click', '.filter-geodata', e => {
      const $target = $(e.target);
      const type = GetGeodataFormat($target);
      if (type) {
        OpenDialogue(type, $target.html())
          .then(function(data) {
            $target.replaceWith($(data));
            host.updateOriginal();
          }).catch(function() {});
      }
    });
  };
});
