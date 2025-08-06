# 🚀 ADmyBRAND Analytics Dashboard

A modern, responsive analytics dashboard built with React, featuring real-time data visualization, advanced filtering, and beautiful UI design.

![Dashboard Preview](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)
![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF)

## ✨ Features

### 📊 **Core Dashboard Features**
- **Real-time Metrics Cards** - Revenue, Users, Conversions, Growth with live updates
- **Interactive Charts** - Area charts, Bar charts, and Pie charts using Recharts
- **Advanced Data Table** - Sortable, filterable, and paginated campaign performance
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices

### 🎨 **UI/UX Excellence**
- **Modern Design System** - Consistent colors, typography, and spacing
- **Dark/Light Mode Toggle** - Seamless theme switching
- **Smooth Animations** - Micro-interactions and loading states with Framer Motion
- **Beautiful Visual Hierarchy** - Clear information architecture

### ⚡ **Advanced Functionality**
- **Real-time Updates** - Simulated live data updates every 5 seconds
- **Comprehensive Search** - Multi-field search across all data
- **Advanced Filtering** - Date ranges, performance status, and impression ranges
- **Export Functionality** - CSV and PDF export capabilities
- **Loading Skeletons** - Beautiful loading states for better UX

### 🔧 **Technical Implementation**
- **React 18** with modern hooks and functional components
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Lucide React** for beautiful icons
- **Vite** for fast development and building


## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shikhar-Bajpai/ai-analytics-dashboard.git
   cd ai-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
ai-analytics-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard component
│   │   ├── Header.jsx         # Header with search and filters
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   └── App.jsx           # Main app component
│   ├── data/
│   │   └── mockData.js       # Sample data for charts and tables
│   ├── index.css             # Global styles and Tailwind imports
│   └── main.jsx             # App entry point
├── index.html
├── package.json
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md
```

## 🎯 Key Features Breakdown

### **Real-time Analytics**
- Live updating metrics cards with simulated data
- Smooth animations for data changes
- Last updated timestamps

### **Advanced Data Visualization**
- **Revenue Trends** - Area chart with target line
- **User Growth** - Bar chart with multiple data series
- **Conversion Sources** - Pie chart with interactive legend

### **Smart Filtering System**
- **Multi-field Search** - Search across campaign names, metrics, and values
- **Date Range Filtering** - Filter campaigns by date ranges
- **Performance Status** - Filter by CTR performance levels
- **Impression Ranges** - Filter by minimum/maximum impressions

### **Interactive Data Table**
- **Sortable Columns** - Click headers to sort by any metric
- **Pagination** - Navigate through large datasets
- **Action Buttons** - View, edit, and delete operations
- **Responsive Design** - Works perfectly on all screen sizes

### **Export Functionality**
- **CSV Export** - Download campaign data as CSV
- **PDF Export** - Generate HTML reports (simulated PDF)
- **Loading States** - Visual feedback during export operations

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue (#3b82f6) for main actions and highlights
- **Secondary**: Gray scale for text and backgrounds
- **Success**: Green (#10b981) for positive metrics
- **Warning**: Yellow (#f59e0b) for alerts
- **Danger**: Red (#ef4444) for negative metrics

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Scales appropriately across devices

### **Spacing System**
- **8px Grid**: Consistent spacing throughout
- **Responsive Padding**: Adapts to screen size
- **Card Spacing**: 24px between major sections

## 🔧 Customization

### **Adding New Charts**
1. Import chart components from Recharts
2. Add data to `mockData.js`
3. Create new chart component in Dashboard.jsx

### **Modifying Colors**
1. Update color values in `tailwind.config.js`
2. Modify CSS custom properties in `index.css`

### **Adding New Filters**
1. Add state variables for new filters
2. Update filtering logic in Dashboard.jsx
3. Add UI components to filter panel


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 🙏 Acknowledgments

- **Recharts** for beautiful data visualization
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling


**Built with ❤️ using AI-assisted development**
