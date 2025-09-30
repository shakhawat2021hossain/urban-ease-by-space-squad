import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { CityData } from "@/pages/Landing";

interface LandUseTabProps {
  city: CityData;
}

const LandUseTab = ({ city }: LandUseTabProps) => {
  const landCoverData = [
    { name: "Built-up", value: 35, color: "hsl(var(--primary))" },
    { name: "Vegetation", value: 28, color: "hsl(var(--secondary))" },
    { name: "Bare Soil", value: 22, color: "hsl(var(--accent))" },
    { name: "Water", value: 15, color: "hsl(var(--chart-4))" },
  ];

  const growthData = [
    { year: "2010", builtUp: 25, vegetation: 35 },
    { year: "2015", builtUp: 30, vegetation: 32 },
    { year: "2020", builtUp: 33, vegetation: 30 },
    { year: "2025", builtUp: 35, vegetation: 28 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left - Land Use Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Urban Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Built-up Area</span>
              <Badge variant="secondary">35%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Green Cover</span>
              <Badge>28%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Growth Rate</span>
              <Badge variant="secondary">+3.2%/year</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Projections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Housing Need (2030)</p>
              <p className="text-xs text-muted-foreground">+250,000 units required</p>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-sm font-semibold">Informal Settlements</p>
              <p className="text-xs text-muted-foreground">Detected via nighttime lights</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Zoning Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
              <span className="text-sm">Compliant zones</span>
              <Badge>87%</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-alert/5 rounded-lg">
              <span className="text-sm">Violations detected</span>
              <Badge variant="destructive">13%</Badge>
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
            <CardTitle>Land Cover Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={landCoverData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {landCoverData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>15-Year Change Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="builtUp" fill="hsl(var(--primary))" name="Built-up %" />
                <Bar dataKey="vegetation" fill="hsl(var(--secondary))" name="Vegetation %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LandUseTab;
