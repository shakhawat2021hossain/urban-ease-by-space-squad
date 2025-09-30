import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import MapComponent from "@/components/Map";
import QuickStatsPanel from "@/components/QuickStatsPanel";
import AlertsPanel from "@/components/AlertsPanel";
import LayerControls from "@/components/LayerControls";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CityData } from "@/pages/Landing";

export interface LayerState {
  airQuality: boolean;
  temperature: boolean;
  vegetation: boolean;
  water: boolean;
}

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = (location.state as { city: CityData })?.city;

  const [activeLayers, setActiveLayers] = useState<LayerState>({
    airQuality: true,
    temperature: false,
    vegetation: false,
    water: false,
  });

  if (!city) {
    navigate("/");
    return null;
  }

  const handleLayerToggle = (layer: keyof LayerState) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-b border-border/50 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {city.name}, {city.country}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                </p>
              </div>
            </div>
            <div className="gradient-earth px-6 py-2 rounded-full">
              <span className="text-white font-semibold">Urban Ease</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <QuickStatsPanel city={city} />
          </motion.div>

          {/* Center - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6"
          >
            <div className="glass-card p-4 h-[600px] relative">
              <LayerControls
                activeLayers={activeLayers}
                onLayerToggle={handleLayerToggle}
              />
              <MapComponent city={city} activeLayers={activeLayers} />
            </div>
          </motion.div>

          {/* Right Sidebar - Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AlertsPanel city={city} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
