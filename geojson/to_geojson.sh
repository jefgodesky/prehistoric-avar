#!/bin/sh
for file in *.svg; do svg2geojson "$file"; done

