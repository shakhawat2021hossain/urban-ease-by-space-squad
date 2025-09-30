import { Wind, ThermometerSun, Leaf, Droplets } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { LayerState } from "@/pages/Dashboard";

interface LayerControlsProps {
  activeLayers: LayerState;
  onLayerToggle: (layer: keyof LayerState) => void;
}

const LayerControls = ({ activeLayers, onLayerToggle }: LayerControlsProps) => {
  const layers = [
    {
      key: "airQuality" as keyof LayerState,
      icon: Wind,
      label: "Air Quality",
      color: "text-secondary",
    },
    {
      key: "temperature" as keyof LayerState,
      icon: ThermometerSun,
      label: "Temperature",
      color: "text-alert",
    },
    {
      key: "vegetation" as keyof LayerState,
      icon: Leaf,
      label: "Vegetation",
      color: "text-accent",
    },
    {
      key: "water" as keyof LayerState,
      icon: Droplets,
      label: "Water Stress",
      color: "text-primary",
    },
  ];

  return (
    <div className="absolute top-4 right-4 z-10 glass-card p-4 space-y-3 min-w-[200px]">
      <h3 className="font-semibold text-sm text-foreground mb-3">Map Layers</h3>
      {layers.map((layer) => (
        <div key={layer.key} className="flex items-center justify-between gap-3">
          <Label
            htmlFor={layer.key}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <layer.icon className={`w-4 h-4 ${layer.color}`} />
            <span>{layer.label}</span>
          </Label>
          <Switch
            id={layer.key}
            checked={activeLayers[layer.key]}
            onCheckedChange={() => onLayerToggle(layer.key)}
          />
        </div>
      ))}
    </div>
  );
};

export default LayerControls;
