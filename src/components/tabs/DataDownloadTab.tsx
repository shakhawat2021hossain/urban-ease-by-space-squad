import { motion } from "framer-motion";
import { Download, FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CityData } from "@/pages/Landing";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DataDownloadTabProps {
  city: CityData;
}

const DataDownloadTab = ({ city }: DataDownloadTabProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

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
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(20);
      pdf.text(`${city.name} Environmental Report`, 105, 15, { align: 'center' });
      
      // Add image
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        10,
        25,
        imgWidth,
        imgHeight
      );

      // Add generation date
      pdf.setFontSize(10);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        105,
        pdf.internal.pageSize.height - 10,
        { align: 'center' }
      );

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