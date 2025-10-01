import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Thermometer, Wind } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import type { CityData } from "@/pages/Landing";

interface HeatAirQualityTabProps {
  city: CityData;
}

const HeatAirQualityTab = ({ city }: HeatAirQualityTabProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&hourly=pm10,pm2_5&timezone=auto`
        );
        setAirQualityData(response.data);
      } catch (error) {
        console.error("Error fetching air quality:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirQuality();
  }, [city]);

  const chartData = airQualityData?.hourly?.time?.slice(0, 24).map((time: string, idx: number) => ({
    time: new Date(time).getHours() + ":00",
    pm25: airQualityData.hourly.pm2_5[idx],
    pm10: airQualityData.hourly.pm10[idx],
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left - Air Quality Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-primary" />
              Air Quality Index
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">PM2.5</span>
              <Badge variant="secondary">
                {loading ? "..." : `${airQualityData?.hourly?.pm2_5?.[0]?.toFixed(1) || 0} µg/m³`}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">PM10</span>
              <Badge variant="secondary">
                {loading ? "..." : `${airQualityData?.hourly?.pm10?.[0]?.toFixed(1) || 0} µg/m³`}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-alert" />
              Heat Vulnerability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-alert/10 border border-alert/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-alert mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">High Risk Zones</p>
                  <p className="text-xs text-muted-foreground">Elderly population areas</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Schools & Hospitals</p>
                  <p className="text-xs text-muted-foreground">12 facilities in UHI zones</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Cooling Centers</p>
              <p className="text-xs text-muted-foreground">Deploy in 5 high-risk zones</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Tree Planting</p>
              <p className="text-xs text-muted-foreground">Focus on heat island areas</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right - Charts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-2 space-y-6"
      >
        {/* PM2.5 & PM10 Trends */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>PM2.5 & PM10 Trends (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Loading data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="pm25" stroke="hsl(var(--primary))" strokeWidth={2} name="PM2.5" />
                  <Line type="monotone" dataKey="pm10" stroke="hsl(var(--secondary))" strokeWidth={2} name="PM10" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* WHO Threshold + Image */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* WHO Threshold Card */}
          <Card className="glass-card flex-1">
            <CardHeader>
              <CardTitle>WHO Threshold Exceedances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-alert/5 rounded-lg">
                  <span className="text-sm">Days exceeding PM2.5 limit</span>
                  <Badge variant="destructive">15 days</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                  <span className="text-sm">Days exceeding PM10 limit</span>
                  <Badge variant="secondary">8 days</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                  <span className="text-sm">Ozone alerts</span>
                  <Badge>3 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://i.ibb.co.com/3HKMbKk/8f1478b8-1f46-4c3c-9686-b520950f6e60.jpg" // replace with your imgbb link
              alt="WHO Visualization"
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeatAirQualityTab;
