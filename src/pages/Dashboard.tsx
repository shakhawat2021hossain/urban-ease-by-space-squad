import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LayoutDashboard,
  Thermometer,
  Droplets,
  Building2,
  Trees,
  FileDown,
  History
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/tabs/OverviewTab";
import HeatAirQualityTab from "@/components/tabs/HeatAirQualityTab";
import WaterSoilTab from "@/components/tabs/WaterSoilTab";
import LandUseTab from "@/components/tabs/LandUseTab";
import GreenspaceTab from "@/components/tabs/GreenspaceTab";
import DataDownloadTab from "@/components/tabs/DataDownloadTab";
import HistoricalTab from "@/components/tabs/HistoricalTab";
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

            {/* profile icon */}
            {/* profile icon with name */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Raihan Samee</span>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg" // real-time male photo
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-border/20"
              />
            </div>

          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-7 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="heat" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Heat & Air
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Water & Soil
            </TabsTrigger>
            <TabsTrigger value="land" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Land Use
            </TabsTrigger>
            <TabsTrigger value="greenspace" className="flex items-center gap-2">
              <Trees className="w-4 h-4" />
              Greenspace
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Historical
            </TabsTrigger>
            <TabsTrigger value="download" className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              Download
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              city={city}
              activeLayers={activeLayers}
              onLayerToggle={handleLayerToggle}
            />
          </TabsContent>

          <TabsContent value="heat">
            <HeatAirQualityTab city={city} />
          </TabsContent>

          <TabsContent value="water">
            <WaterSoilTab city={city} />
          </TabsContent>

          <TabsContent value="land">
            <LandUseTab city={city} />
          </TabsContent>

          <TabsContent value="greenspace">
            <GreenspaceTab city={city} />
          </TabsContent>

          <TabsContent value="historical">
            <HistoricalTab city={city} />
          </TabsContent>

          <TabsContent value="download">
            <DataDownloadTab city={city} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
