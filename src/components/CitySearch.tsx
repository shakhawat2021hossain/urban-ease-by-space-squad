import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import type { CityData } from "@/pages/Landing";

interface CitySearchProps {
  onCitySelect: (city: CityData) => void;
}

const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`
        );

        if (response.data.results) {
          setSuggestions(response.data.results);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleCityClick = (city: CityData) => {
    setSearchTerm(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onCitySelect(city);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="glass-card pl-12 pr-4 py-6 text-lg border-2 border-border/50 focus:border-primary"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 glass-card max-h-80 overflow-y-auto z-50 animate-fade-in">
          {suggestions.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city)}
              className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 flex items-start gap-3 border-b border-border/50 last:border-0"
            >
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{city.name}</div>
                <div className="text-sm text-muted-foreground">
                  {city.country}
                  {city.population && ` • Pop: ${(city.population / 1000000).toFixed(1)}M`}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute w-full mt-2 glass-card p-4 text-center text-muted-foreground animate-fade-in">
          Searching...
        </div>
      )}
    </div>
  );
};

export default CitySearch;
