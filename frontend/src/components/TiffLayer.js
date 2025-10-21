import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import chroma from "chroma-js";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { layerStyles } from "../data/layer-styles";

const TiffLayer = ({ layerName, url }) => {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [rasterLayer, setRasterLayer] = useState(null);

  useEffect(() => {
    let currentLayer;
    let isCancelled = false; // 🚨 Cancel flag

    // Remove old layer first
    map.eachLayer((layer) => {
      if (layer instanceof GeoRasterLayer) map.removeLayer(layer);
    });
    if (rasterLayer && map.hasLayer(rasterLayer)) {
      map.removeLayer(rasterLayer);
      setRasterLayer(null);
    }

    // If no URL (panel collapsed)
    if (!url) {
      setLoading(false);
      return;
    }

    const loadTiff = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();

        // 🧩 Parse TIFF
        const georaster = await parseGeoraster(buffer);
        if (isCancelled) return; // ✅ stop if URL changed mid-load

        // 🎨 Style logic
        const style = layerStyles[layerName] || {};
        const isCategorical = style.type === "categorical";
        const colorScale = chroma.scale(style.colorScale || ["blue", "yellow", "red"]);

        currentLayer = new GeoRasterLayer({
          georaster,
          opacity: 0.8,
          resolution: 64,
          pixelValuesToColorFn: (values) => {
            const v = values[0];
            if (v === undefined || v === null || isNaN(v) || v <= 0 || v === -9999)
              return null;
            if (isCategorical) return style.categories?.[v] || "#ccc";
            const min = style.min ?? georaster.mins[0];
            const max = style.max ?? georaster.maxs[0];
            return colorScale((v - min) / (max - min)).hex();
          },
        });

        if (isCancelled) return; // 🛑 Don’t add if old request
        currentLayer.addTo(map);
        setRasterLayer(currentLayer);
        map.fitBounds(currentLayer.getBounds());
      } catch (err) {
        if (!isCancelled) console.error("❌ Failed to load GeoTIFF:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadTiff();

    // Cleanup
    return () => {
      isCancelled = true; // 🚫 Stop pending load
      if (currentLayer && map.hasLayer(currentLayer)) {
        map.removeLayer(currentLayer);
      }
    };
  }, [url, map, layerName]);

  if (!url || !loading) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "rgba(255,255,255,0.9)",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "13px",
        zIndex: 9999,
      }}
    >
      🌀 Loading layer...
    </div>
  );
};

export default TiffLayer;
