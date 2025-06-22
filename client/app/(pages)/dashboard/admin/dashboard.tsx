'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  Lock,
  FileText,
  Users,
  MessageCircle,
  DollarSign,
  Settings,
  Search,
  Plus,
  Calendar,
  ExternalLink,
  TrendingUp,
  ArrowRight,
  Github,
  MonitorPlay,
  Video,
  Clock,
  Bell,
  Mail,
  HelpCircle
} from 'lucide-react';

// Layout Component
const DashboardLayout = ({ children }) => {
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState<string | null>(null);

  const sidebarItems = [
    { icon: LayoutDashboard, name: 'Dashboard', active: true },
    { icon: FileText, name: 'Documents' },
    { icon: Lock, name: 'Security' },
    { icon: FileText, name: 'Reports' },
    { icon: CheckSquare, name: 'Tasks' },
    { icon: DollarSign, name: 'Finance' },
    { icon: MessageCircle, name: 'Messages' },
    { icon: Users, name: 'Team' },
    { icon: Clock, name: 'Time Tracking' },
    { icon: Settings, name: 'Settings' }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-blue-200 flex overflow-hidden relative">
      {/* Sidebar - Fixed */}
      <motion.div
        className="w-16 lg:w-20 bg-transparent backdrop-blur-md flex flex-col items-center py-6 relative z-50 flex-shrink-0"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-gray-800 mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          M<span className='text-primary'>ES</span>
        </motion.div>

        {/* Sidebar Items - Scrollable when needed */}
        <div className="flex flex-col space-y-4 relative flex-1">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative "
              onMouseEnter={() => setHoveredSidebarItem(item.name)}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`p-3 rounded-full cursor-pointer transition-colors duration-200 relative z-10 ${item.active
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white/60 hover:bg-white'
                  }`}
              >
                <item.icon size={20} />
              </div>
              {/* Tooltip Portal - Positioned absolutely to avoid clipping */}
              <AnimatePresence>
                {hoveredSidebarItem === item.name  && (
                  <motion.div
                    className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-[100]"

                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {hoveredSidebarItem}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed */}
        <Header />

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const [selectedTab, setSelectedTab] = useState('This Month');

  return (
    <motion.header
      className="bg-transparent backdrop-blur-md  px-6 py-4 flex items-center justify-between flex-shrink-0"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-full p-1">
          {['Today', 'This Week', 'This Month', 'Reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTab === tab
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Mail size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <HelpCircle size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Settings size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
            J
          </div>
          <div className="hidden lg:block">
            <div className="font-medium text-gray-900">John Smith</div>
            <div className="text-sm text-gray-600">Project manager</div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};



export default DashboardLayout;