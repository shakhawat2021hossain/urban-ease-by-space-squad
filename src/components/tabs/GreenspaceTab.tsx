import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trees, Leaf } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CityData } from "@/pages/Landing";

interface GreenspaceTabProps {
  city: CityData;
}

const GreenspaceTab = ({ city }: GreenspaceTabProps) => {
  console.log(city);
  const accessibilityData = [
    { district: "North", access: 85, color: "hsl(var(--secondary))" },
    { district: "South", access: 72, color: "hsl(var(--secondary))" },
    { district: "East", access: 65, color: "hsl(var(--alert))" },
    { district: "West", access: 78, color: "hsl(var(--secondary))" },
    { district: "Central", access: 90, color: "hsl(var(--secondary))" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left - Greenspace Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-secondary" />
              Greenspace Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">15-min Walk Access</span>
              <Badge variant="secondary">78%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Parks & Gardens</span>
              <Badge>145 locations</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tree Canopy Cover</span>
              <Badge variant="secondary">23%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-accent" />
              Vegetation Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p className="text-sm font-semibold">NDVI Index</p>
              <p className="text-xs text-muted-foreground">Average: 0.65 (Healthy)</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Biodiversity Corridors</p>
              <p className="text-xs text-muted-foreground">8 major wildlife pathways</p>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Wetlands & Forests</p>
              <p className="text-xs text-muted-foreground">1,200 hectares protected</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Restoration Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Priority Planting Zones</p>
              <p className="text-xs text-muted-foreground">East district: 500 trees needed</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Urban Greening</p>
              <p className="text-xs text-muted-foreground">15 vacant lots identified</p>
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
            <CardTitle>Greenspace Access by District (15-min walk)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={accessibilityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="district" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="access" fill="hsl(var(--secondary))" name="Access %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Ecosystem Services Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                <span className="text-sm">Carbon sequestration</span>
                <Badge variant="secondary">$2.5M/year</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm">Air quality improvement</span>
                <Badge>$1.8M/year</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg">
                <span className="text-sm">Stormwater management</span>
                <Badge variant="secondary">$3.2M/year</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                <span className="text-sm">Recreation & health benefits</span>
                <Badge>$5.1M/year</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GreenspaceTab;
