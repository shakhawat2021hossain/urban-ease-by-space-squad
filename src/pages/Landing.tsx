import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CitySearch from "@/components/CitySearch";
import { Button } from "@/components/ui/button";
import { MapPin, Leaf, Droplets, Wind, ThermometerSun } from "lucide-react";

export interface CityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population?: number;
}

const Landing = () => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const navigate = useNavigate();

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
  };

  const handleGoToDashboard = () => {
    if (selectedCity) {
      navigate("/dashboard", { state: { city: selectedCity } });
    }
  };

  const features = [
    {
      icon: ThermometerSun,
      title: "Temperature Monitoring",
      description: "Track land surface temperature and urban heat islands",
    },
    {
      icon: Wind,
      title: "Air Quality Index",
      description: "Monitor PM2.5, PM10 and air pollution levels",
    },
    {
      icon: Leaf,
      title: "Vegetation Analysis",
      description: "Analyze NDVI and urban green spaces",
    },
    {
      icon: Droplets,
      title: "Water & Flood Data",
      description: "Track water stress and river discharge patterns",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="gradient-earth p-4 rounded-2xl shadow-[var(--shadow-elevated)] animate-float">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Urban Ease
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore environmental data and urban insights for cities worldwide
          </p>

          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <CitySearch onCitySelect={handleCitySelect} />
          </motion.div>

          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleGoToDashboard}
                variant="gradient"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl"
              >
                Go to Dashboard →
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="glass-card p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:scale-105"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
