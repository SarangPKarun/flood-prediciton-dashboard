import { useEffect } from "react";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

const RasterLayer = ({ url, opacity = 0.6, visible = true }) => {
  const map = useMap();

  useEffect(() => {
    let layer;

    fetch(url)
      .then(res => res.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        layer = new GeoRasterLayer({
          georaster,
          opacity,
          resolution: 64,
          pixelValuesToColorFn: values => {
            const val = values[0];
            if (val === null) return null;
            if (val < 20) return "green";
            if (val < 50) return "yellow";
            return "red";
          },
        });

        if (visible) layer.addTo(map);
      });

    return () => {
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    };
  }, [map, url, opacity, visible]);

  return null;
};

export default RasterLayer;
