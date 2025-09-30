import { motion } from "framer-motion";
import MapComponent from "@/components/Map";
import QuickStatsPanel from "@/components/QuickStatsPanel";
import LayerControls from "@/components/LayerControls";
import type { CityData } from "@/pages/Landing";
import type { LayerState } from "@/pages/Dashboard";

interface OverviewTabProps {
  city: CityData;
  activeLayers: LayerState;
  onLayerToggle: (layer: keyof LayerState) => void;
}

const OverviewTab = ({ city, activeLayers, onLayerToggle }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-3 space-y-6"
      >
        <QuickStatsPanel city={city} />
        
        {/* Time Slider Card */}
        <div className="glass-card p-4">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Historical Data</h3>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Year Range</label>
            <input 
              type="range" 
              min="2000" 
              max="2025" 
              defaultValue="2025"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2000</span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center - Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-9"
      >
        <div className="glass-card p-4 h-[600px] relative">
          <LayerControls
            activeLayers={activeLayers}
            onLayerToggle={onLayerToggle}
          />
          <MapComponent city={city} activeLayers={activeLayers} />
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
