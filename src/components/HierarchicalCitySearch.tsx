import { useState, useEffect } from "react";
import { Check, ChevronDown, Globe, MapPin } from "lucide-react";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CityData } from "@/pages/Landing";

interface HierarchicalCitySearchProps {
  onCitySelect: (city: CityData) => void;
}

const continents = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
];

interface Country {
  name: {
    common: string;
  };
  cca2: string;
  continents: string[];
}

// Static data for Bangladesh cities
const bangladeshCities: CityData[] = [
  {
    id: 1,
    name: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    country: "Bangladesh",
  },
  {
    id: 2,
    name: "Chittagong",
    latitude: 22.3569,
    longitude: 91.7832,
    country: "Bangladesh",
  },
  {
    id: 3,
    name: "Khulna",
    latitude: 22.8456,
    longitude: 89.5403,
    country: "Bangladesh",
  },
  {
    id: 4,
    name: "Rajshahi",
    latitude: 24.3745,
    longitude: 88.6042,
    country: "Bangladesh"
  },
  {
    id: 5,
    name: "Sylhet",
    latitude: 24.8949,
    longitude: 91.8687,
    country: "Bangladesh"
  },
  {
    id: 6,
    name: "Barisal",
    latitude: 22.7010,
    longitude: 90.3535,
    country: "Bangladesh",
  },
  {
    id: 7,
    name: "Rangpur",
    latitude: 25.7439,
    longitude: 89.2752,
    country: "Bangladesh",
  },
  {
    id: 8,
    name: "Comilla",
    latitude: 23.4682,
    longitude: 91.1788,
    country: "Bangladesh",
  },
  {
    id: 9,
    name: "Mymensingh",
    latitude: 24.7471,
    longitude: 90.4203,
    country: "Bangladesh",
  },
  {
    id: 10,
    name: "Narayanganj",
    latitude: 23.6237,
    longitude: 90.5000,
    country: "Bangladesh",
  }
];

const HierarchicalCitySearch = ({ onCitySelect }: HierarchicalCitySearchProps) => {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [openContinent, setOpenContinent] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // Fetch countries when continent is selected
  useEffect(() => {
    const fetchCountries = async () => {
      if (!selectedContinent) return;
      
      setIsLoadingCountries(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,continents,cca2');
        console.log(response);
        const filteredCountries = response.data.filter(
          (country: Country) => country.continents[0] === selectedContinent
        );
        setCountries(filteredCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, [selectedContinent]);

  // Fetch cities and their data
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry) return;
      
      setIsLoadingCities(true);
      try {
        if (selectedCountry === "Bangladesh") {
          // For Bangladesh, fetch additional data for static cities
          const cityDataPromises = bangladeshCities.map(async (city) => {
            try {
              const response = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.name)}&country=BD&count=1&language=en&format=json`
              );
              if (response.data.results && response.data.results[0]) {
                return {
                  ...city,
                  population: response.data.results[0].population,
                  latitude: response.data.results[0].latitude,
                  longitude: response.data.results[0].longitude
                };
              }
              return city;
            } catch (error) {
              console.error(`Error fetching data for ${city.name}:`, error);
              return city;
            }
          });
          
          const enrichedCities = await Promise.all(cityDataPromises);
          setCities(enrichedCities.sort((a, b) => (b.population || 0) - (a.population || 0)));
        } else {
          // For other countries, use API as before
          const response = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=city&country=${encodeURIComponent(selectedCountry)}&count=50&language=en&format=json`
          );

          if (response.data.results) {
            const sortedCities = response.data.results
              .sort((a: CityData, b: CityData) => (b.population || 0) - (a.population || 0))
              .filter((city: CityData) => city.name && city.country);
            setCities(sortedCities);
          } else {
            setCities([]);
          }
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry("");
    setCities([]);
    setOpenContinent(false);
  };

  const handleCountrySelect = (country: string) => {
    console.log('Selected country:', country); // Debug log
    setSelectedCountry(country);
    setCities([]);
    setOpenCountry(false);
  };

  const handleCitySelect = (city: CityData) => {
    onCitySelect(city);
    setOpenCity(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Continent Selection */}
        <Popover open={openContinent} onOpenChange={setOpenContinent}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openContinent}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedContinent || "Select Continent"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search continent..." />
              <CommandEmpty>No continent found.</CommandEmpty>
              <CommandGroup>
                {continents.map((continent) => (
                  <CommandItem
                    key={continent}
                    value={continent}
                    onSelect={() => handleContinentSelect(continent)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedContinent === continent ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {continent}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Country Selection */}
        <Popover open={openCountry} onOpenChange={setOpenCountry}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCountry}
              className={cn(
                "w-full sm:w-[200px] justify-between",
                !selectedContinent && "opacity-50 cursor-not-allowed"
              )}
              disabled={!selectedContinent}
            >
              {selectedCountry || "Select Country"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>
                {isLoadingCountries ? "Loading..." : "No country found."}
              </CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.cca2}
                    value={country.name.common}
                    onSelect={() => handleCountrySelect(country.name.common)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry === country.name.common ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.name.common}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* City Selection */}
        <Popover open={openCity} onOpenChange={setOpenCity}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCity}
              className={cn(
                "w-full sm:w-[200px] justify-between",
                !selectedCountry && "opacity-50 cursor-not-allowed"
              )}
              disabled={!selectedCountry}
            >
              Select City
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandEmpty>
                {isLoadingCities ? "Loading..." : "No city found."}
              </CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={city.name}
                    onSelect={() => handleCitySelect(city)}
                  >
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                      <span>{city.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {city.country}
                        {city.population ? ` • Pop: ${(city.population / 1000000).toFixed(1)}M` : ''}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Globe className="w-4 h-4" />
        <span>Browse cities by selecting a continent and country first</span>
      </div>
    </div>
  );
};

export default HierarchicalCitySearch;