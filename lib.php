<?php

function atto_geodata_strings_for_js() {
  global $PAGE;
  $PAGE->requires->strings_for_js([
    'addgeodata',
    'geotype_pointfrommap',
    'geotype_geojson'
  ], 'atto_geodata');
}
