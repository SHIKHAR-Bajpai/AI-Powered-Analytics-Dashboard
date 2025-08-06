export const metricsData = {
  revenue: {
    value: '$2,847,392',
    change: '+12.5%',
    trend: 'up',
    icon: 'dollar-sign',
    color: 'success'
  },
  users: {
    value: '1,234,567',
    change: '+8.2%',
    trend: 'up',
    icon: 'users',
    color: 'primary'
  },
  conversions: {
    value: '45,678',
    change: '+15.3%',
    trend: 'up',
    icon: 'target',
    color: 'warning'
  },
  growth: {
    value: '23.4%',
    change: '+2.1%',
    trend: 'up',
    icon: 'trending-up',
    color: 'success'
  }
};

export const revenueData = [
  { month: 'Jan', revenue: 180000, target: 200000 },
  { month: 'Feb', revenue: 220000, target: 200000 },
  { month: 'Mar', revenue: 190000, target: 200000 },
  { month: 'Apr', revenue: 240000, target: 200000 },
  { month: 'May', revenue: 280000, target: 200000 },
  { month: 'Jun', revenue: 320000, target: 200000 },
  { month: 'Jul', revenue: 350000, target: 200000 },
  { month: 'Aug', revenue: 380000, target: 200000 },
  { month: 'Sep', revenue: 420000, target: 200000 },
  { month: 'Oct', revenue: 450000, target: 200000 },
  { month: 'Nov', revenue: 480000, target: 200000 },
  { month: 'Dec', revenue: 520000, target: 200000 }
];

export const userGrowthData = [
  { month: 'Jan', users: 850000, newUsers: 45000 },
  { month: 'Feb', users: 920000, newUsers: 52000 },
  { month: 'Mar', users: 980000, newUsers: 48000 },
  { month: 'Apr', users: 1050000, newUsers: 55000 },
  { month: 'May', users: 1120000, newUsers: 58000 },
  { month: 'Jun', users: 1180000, newUsers: 62000 },
  { month: 'Jul', users: 1240000, newUsers: 65000 },
  { month: 'Aug', users: 1290000, newUsers: 68000 },
  { month: 'Sep', users: 1350000, newUsers: 72000 },
  { month: 'Oct', users: 1400000, newUsers: 75000 },
  { month: 'Nov', users: 1450000, newUsers: 78000 },
  { month: 'Dec', users: 1500000, newUsers: 82000 }
];

export const conversionData = [
  { name: 'Organic Search', value: 45, color: '#3b82f6' },
  { name: 'Direct Traffic', value: 25, color: '#10b981' },
  { name: 'Social Media', value: 15, color: '#f59e0b' },
  { name: 'Email Marketing', value: 10, color: '#8b5cf6' },
  { name: 'Referral', value: 5, color: '#ef4444' }
];

export const campaignPerformance = [
  { name: 'Summer Sale', impressions: 1250000, clicks: 89000, conversions: 12300, ctr: 7.12, cpc: 2.45 },
  { name: 'Black Friday', impressions: 2100000, clicks: 156000, conversions: 23400, ctr: 7.43, cpc: 1.89 },
  { name: 'Holiday Special', impressions: 1800000, clicks: 134000, conversions: 18900, ctr: 7.44, cpc: 2.12 },
  { name: 'New Year', impressions: 950000, clicks: 67000, conversions: 8900, ctr: 7.05, cpc: 2.78 },
  { name: 'Spring Collection', impressions: 1450000, clicks: 102000, conversions: 14500, ctr: 7.03, cpc: 2.34 },
  { name: 'Back to School', impressions: 1650000, clicks: 118000, conversions: 16700, ctr: 7.15, cpc: 2.01 },
  { name: 'Winter Clearance', impressions: 1350000, clicks: 95000, conversions: 13200, ctr: 7.04, cpc: 2.67 },
  { name: 'Easter Special', impressions: 1100000, clicks: 78000, conversions: 10900, ctr: 7.09, cpc: 2.89 }
];

