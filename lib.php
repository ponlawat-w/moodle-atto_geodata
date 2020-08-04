<?php

function atto_geodata_strings_for_js() {
  global $PAGE;
  $PAGE->requires->strings_for_js([
    'addgeodata',
    'geodata',
    'geotype_pointfrommap',
    'geotype_geojson',
    'nopointselected',
    'latitude',
    'longitude',
    'geojsonempty',
    'geojsoninvalid'
  ], 'atto_geodata');
}
