import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CityData } from "@/pages/Landing";

interface AlertsPanelProps {
  city: CityData;
}

const AlertsPanel = ({ city }: AlertsPanelProps) => {
  const alerts = [
    {
      type: "warning",
      severity: "high",
      title: "High PM2.5 Levels",
      description: "Air quality index exceeds safe limits in downtown area",
      icon: AlertTriangle,
      color: "text-alert",
      bg: "bg-alert/10",
      border: "border-alert/30",
    },
    {
      type: "info",
      severity: "medium",
      title: "Urban Heat Island",
      description: "Temperature 3°C higher than surrounding areas",
      icon: Info,
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/30",
    },
  ];

  const recommendations = [
    {
      title: "Increase Green Spaces",
      description: "Plant 500 trees in identified heat zones",
      icon: Lightbulb,
    },
    {
      title: "Improve Air Quality",
      description: "Implement traffic reduction measures during peak hours",
      icon: Lightbulb,
    },
    {
      title: "Water Conservation",
      description: "Install rainwater harvesting in 20% of buildings",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="glass-card p-4 animate-fade-in">
        <h3 className="font-semibold text-lg mb-4 text-foreground">
          Active Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`${alert.bg} border ${alert.border} rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <alert.icon className={`w-5 h-5 ${alert.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <Badge
                      variant={alert.severity === "high" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h3 className="font-semibold text-lg mb-4 text-foreground">
          Recommendations
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-accent/10 border border-accent/30 rounded-lg p-4 transition-all hover:shadow-md hover:bg-accent/15"
            >
              <div className="flex items-start gap-3">
                <rec.icon className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Info */}
      <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h3 className="font-semibold text-lg mb-3 text-foreground">City Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timezone</span>
            <span className="font-medium">UTC+6:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Coordinates</span>
            <span className="font-medium">
              {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
            </span>
          </div>
          {city.population && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Population</span>
              <span className="font-medium">
                {(city.population / 1000000).toFixed(2)}M
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
