import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Filter,
  Calendar,
  Search,
  RefreshCw,
  FileText,
  FileDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { metricsData, revenueData, userGrowthData, conversionData, campaignPerformance, topProducts, recentActivity } from '../data/mockData';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState('revenue');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [performanceRange, setPerformanceRange] = useState({ min: '', max: '' });
  const [realTimeData, setRealTimeData] = useState(metricsData);
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        revenue: {
          ...prev.revenue,
          value: `$${(Math.random() * 1000000 + 2000000).toLocaleString()}`
        },
        users: {
          ...prev.users,
          value: (Math.random() * 100000 + 1200000).toLocaleString()
        },
        conversions: {
          ...prev.conversions,
          value: (Math.random() * 10000 + 40000).toLocaleString()
        },
        growth: {
          ...prev.growth,
          value: `${(Math.random() * 10 + 20).toFixed(1)}%`
        }
      }));
      setLastUpdated(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredCampaigns = campaignPerformance.filter(campaign => {
    // Search functionality
    const matchesSearch = searchTerm === '' || 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.impressions.toString().includes(searchTerm) ||
      campaign.clicks.toString().includes(searchTerm) ||
      campaign.conversions.toString().includes(searchTerm) ||
      campaign.ctr.toString().includes(searchTerm) ||
      campaign.cpc.toString().includes(searchTerm);

    // Date range filtering
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      // Simulate date filtering based on campaign names
      const campaignDate = getCampaignDate(campaign.name);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = campaignDate >= startDate && campaignDate <= endDate;
    }

    // Status filtering
    let matchesStatus = true;
    if (filterStatus !== 'all') {
      const ctr = campaign.ctr;
      if (filterStatus === 'high') {
        matchesStatus = ctr >= 5.0;
      } else if (filterStatus === 'medium') {
        matchesStatus = ctr >= 2.0 && ctr < 5.0;
      } else if (filterStatus === 'low') {
        matchesStatus = ctr < 2.0;
      }
    }

    // Performance range filtering
    let matchesPerformance = true;
    if (performanceRange.min || performanceRange.max) {
      const impressions = campaign.impressions;
      const min = performanceRange.min ? parseInt(performanceRange.min) : 0;
      const max = performanceRange.max ? parseInt(performanceRange.max) : Infinity;
      matchesPerformance = impressions >= min && impressions <= max;
    }

    return matchesSearch && matchesDate && matchesStatus && matchesPerformance;
  });

  // Helper function to get campaign date based on name
  const getCampaignDate = (campaignName) => {
    const now = new Date();
    if (campaignName.includes('Summer')) {
      return new Date(now.getFullYear(), 5, 15); // June 15
    } else if (campaignName.includes('Black Friday')) {
      return new Date(now.getFullYear(), 10, 25); // November 25
    } else if (campaignName.includes('Holiday')) {
      return new Date(now.getFullYear(), 11, 15); // December 15
    } else if (campaignName.includes('Spring')) {
      return new Date(now.getFullYear(), 2, 20); // March 20
    } else if (campaignName.includes('Winter')) {
      return new Date(now.getFullYear(), 11, 1); // December 1
    }
    return new Date(now.getFullYear(), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  };

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    // Handle string sorting for campaign names
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // Handle numeric sorting
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const paginatedCampaigns = sortedCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  const exportToCSV = () => {
    setIsExportingCSV(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Campaign,Impressions,Clicks,Conversions,CTR,CPC\n" +
        campaignPerformance.map(campaign => 
          `${campaign.name},${campaign.impressions},${campaign.clicks},${campaign.conversions},${campaign.ctr},${campaign.cpc}`
        ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "campaign_performance.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExportingCSV(false);
    }, 1000);
  };

  const exportToPDF = () => {
    setIsExportingPDF(true);
    setTimeout(() => {
      // Create a simple PDF-like content
      const pdfContent = `
        <html>
          <head>
            <title>Analytics Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>ADmyBRAND Analytics Report</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="section">
              <h2>Campaign Performance</h2>
              <table>
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Conversions</th>
                    <th>CTR (%)</th>
                    <th>CPC ($)</th>
                  </tr>
                </thead>
                <tbody>
                  ${campaignPerformance.map(campaign => `
                    <tr>
                      <td>${campaign.name}</td>
                      <td>${campaign.impressions.toLocaleString()}</td>
                      <td>${campaign.clicks.toLocaleString()}</td>
                      <td>${campaign.conversions.toLocaleString()}</td>
                      <td>${campaign.ctr}%</td>
                      <td>$${campaign.cpc}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `;
      
      // Create a blob and download it
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'analytics_report.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsExportingPDF(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeletons */}
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-64 mb-2"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-96"></div>
            </div>
            <div className="h-10 bg-secondary-200 dark:bg-secondary-700 rounded w-32"></div>
          </div>

          {/* Metrics Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-8 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-16"></div>
                </div>
                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-24 mb-2"></div>
                <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-20"></div>
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[1, 2].map(i => (
              <div key={i} className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-32 mb-4"></div>
                <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
              <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-48"></div>
            </div>
            <div className="p-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center space-x-4 py-4">
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded flex-1"></div>
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-20"></div>
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-16"></div>
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-20"></div>
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
            Analytics Overview
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Monitor your key metrics and performance indicators
          </p>
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={exportToCSV}
            disabled={isExportingCSV || isExportingPDF}
            className="btn-secondary flex items-center space-x-2 text-sm"
          >
            {isExportingCSV ? <RefreshCw size={16} className="animate-spin" /> : <FileDown size={16} />}
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button 
            onClick={exportToPDF}
            disabled={isExportingCSV || isExportingPDF}
            className="btn-primary flex items-center space-x-2 text-sm"
          >
            {isExportingPDF ? <RefreshCw size={16} className="animate-spin" /> : <FileText size={16} />}
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Real-time Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {Object.entries(realTimeData).map(([key, metric]) => (
          <div key={key} className="metric-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                {key === 'revenue' && <DollarSign size={20} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />}
                {key === 'users' && <Users size={20} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />}
                {key === 'conversions' && <Target size={20} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />}
                {key === 'growth' && <TrendingUp size={20} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-secondary-600 dark:text-secondary-400 capitalize">
              {key}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
            Revenue Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
            User Growth
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="users" fill="#3b82f6" />
                <Bar dataKey="newUsers" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Conversion Sources Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
          Conversion Sources
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {conversionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-secondary-900 dark:text-white font-medium">{item.name}</span>
                </div>
                <span className="text-secondary-600 dark:text-secondary-400 font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Advanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Campaign Performance
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2 text-sm"
            >
              <Filter size={16} />
              <span>Filters</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary flex items-center space-x-2 text-sm"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Search Campaigns */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Search Campaigns
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns, impressions, clicks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="month"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="month"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Performance Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="high">High Performance (CTR 5% or higher)</option>
                  <option value="medium">Medium Performance (CTR 2-5%)</option>
                  <option value="low">Low Performance (CTR below 2%)</option>
                </select>
              </div>

              {/* Performance Range - Min */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Min Impressions
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={performanceRange.min}
                  onChange={(e) => setPerformanceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="input-field"
                />
              </div>

              {/* Performance Range - Max */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Max Impressions
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={performanceRange.max}
                  onChange={(e) => setPerformanceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="input-field"
                />
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDateRange({ start: '', end: '' });
                    setFilterStatus('all');
                    setPerformanceRange({ min: '', max: '' });
                  }}
                  className="btn-secondary w-full"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || dateRange.start || dateRange.end || filterStatus !== 'all' || performanceRange.min || performanceRange.max) && (
              <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-1 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {dateRange.start && dateRange.end && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200">
                      Date: {dateRange.start} to {dateRange.end}
                      <button
                        onClick={() => setDateRange({ start: '', end: '' })}
                        className="ml-1 hover:text-secondary-600 dark:hover:text-secondary-400"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filterStatus !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200">
                      Status: {filterStatus}
                      <button
                        onClick={() => setFilterStatus('all')}
                        className="ml-1 hover:text-success-600 dark:hover:text-success-400"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(performanceRange.min || performanceRange.max) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-200">
                      Range: {performanceRange.min || '0'} - {performanceRange.max || '∞'}
                      <button
                        onClick={() => setPerformanceRange({ min: '', max: '' })}
                        className="ml-1 hover:text-warning-600 dark:hover:text-warning-400"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="table-header cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Campaign</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header cursor-pointer" onClick={() => handleSort('impressions')}>
                  <div className="flex items-center space-x-1">
                    <span>Impressions</span>
                    {sortField === 'impressions' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header cursor-pointer" onClick={() => handleSort('clicks')}>
                  <div className="flex items-center space-x-1">
                    <span>Clicks</span>
                    {sortField === 'clicks' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header cursor-pointer" onClick={() => handleSort('conversions')}>
                  <div className="flex items-center space-x-1">
                    <span>Conversions</span>
                    {sortField === 'conversions' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header cursor-pointer" onClick={() => handleSort('ctr')}>
                  <div className="flex items-center space-x-1">
                    <span>CTR (%)</span>
                    {sortField === 'ctr' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header cursor-pointer" onClick={() => handleSort('cpc')}>
                  <div className="flex items-center space-x-1">
                    <span>CPC ($)</span>
                    {sortField === 'cpc' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="table-header">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCampaigns.map((campaign, index) => (
                <tr key={index} className="border-b border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
                  <td className="table-cell font-medium">{campaign.name}</td>
                  <td className="table-cell">{campaign.impressions.toLocaleString()}</td>
                  <td className="table-cell">{campaign.clicks.toLocaleString()}</td>
                  <td className="table-cell">{campaign.conversions.toLocaleString()}</td>
                  <td className="table-cell">{campaign.ctr}%</td>
                  <td className="table-cell">${campaign.cpc}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-secondary-600 dark:text-secondary-400 hover:text-warning-600 dark:hover:text-warning-400 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-secondary-600 dark:text-secondary-400 hover:text-danger-600 dark:hover:text-danger-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-secondary-200 dark:border-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-secondary-200 dark:border-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard; 