# 🌍 Urban Ease – Sustainable City Insights Dashboard  

Urban Ease is an interactive web-based dashboard built for the **NASA Space Apps Challenge**.  
It empowers users, urban planners, and researchers to explore environmental and urban sustainability data of cities using **NASA Earthdata APIs** and open data sources.  

The platform helps users visualize and analyze metrics like **air quality, vegetation health, water quality, and temperature trends** to make informed decisions for building healthier, sustainable cities.  

---

## Live: https://urban-ease-by-space-squad.vercel.app/

---

## 🚀 Features  

✅ **City Search & Insights** – Search any city and explore its environmental indicators.  
✅ **Air Quality, Temperature, Vegetation & Water Quality** – Real-time data visualizations.  
✅ **Historical Trends** – Interactive timeline slider with trend charts (2000–2025).  
✅ **WHO Threshold Analysis** – Compare city metrics against WHO guidelines.  
✅ **Report Submission** – Citizens can submit sustainability issues via a modal form.  
✅ **Powered by NASA Earth Data** – Direct links to NASA resources for deeper exploration.  
✅ **Responsive UI** – Built with **React + Tailwind + Shadcn UI** for a clean, modern design.  

---

## 🛠️ Tech Stack  

**Frontend**  
- ⚛️ React (with TypeScript)  
- 🎨 Tailwind CSS + Shadcn UI  
- 📊 Recharts (data visualizations)  
- 🎭 Framer Motion (animations)  

**Backend & Data**  
- 🌐 NASA Earthdata APIs  
- 🗺️ OpenStreetMap (for city geocoding)  
- 🛰️ Environmental & sustainability datasets  

---

## 📂 Project Structure  

```bash
urban-ease/
│── src/
│   ├── app/             # Next.js App Router (if used)
│   ├── components/      # UI components (Search, Cards, Charts, Modal)
│   ├── pages/           # Landing & Dashboard pages
│   ├── lib/             # Utility functions & API helpers
│── public/              # Static assets (logo, images)
│── package.json         # Dependencies
│── README.md            # Project documentation
