<?php
defined('MOODLE_INTERNAL') or die();

$plugin->version = 2020080301;
$plugin->requires = 2020061500;
$plugin->component = 'atto_geodata';
$plugin->dependencies = [
  'local_leaflet' => 2020080300,
  'filter_geodata' => 2020080300
];
