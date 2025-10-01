import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const issueTypes = ["Air Quality", "Water & Flood", "Greenspace", "Traffic", "Other"];

const SubmitReport = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(issueTypes[0]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !title || !description) {
      alert("Please fill all required fields.");
      return;
    }

    // Here you can send data to backend API later
    console.log({
      city,
      title,
      description,
      type,
      date: new Date().toISOString(),
    });

    setSuccessMessage("Report submitted successfully!");
    // Reset form
    setCity("");
    setTitle("");
    setDescription("");
    setType(issueTypes[0]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Submit a City Report</h1>

        <form onSubmit={handleSubmit} className="glass-card p-6 flex flex-col gap-4">
          {/* City Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">City Name</label>
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Issue Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Title</label>
            <Input
              placeholder="Enter issue title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Type</label>
            <Select onValueChange={setType} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2">
            Submit Report
          </Button>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-600 mt-2 text-center">{successMessage}</p>
          )}

          {/* Back Button */}
          <Button variant="secondary" onClick={() => navigate("/")} className="mt-2">
            Back to Home
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitReport;
