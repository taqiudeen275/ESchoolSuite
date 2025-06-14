import React from 'react';
import { 
  Phone,
  CheckCircle,
  Calendar
} from 'lucide-react';

const HeroSection = () => {
  return (
     <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              SCHOOL MANAGEMENT SYSTEM
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Institution</span>
              <br />
              Effortlessly
            </h1>
            <p className="text-gray-600 text-xl mb-8 max-w-lg leading-relaxed">
              Comprehensive school management system designed to streamline administrative tasks, enhance communication, and improve educational outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg">
                Start Free Trial
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <span>Schedule Demo</span>
              </button>
            </div>
            <div className="flex items-center space-x-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free 30-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No setup fees</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl relative overflow-hidden shadow-2xl">
              <img 
                src="/images/dashboard.webp" 
                alt="School management dashboard" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">1,247 Students Online</span>
                </div>
              </div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-600">Attendance Rate</div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold">24 Exams Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;