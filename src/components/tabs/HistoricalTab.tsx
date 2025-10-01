import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CityData } from "@/pages/Landing";
import { Slider } from "@/components/ui/slider";

interface HistoricalTabProps {
  city: CityData;
}

// Mock historical data generator
const generateHistoricalData = (year: number) => {
  const baseAirQuality = 75 - (2025 - year) * 0.8; // Decreasing air quality as we go back in time
  const baseTemperature = 22 + (2025 - year) * 0.1; // Slight temperature increase over time
  const baseGreenspace = 30 + (2025 - year) * 0.2; // More greenspace in the past
  const baseWaterQuality = 85 - (2025 - year) * 0.5; // Decreasing water quality over time

  return {
    airQuality: Math.max(30, Math.min(100, baseAirQuality + Math.random() * 10 - 5)),
    temperature: Math.max(15, Math.min(30, baseTemperature + Math.random() * 2 - 1)),
    greenspace: Math.max(10, Math.min(50, baseGreenspace + Math.random() * 4 - 2)),
    waterQuality: Math.max(40, Math.min(100, baseWaterQuality + Math.random() * 8 - 4)),
  };
};

const HistoricalTab = ({ city }: HistoricalTabProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    // Generate data points for each 5-year interval
    const years = [];
    for (let year = 2000; year <= 2025; year += 5) {
      years.push({
        year,
        ...generateHistoricalData(year),
      });
    }
    setHistoricalData(years);
  }, []);

  const currentData = generateHistoricalData(selectedYear);

  const metrics = [
    {
      title: "Air Quality Index",
      value: currentData.airQuality.toFixed(1),
      unit: "AQI",
      color: "text-blue-500",
      trend: currentData.airQuality > 70 ? "Good" : currentData.airQuality > 50 ? "Moderate" : "Poor",
    },
    {
      title: "Average Temperature",
      value: currentData.temperature.toFixed(1),
      unit: "°C",
      color: "text-red-500",
      trend: currentData.temperature > 25 ? "High" : currentData.temperature > 20 ? "Moderate" : "Low",
    },
    {
      title: "Green Space Coverage",
      value: currentData.greenspace.toFixed(1),
      unit: "%",
      color: "text-green-500",
      trend: currentData.greenspace > 30 ? "High" : currentData.greenspace > 20 ? "Moderate" : "Low",
    },
    {
      title: "Water Quality Index",
      value: currentData.waterQuality.toFixed(1),
      unit: "WQI",
      color: "text-cyan-500",
      trend: currentData.waterQuality > 80 ? "Good" : currentData.waterQuality > 60 ? "Moderate" : "Poor",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Time Slider */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Historical Timeline</h3>
          <div className="space-y-6">
            <div className="flex justify-center text-2xl font-bold text-primary">
              Year: {selectedYear}
            </div>
            <Slider
              defaultValue={[2025]}
              max={2025}
              min={2000}
              step={5}
              value={[selectedYear]}
              onValueChange={(value) => setSelectedYear(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>2000</span>
              <span>2025</span>
            </div>
          </div>
        </Card>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className="p-4">
              <h4 className="text-sm text-muted-foreground mb-1">{metric.title}</h4>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value} {metric.unit}
              </div>
              <div className="text-sm text-muted-foreground">Trend: {metric.trend}</div>
            </Card>
          ))}
        </div>

        {/* Historical Charts */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Historical Trends</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="airQuality" stroke="#3b82f6" name="Air Quality" />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature" />
                <Line type="monotone" dataKey="greenspace" stroke="#22c55e" name="Green Space" />
                <Line type="monotone" dataKey="waterQuality" stroke="#06b6d4" name="Water Quality" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default HistoricalTab;