import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy static reports data with text-based location
const initialReports = [
    {
        id: 1,
        title: "Air pollution near market area",
        type: "Air Quality",
        description: "Heavy vehicle smoke is causing health issues.",
        date: "2025-09-30",
        city: "Dhaka",
        location: "Banani, Dhaka",
    },
    {
        id: 2,
        title: "Flooding after rainfall",
        type: "Water & Flood",
        description: "Roads submerged after heavy rain, drainage blocked.",
        date: "2025-09-28",
        city: "Chattogram",
        location: "Pahartali, Chattogram",
    },
    {
        id: 3,
        title: "Lack of green spaces",
        type: "Greenspace",
        description: "New construction reduced park space drastically.",
        date: "2025-09-25",
        city: "Khulna",
        location: "Sonadanga, Khulna",
    },
    {
        id: 4,
        title: "Traffic congestion downtown",
        type: "Traffic",
        description: "Peak hours congestion causing delays.",
        date: "2025-09-22",
        city: "Dhaka",
        location: "Motijheel, Dhaka",
    },
];

const issueTypes = ["All", "Air Quality", "Water & Flood", "Greenspace", "Traffic", "Other"];

const Reports = () => {
    const [reports] = useState(initialReports);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    // Filter + search logic
    const filteredReports = reports.filter((report) => {
        const matchesSearch =
            report.title.toLowerCase().includes(search.toLowerCase()) ||
            report.description.toLowerCase().includes(search.toLowerCase()) ||
            report.city.toLowerCase().includes(search.toLowerCase()) ||
            report.location.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || report.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Home Icon */}
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate("/")}>
                <Home className="w-6 h-6 text-primary mr-2" />
                <span className="text-primary font-semibold">Back Home</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">Community Reports</h1>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by keyword, city, location, or description..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="p-2 rounded-md border"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    {issueTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reports List */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredReports.length === 0 ? (
                    <p className="text-muted-foreground col-span-full">No reports found.</p>
                ) : (
                    filteredReports.map((report) => (
                        <Card key={report.id} className="glass-card hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    {report.title}
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                                        {report.type}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    📍 {report.city} | 🏠 {report.location} | 🗓 {report.date}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default Reports;