export const topProducts = [
  { name: 'Premium Widget Pro', sales: 15420, revenue: 462600, growth: '+23.5%' },
  { name: 'Smart Gadget X', sales: 12850, revenue: 385500, growth: '+18.2%' },
  { name: 'Eco-Friendly Kit', sales: 11230, revenue: 336900, growth: '+15.7%' },
  { name: 'Tech Bundle Plus', sales: 9870, revenue: 296100, growth: '+12.4%' },
  { name: 'Lifestyle Pack', sales: 8540, revenue: 256200, growth: '+9.8%' },
  { name: 'Professional Suite', sales: 7230, revenue: 216900, growth: '+7.3%' },
  { name: 'Starter Package', sales: 6120, revenue: 183600, growth: '+5.1%' },
  { name: 'Premium Add-on', sales: 5340, revenue: 160200, growth: '+3.9%' }
];

export const recentActivity = [
  { id: 1, type: 'sale', message: 'New sale recorded for Premium Widget Pro', amount: '$2,450', time: '2 minutes ago', status: 'completed' },
  { id: 2, type: 'user', message: 'New user registration: john.doe@email.com', amount: null, time: '5 minutes ago', status: 'completed' },
  { id: 3, type: 'campaign', message: 'Campaign "Summer Sale" reached 1M impressions', amount: null, time: '12 minutes ago', status: 'completed' },
  { id: 4, type: 'conversion', message: 'Conversion rate improved by 2.3%', amount: null, time: '18 minutes ago', status: 'completed' },
  { id: 5, type: 'alert', message: 'Server response time increased', amount: null, time: '25 minutes ago', status: 'warning' },
  { id: 6, type: 'sale', message: 'Bulk order processed for Tech Bundle Plus', amount: '$12,800', time: '32 minutes ago', status: 'completed' },
  { id: 7, type: 'user', message: 'User feedback received for Smart Gadget X', amount: null, time: '45 minutes ago', status: 'completed' },
  { id: 8, type: 'campaign', message: 'Campaign budget adjusted for Black Friday', amount: null, time: '1 hour ago', status: 'completed' }
];

export const geographicData = [
  { country: 'United States', users: 450000, revenue: 1200000, growth: '+15.2%' },
  { country: 'United Kingdom', users: 180000, revenue: 480000, growth: '+12.8%' },
  { country: 'Germany', users: 150000, revenue: 420000, growth: '+11.5%' },
  { country: 'Canada', users: 120000, revenue: 320000, growth: '+13.7%' },
  { country: 'Australia', users: 95000, revenue: 280000, growth: '+10.9%' },
  { country: 'France', users: 85000, revenue: 240000, growth: '+9.8%' },
  { country: 'Japan', users: 75000, revenue: 220000, growth: '+8.5%' },
  { country: 'Brazil', users: 65000, revenue: 180000, growth: '+14.3%' }
];

export const deviceData = [
  { device: 'Desktop', users: 650000, percentage: 52.3 },
  { device: 'Mobile', users: 450000, percentage: 36.2 },
  { device: 'Tablet', users: 145000, percentage: 11.5 }
];

export const timeSeriesData = [
  { time: '00:00', users: 45000, sales: 120, revenue: 36000 },
  { time: '02:00', users: 38000, sales: 95, revenue: 28500 },
  { time: '04:00', users: 32000, sales: 78, revenue: 23400 },
  { time: '06:00', users: 41000, sales: 105, revenue: 31500 },
  { time: '08:00', users: 68000, sales: 180, revenue: 54000 },
  { time: '10:00', users: 89000, sales: 245, revenue: 73500 },
  { time: '12:00', users: 95000, sales: 280, revenue: 84000 },
  { time: '14:00', users: 92000, sales: 265, revenue: 79500 },
  { time: '16:00', users: 88000, sales: 240, revenue: 72000 },
  { time: '18:00', users: 82000, sales: 220, revenue: 66000 },
  { time: '20:00', users: 75000, sales: 195, revenue: 58500 },
  { time: '22:00', users: 58000, sales: 150, revenue: 45000 }
]; 