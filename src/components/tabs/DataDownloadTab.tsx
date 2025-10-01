import { motion } from "framer-motion";
import { Download, FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CityData } from "@/pages/Landing";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DataDownloadTabProps {
  city: CityData;
}

const generateHistoricalData = () => {
  const years = [];
  for (let year = 2000; year <= 2025; year += 5) {
    const baseAirQuality = 75 - (2025 - year) * 0.8;
    const baseTemperature = 22 + (2025 - year) * 0.1;
    const baseGreenspace = 30 + (2025 - year) * 0.2;
    const baseWaterQuality = 85 - (2025 - year) * 0.5;

    years.push({
      year,
      airQuality: Math.max(30, Math.min(100, baseAirQuality + Math.random() * 10 - 5)),
      temperature: Math.max(15, Math.min(30, baseTemperature + Math.random() * 2 - 1)),
      greenspace: Math.max(10, Math.min(50, baseGreenspace + Math.random() * 4 - 2)),
      waterQuality: Math.max(40, Math.min(100, baseWaterQuality + Math.random() * 8 - 4)),
    });
  }
  return years;
};

const DataDownloadTab = ({ city }: DataDownloadTabProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const historicalData = generateHistoricalData();

  const reportSections = [
    {
      title: "City Overview",
      content: [
        { label: "City Name", value: city.name },
        { label: "Country", value: city.country },
        { label: "Location", value: `${city.latitude.toFixed(4)}°N, ${city.longitude.toFixed(4)}°E` },
        { label: "Population", value: city.population ? `${(city.population / 1000000).toFixed(1)}M` : "N/A" },
      ],
    },
    {
      title: "Environmental Summary",
      content: [
        { label: "Air Quality Index", value: "Good (45)" },
        { label: "Green Space Coverage", value: "23%" },
        { label: "Average Temperature", value: "22°C" },
        { label: "Water Quality Index", value: "Good (78)" },
      ],
    },
    {
      title: "Urban Development",
      content: [
        { label: "Built-up Area", value: "65%" },
        { label: "Green Spaces", value: "23%" },
        { label: "Water Bodies", value: "8%" },
        { label: "Other", value: "4%" },
      ],
    },
    {
      title: "Environmental Challenges",
      content: [
        { label: "Heat Island Effect", value: "Moderate" },
        { label: "Air Pollution Level", value: "Low" },
        { label: "Water Stress Level", value: "Medium" },
        { label: "Vegetation Loss", value: "Low" },
      ],
    },
  ];

  const generatePDF = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);

    try {
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;

      // Add title
      pdf.setFontSize(20);
      pdf.text(`${city.name} Environmental Report`, pageWidth / 2, 20, { align: 'center' });

      // Convert sections one by one
      let currentY = 40;
      let pageNumber = 1;

      const addNewPage = () => {
        pdf.addPage();
        pageNumber++;
        currentY = 20;
        return currentY;
      };

      // Function to add section content
      const addSection = async (element: HTMLElement) => {
        const canvas = await html2canvas(element, {
          scale: 2,
          logging: false,
          useCORS: true,
        });

        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if we need a new page
        if (currentY + imgHeight > pageHeight - 30) {
          currentY = addNewPage();
        }

        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          margin,
          currentY,
          imgWidth,
          imgHeight
        );

        currentY += imgHeight + 10;
      };

      // Process each card section
      const sections = reportRef.current.querySelectorAll('.glass-card, .p-6');
      for (let i = 0; i < sections.length; i++) {
        await addSection(sections[i] as HTMLElement);
      }

      // Add page numbers and generation date to all pages
      for (let i = 1; i <= pageNumber; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(
          `Page ${i} of ${pageNumber}`,
          pageWidth / 2,
          pageHeight - 20,
          { align: 'center' }
        );
        pdf.text(
          `Generated on ${new Date().toLocaleDateString()}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      pdf.save(`${city.name.toLowerCase()}-environmental-report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">City Environmental Report</h2>
            <p className="text-muted-foreground">
              Download a comprehensive environmental report for {city.name}, {city.country}
            </p>
          </div>
          <Button
            size="lg"
            className="ml-4"
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? "Generating PDF..." : "Download Full Report"}
          </Button>
        </div>

        {/* Report Preview */}
        <div ref={reportRef} className="space-y-6">
          {reportSections.map((section) => (
            <Card key={section.title} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {section.content.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Historical Data Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Historical Trends (2000-2025)</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="airQuality"
                    stroke="#3b82f6"
                    name="Air Quality Index"
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    name="Temperature (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="greenspace"
                    stroke="#22c55e"
                    name="Green Space (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="waterQuality"
                    stroke="#06b6d4"
                    name="Water Quality Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Key Findings</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Air quality has improved by {(historicalData[historicalData.length - 1].airQuality - historicalData[0].airQuality).toFixed(1)} points since 2000</li>
                  <li>Temperature increased by {(historicalData[historicalData.length - 1].temperature - historicalData[0].temperature).toFixed(1)}°C</li>
                  <li>Green space coverage reduced by {(historicalData[0].greenspace - historicalData[historicalData.length - 1].greenspace).toFixed(1)}%</li>
                  <li>Water quality fluctuated but shows overall {historicalData[historicalData.length - 1].waterQuality > historicalData[0].waterQuality ? 'improvement' : 'decline'}</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Future Projections</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Expected continued improvement in air quality</li>
                  <li>Temperature rise likely to continue</li>
                  <li>Green space initiatives planned</li>
                  <li>Water quality management programs in progress</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 p-4 glass-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileDown className="w-4 h-4" />
            <p>
              This report includes comprehensive environmental data, urban metrics, and analysis
              for {city.name}. The PDF download preserves all visualizations and data in high quality.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataDownloadTab;