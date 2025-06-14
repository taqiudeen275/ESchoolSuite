import React from 'react';
import { 
  Users, BookOpen, BarChart3, Shield, Mail, UserCheck, TrendingUp, 
  Calendar, GraduationCap, FileText, Settings, CreditCard, MessageSquare,
  Clock, Bell, Database, PhoneIcon, Globe, Lock, CheckCircle, Star
} from 'lucide-react';
import TopNavBar from '@/components/common/Landing/top_nav';
import HomeFooter from '@/components/common/Landing/footer';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      id: 1,
      title: "Student Information System",
      description: "Complete student lifecycle management from admission to graduation",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      features: [
        "Student enrollment and admission processing",
        "Academic records and transcript management", 
        "Attendance tracking and reporting",
        "Parent and guardian information management",
        "Medical records and emergency contacts",
        "Student photo and document storage"
      ]
    },
    {
      id: 2,
      title: "Academic Management",
      description: "Comprehensive curriculum and academic process management",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      features: [
        "Curriculum planning and course management",
        "Class scheduling and timetable generation",
        "Assignment and homework tracking",
        "Grade book and assessment tools",
        "Report card generation",
        "Academic calendar management"
      ]
    },
    {
      id: 3,
      title: "Financial Management",
      description: "Complete financial operations and fee management system",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      features: [
        "Fee structure setup and management",
        "Online payment processing",
        "Invoice generation and tracking",
        "Financial reporting and analytics",
        "Scholarship and discount management",
        "Budget planning and expense tracking"
      ]
    },
    {
      id: 4,
      title: "Communication Hub",
      description: "Integrated communication platform for all stakeholders",
      icon: <Mail className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      features: [
        "Parent-teacher messaging system",
        "Bulk SMS and email notifications",
        "Announcement broadcasting",
        "Event notifications and reminders",
        "Emergency alert system",
        "Mobile app notifications"
      ]
    },
    {
      id: 5,
      title: "Staff Management",
      description: "Human resource management for educational institutions",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
      features: [
        "Employee profiles and documentation",
        "Payroll processing and management",
        "Leave management system",
        "Performance evaluation tools",
        "Professional development tracking",
        "Staff scheduling and substitutions"
      ]
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "Data-driven insights for better decision making",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
      features: [
        "Academic performance analytics",
        "Attendance and behavior reports",
        "Financial performance dashboards",
        "Custom report builder",
        "Predictive analytics",
        "Export capabilities (PDF, Excel)"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Management",
      description: "Schedule and manage school events, meetings, and activities"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Examination System",
      description: "Online exams, question banks, and automated grading"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Management",
      description: "Secure storage and sharing of important documents"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "System Configuration",
      description: "Customizable settings for different school requirements"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Mobile App",
      description: "Native mobile apps for iOS and Android platforms"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Support for multiple languages and regional settings"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Role-Based Access",
      description: "Granular permissions and security controls"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Backup",
      description: "Automated backups and disaster recovery solutions"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Intelligent alerts and reminder system"
    }
  ];

  const benefits = [
    {
      title: "Time Savings",
      stat: "75%",
      description: "Reduction in administrative workload"
    },
    {
      title: "Cost Efficiency", 
      stat: "60%",
      description: "Lower operational costs"
    },
    {
      title: "User Satisfaction",
      stat: "95%",
      description: "Happy users across all roles"
    },
    {
      title: "Data Accuracy",
      stat: "99%",
      description: "Improved data quality and consistency"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavBar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Features for 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Modern Schools</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Everything your educational institution needs in one integrated platform. 
            Streamline operations, enhance communication, and improve outcomes.
          </p>
          
          {/* Benefits Stats */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                    {benefit.stat}
                  </div>
                  <div className="font-bold text-gray-900 mb-1">{benefit.title}</div>
                  <div className="text-sm text-gray-600">{benefit.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Modules</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Six powerful modules that cover every aspect of school management
          </p>
        </div>
        
        <div className="space-y-16">
          {mainFeatures.map((feature, index) => (
            <div key={feature.id} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">{feature.description}</p>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Key Features:</h4>
                  <div className="space-y-4">
                    {feature.features.map((featureItem, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{featureItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl my-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Features</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Enhanced functionality to support all aspects of your educational institution
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Seamless Integration</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              ESchool integrates with your existing tools and systems for a unified experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">LMS Integration</h3>
              <p className="text-sm text-gray-600">Connect with popular learning management systems</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Payment Gateways</h3>
              <p className="text-sm text-gray-600">Support for multiple payment processors</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Communication Tools</h3>
              <p className="text-sm text-gray-600">SMS, email, and messaging platform integrations</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Document Systems</h3>
              <p className="text-sm text-gray-600">Integration with cloud storage and document management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Enterprise-Grade Security</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Your data security is our top priority. ESchool implements industry-leading security 
              measures to protect sensitive student and institutional information.
            </p>
            <div className="space-y-4">
              {[
                "256-bit SSL encryption for all data transmission",
                "Role-based access control with granular permissions",
                "Regular security audits and compliance checks",
                "Automated backup and disaster recovery",
                "GDPR and FERPA compliance",
                "Multi-factor authentication support"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
         </div>
        </section>

        <HomeFooter />
    </div>
        )
}
export default FeaturesPage;