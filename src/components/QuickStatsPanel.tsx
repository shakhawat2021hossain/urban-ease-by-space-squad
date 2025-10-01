/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Users, TrendingUp, TreePine, Building } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import type { CityData } from "@/pages/Landing";

interface QuickStatsPanelProps {
  city: CityData;
}

const QuickStatsPanel = ({ city }: QuickStatsPanelProps) => {
  const [airQualityData, setAirQualityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        const response = await axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&hourly=pm2_5&start_date=${startDate}&end_date=${endDate}`
        );

        if (response.data.hourly) {
          const chartData = response.data.hourly.time
            .slice(0, 24)
            .map((time: string, index: number) => ({
              time: new Date(time).getHours() + ":00",
              pm25: response.data.hourly.pm2_5[index] || 0,
            }));
          setAirQualityData(chartData);
        }
      } catch (error) {
        console.error("Error fetching air quality:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAirQuality();
  }, [city]);

  const stats = [
    {
      icon: Users,
      label: "Population",
      value: city.population ? `${(city.population / 1000000).toFixed(2)}M` : "N/A",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "2.3%",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: TreePine,
      label: "Canopy Cover",
      value: "28%",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Building,
      label: "Impervious Surface",
      value: "62%",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card p-4 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`${stat.bg} p-2 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
        </div>
      ))}

      {/* Air Quality Chart */}
      <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <h3 className="font-semibold mb-4 text-foreground">PM2.5 Trend (24h)</h3>
        {isLoading ? (
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={airQualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="pm25"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default QuickStatsPanel;
