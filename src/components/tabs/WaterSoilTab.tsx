import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import type { CityData } from "@/pages/Landing";

interface WaterSoilTabProps {
  city: CityData;
}

const WaterSoilTab = ({ city }: WaterSoilTabProps) => {
  const [riverData, setRiverData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiverData = async () => {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const response = await axios.get(
          `https://flood-api.open-meteo.com/v1/flood?latitude=${city.latitude}&longitude=${city.longitude}&daily=river_discharge&start_date=${startDate}&end_date=${endDate}`
        );
        setRiverData(response.data);
      } catch (error) {
        console.error("Error fetching river data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiverData();
  }, [city]);

  const chartData = riverData?.daily?.time?.map((time: string, idx: number) => ({
    date: new Date(time).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    discharge: riverData.daily.river_discharge[idx],
  })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left - Water & Soil Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Water Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Groundwater Level</span>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">River Discharge</span>
              <Badge>
                {loading ? "..." : `${riverData?.daily?.river_discharge?.[riverData.daily.river_discharge.length - 1]?.toFixed(2) || 0} m³/s`}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Soil Moisture</span>
              <Badge variant="secondary">Adequate</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Drought/Flood Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p className="text-sm font-semibold">GRACE Anomalies</p>
              <p className="text-xs text-muted-foreground">Moderate groundwater depletion</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">SMAP Soil Moisture</p>
              <p className="text-xs text-muted-foreground">Stable conditions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Recharge Sites</p>
              <p className="text-xs text-muted-foreground">Identify 10 potential locations</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Water Conservation</p>
              <p className="text-xs text-muted-foreground">Target 20% reduction in usage</p>
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
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>River Discharge (30 Days)</CardTitle>
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
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="discharge" stroke="hsl(var(--primary))" strokeWidth={2} name="Discharge (m³/s)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Industrial Sites & Wastewater</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-alert/5 rounded-lg">
                <span className="text-sm">Monitored industrial sites</span>
                <Badge variant="secondary">24 locations</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                <span className="text-sm">Wastewater treatment plants</span>
                <Badge>8 facilities</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm">Water quality violations</span>
                <Badge variant="destructive">2 this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WaterSoilTab;
