// import React, { useEffect, useRef } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import GeoRasterLayer from "georaster-layer-for-leaflet";
// import georaster from "georaster";
// import "leaflet/dist/leaflet.css";

// const TiffLayer = () => {
//   const mapRef = useRef();

//   useEffect(() => {
//     const loadGeoTiff = async () => {
//       console.log("Fetching GeoTIFF...");

//       const response = await fetch("../data/layers/aspect.tif"); // ✅ your .tif file in public/data
//       const arrayBuffer = await response.arrayBuffer();

//       console.log("GeoTIFF fetched, converting to GeoRaster...");

//       const raster = await georaster(arrayBuffer);

//       const layer = new GeoRasterLayer({
//         georaster: raster,
//         opacity: 0.7,
//         resolution: 128,
//         pixelValuesToColorFn: values => {
//           const val = values[0];
//           if (val === -9999 || isNaN(val)) return null;
//           if (val > 200) return "#800026";
//           if (val > 150) return "#BD0026";
//           if (val > 100) return "#E31A1C";
//           if (val > 50) return "#FC4E2A";
//           if (val > 25) return "#FD8D3C";
//           if (val > 0) return "#FEB24C";
//           return "#FFEDA0";
//         }
//       });

//       if (mapRef.current) {
//         layer.addTo(mapRef.current);
//         mapRef.current.fitBounds(layer.getBounds());
//       }
//     };

//     loadGeoTiff();
//   }, []);

//   return (
//     <MapContainer
//       center={[10.5, 76.2]}
//       zoom={7.5}
//       style={{ height: "100vh", width: "100%" }}
//       whenCreated={(mapInstance) => {
//         mapRef.current = mapInstance;
//       }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="© OpenStreetMap"
//       />
//     </MapContainer>
//   );
// };

// export default TiffLayer;


import { useEffect } from "react";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import L from "leaflet";

const TiffLayer = ({ url }) => {
  const map = useMap();

  useEffect(() => {
    let rasterLayer;

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => parseGeoraster(arrayBuffer))
      .then((georaster) => {
        console.log("✅ GeoRaster loaded:", georaster);

        rasterLayer = new GeoRasterLayer({
          georaster,
          opacity: 0.7,
          resolution: 64,
          pixelValuesToColorFn: (values) => {
            if (values[0] === null) return null;
            const v = values[0];
            const min = georaster.mins[0];
            const max = georaster.maxs[0];
            const scaled = Math.round(255 * ((v - min) / (max - min)));
            return `rgb(${scaled}, ${scaled}, ${scaled})`;
          },
        });

        rasterLayer.addTo(map);

        // 🧭 Auto-zoom to raster bounds
        const bounds = rasterLayer.getBounds();
        map.fitBounds(bounds);
      })
      .catch((err) => console.error("❌ Error loading GeoTIFF:", err));

    return () => {
      if (rasterLayer) map.removeLayer(rasterLayer);
    };
  }, [map, url]);

  return null;
};

export default TiffLayer;
