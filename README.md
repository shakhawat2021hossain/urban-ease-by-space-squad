# 🌍 Urban Ease – Sustainable City Insights Dashboard  

Urban Ease is an interactive web-based dashboard built for the **NASA Space Apps Challenge 2025** under the challenge **“Data Pathways to Healthy Cities and Human Settlements.”**  

It empowers **urban planners, researchers, and citizens** to explore environmental and urban sustainability data of cities using **NASA Earth observation data** and open data sources.  
By visualizing metrics like **air quality, vegetation health, water quality, and temperature trends**, Urban Ease enables smarter decisions for building healthier, more sustainable cities.  

---

## 🚀 Live Demo  
🔗 [Urban Ease Dashboard](https://urban-ease-by-space-squad.vercel.app/)  

---

## ❓ Problem  

Urban areas face challenges like **air pollution, heat islands, flooding, and vegetation loss**.  
Urban planners often struggle with **fragmented or inaccessible environmental data**, making it harder to design sustainable cities that protect both **people and ecosystems**.  

---

## 💡 Our Solution  

Urban Ease aggregates **NASA Earth observation data** into a **single, interactive dashboard**, providing:  
- 📊 **Visualizations** of environmental indicators.  
- 🌱 **Comparison against WHO thresholds** for public health.  
- 🏙️ **City-level insights** for urban planning decisions.  
- 👥 **Community reports** to crowdsource sustainability issues.  

This enables **data-driven strategies** for sustainable city growth while ensuring the **wellbeing of citizens and the environment**.  

---

## 🌐 NASA Data Pathways  

This project directly addresses the challenge **“Data Pathways to Healthy Cities and Human Settlements.”**  
We integrate **NASA Earth observation datasets** and open data APIs to monitor and visualize urban sustainability indicators:  

- **Air Quality** → NASA Atmospheric Composition data (PM2.5, PM10, pollutants).  
- **Vegetation Health** → MODIS NDVI (Normalized Difference Vegetation Index).  
- **Water Quality & Flooding** → NDWI (Normalized Difference Water Index), LSWI.  
- **Temperature & Heat Islands** → NASA Land Surface Temperature datasets.  

These pathways provide **urban planners** with actionable data for making informed, sustainable policy decisions.  

---

## ✨ Features  

✅ **City Search & Insights** – Explore environmental indicators of any city.  
✅ **Air Quality, Temperature, Vegetation & Water Quality** – Real-time visualizations.  
✅ **Historical Trends** – Interactive charts (2000–2025).  
✅ **WHO Threshold Analysis** – Compare against health standards.  
✅ **Report Submission Modal** – Citizens report sustainability issues.  
✅ **Powered by NASA Earth Data** – Authentic environmental insights.  
✅ **Responsive UI** – Built with React + Tailwind + Shadcn UI.  

---

## 🛠️ Tech Stack  

**Frontend**  
- ⚛️ React (with TypeScript)  
- 🎨 Tailwind CSS + Shadcn UI  
- 📊 Recharts (data visualization)  
- 🎭 Framer Motion (animations)  

**Data & APIs**  
- 🛰️ NASA Earthdata APIs  
- 🌍 OpenStreetMap (city geocoding)  
- 📡 Environmental sustainability datasets  

---

## 📂 Project Structure  

```bash
urban-ease/
│── src/
│   ├── app/             # App Router (if using Next.js)
│   ├── components/      # UI components (Search, Charts, Cards, Modal)
│   ├── pages/           # Landing & Dashboard pages
│   ├── lib/             # Utility functions & API helpers
│── public/              # Static assets (logo, images)
│── package.json         # Dependencies
│── README.md            # Project documentation
```

---


## 📌 Future Improvements  

- 🔐 **Authentication for report submission**  
- 🗺️ **Interactive Map view for reports** (Leaflet/Mapbox)  
- 📊 **More climate & urban planning metrics**  
- ☁️ **Backend integration with MongoDB/Postgres**  

---

## ❤️ Acknowledgements  

- 🌍 [NASA Earth Data](https://earthdata.nasa.gov/)  
- 🌤️ [Open-Meteo](https://open-meteo.com/)  
- 🗺️ [OpenStreetMap / Nominatim](https://nominatim.openstreetmap.org/)  
- 📊 [Recharts](https://recharts.org/)  
- 🎨 [Shadcn/UI](https://ui.shadcn.com/)

---

## n8n Work Flow for community Engagement
<img width="1639" height="547" alt="Screenshot 2025-10-01 191605" src="https://github.com/user-attachments/assets/f36f09f5-ca10-407a-bcc4-72dcccc1eadb" />

---

## Figma Design Prototype

🔗 [View On Figma](https://www.figma.com/proto/9XMx5o3sHCqraZvsnxllG7/Community-app?node-id=58-1547&p=f&t=y1Lo5Poc74zpsusg-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=12%3A12) 

---

## 👩‍🚀 Team – Space Squad

- A.M. Saadnan Tahsin (Team Lead)
- Najmus Shakif Ayaan (Data Analyst)
- Sania Shahriar (Researcher)
- Sadia Mubashira (UI/UX Designer)
- Mohammad Raihan Samee (AI Expert)
- Shakhawat Hossain (Web Developer)

--- 

## 🖥️ Local Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shakhawat2021hossain/urban-ease-by-space-squad.git
cd urban-ease-by-space-squad
```
### 2️⃣ Install Dependencies
```bash
bun install
```
### 3️⃣ Start Development Server
```bash
bun run dev
```

