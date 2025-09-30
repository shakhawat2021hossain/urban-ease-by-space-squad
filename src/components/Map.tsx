import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CityData } from "@/pages/Landing";
import type { LayerState } from "@/pages/Dashboard";

interface MapComponentProps {
  city: CityData;
  activeLayers: LayerState;
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ city, activeLayers }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [key: string]: L.TileLayer }>({});

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(
      [city.latitude, city.longitude],
      11
    );

    // Base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add city marker
    const marker = L.marker([city.latitude, city.longitude]).addTo(map.current);
    marker.bindPopup(`
      <div class="p-2">
        <strong class="text-lg">${city.name}</strong><br/>
        <span class="text-sm text-gray-600">${city.country}</span><br/>
        ${city.population ? `<span class="text-sm">Pop: ${(city.population / 1000000).toFixed(2)}M</span>` : ''}
      </div>
    `);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [city]);

  // Handle layer toggles
  useEffect(() => {
    if (!map.current) return;

    // Air Quality Layer (simulated with heatmap effect)
    if (activeLayers.airQuality && !layersRef.current.airQuality) {
      layersRef.current.airQuality = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          opacity: 0.3,
          className: "heatmap-layer",
        }
      ).addTo(map.current);
    } else if (!activeLayers.airQuality && layersRef.current.airQuality) {
      map.current.removeLayer(layersRef.current.airQuality);
      delete layersRef.current.airQuality;
    }

    // Temperature Layer
    if (activeLayers.temperature && !layersRef.current.temperature) {
      layersRef.current.temperature = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          opacity: 0.3,
          className: "temperature-layer",
        }
      ).addTo(map.current);
    } else if (!activeLayers.temperature && layersRef.current.temperature) {
      map.current.removeLayer(layersRef.current.temperature);
      delete layersRef.current.temperature;
    }

    // Vegetation Layer
    if (activeLayers.vegetation && !layersRef.current.vegetation) {
      layersRef.current.vegetation = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          opacity: 0.3,
          className: "vegetation-layer",
        }
      ).addTo(map.current);
    } else if (!activeLayers.vegetation && layersRef.current.vegetation) {
      map.current.removeLayer(layersRef.current.vegetation);
      delete layersRef.current.vegetation;
    }

    // Water Layer
    if (activeLayers.water && !layersRef.current.water) {
      layersRef.current.water = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          opacity: 0.3,
          className: "water-layer",
        }
      ).addTo(map.current);
    } else if (!activeLayers.water && layersRef.current.water) {
      map.current.removeLayer(layersRef.current.water);
      delete layersRef.current.water;
    }
  }, [activeLayers]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full z-0" />
    </div>
  );
};

export default MapComponent;
