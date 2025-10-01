import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CitySearch from "@/components/CitySearch";
import HierarchicalCitySearch from "@/components/HierarchicalCitySearch";
import { Button } from "@/components/ui/button";
import { MapPin, Leaf, Droplets, Wind, ThermometerSun, Search, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface CityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population?: number;
}

const issueTypes = ["Air Quality", "Water & Flood", "Greenspace", "Traffic", "Other"];

const Landing = () => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(issueTypes[0]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    navigate("/dashboard", { state: { city: city } });
  };

  const handleReportsNavigate = () => {
    navigate("/reports");
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !title || !description) {
      alert("Please fill all required fields.");
      return;
    }

    console.log({ city, title, type, description, date: new Date().toISOString() });
    setSuccessMessage("Report submitted successfully!");
    setCity("");
    setTitle("");
    setDescription("");
    setType(issueTypes[0]);
  };

  const features = [
    { icon: ThermometerSun, title: "Temperature Monitoring", description: "Track land surface temperature and urban heat islands" },
    { icon: Wind, title: "Air Quality Index", description: "Monitor PM2.5, PM10 and air pollution levels" },
    { icon: Leaf, title: "Vegetation Analysis", description: "Analyze NDVI and urban green spaces" },
    { icon: Droplets, title: "Water & Flood Data", description: "Track water stress and river discharge patterns" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Header / Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-16">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <img src="/assets/logo-min.png" alt="Logo" className="w-16 h-16" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-3xl"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="gradient-earth p-4 rounded-2xl shadow-[var(--shadow-elevated)] animate-float">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Urban Ease
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            Explore environmental data and urban insights for cities worldwide
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
            <Button onClick={handleReportsNavigate}>View Community Reports</Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Submit a Report</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogTitle>Submit a City Report</DialogTitle>
                <DialogDescription className="mb-4">
                  Fill out the form below to submit a report about your city.
                </DialogDescription>
                <form onSubmit={handleSubmitReport} className="flex flex-col gap-4">
                  <Input placeholder="City Name" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <Input placeholder="Location" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <Input placeholder="Issue Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Issue Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Describe the issue in detail" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required />
                  <div className="flex gap-2 justify-end mt-2">
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Submit</Button>
                  </div>
                  {successMessage && <p className="text-green-600 mt-2 text-center">{successMessage}</p>}
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Tabs */}
          <motion.div className="w-full mt-4">
            <Tabs defaultValue="quick" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="quick" className="flex items-center gap-2"><Search className="w-4 h-4" />Quick Search</TabsTrigger>
                <TabsTrigger value="browse" className="flex items-center gap-2"><Globe className="w-4 h-4" />Browse by Region</TabsTrigger>
              </TabsList>
              <TabsContent value="quick" className="glass-card p-4 max-h-[30vh] overflow-auto">
                <CitySearch onCitySelect={handleCitySelect} />
              </TabsContent>
              <TabsContent value="browse" className="glass-card p-4 max-h-[30vh] overflow-auto">
                <HierarchicalCitySearch onCitySelect={handleCitySelect} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full max-w-6xl">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-4 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:scale-105">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-background/80 py-2 text-center border-t border-muted-foreground/20">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Urban Ease | Powered by NASA Data
        </p>
      </footer>
    </div>
  );
};

export default Landing;
