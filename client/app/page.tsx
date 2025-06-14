import React from 'react';
import { Users, BookOpen, BarChart3, Shield, CheckCircle, ChevronRight, Menu, Phone, Mail, MapPin, Star, Calendar, GraduationCap, UserCheck, FileText, Settings, TrendingUp } from 'lucide-react';
import TopNavBar from '@/components/common/Landing/top_nav'
import HeroSection from '@/components/common/Landing/hero_section';
import HomeFooter from '@/components/common/Landing/footer';


const ESchoolLanding = () => {
  const features = [
    {
      id: 1,
      title: "Student Information System",
      description: "Complete student data management with enrollment, attendance, and academic records",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Academic Management",
      description: "Streamline curriculum, timetables, exam schedules, and grade management",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Financial Management",
      description: "Handle fees, payments, invoicing, and financial reporting with ease",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Communication Portal",
      description: "Connect teachers, students, and parents through integrated messaging",
      icon: <Mail className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Staff Management",
      description: "Manage teacher profiles, schedules, payroll, and performance tracking",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 6,
      title: "Reports & Analytics",
      description: "Generate comprehensive reports and insights for data-driven decisions",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const benefits = [
    { title: "Reduce Administrative Workload", description: "Automate routine tasks and paperwork", icon: <FileText className="w-6 h-6" /> },
    { title: "Improve Communication", description: "Better parent-teacher-student connectivity", icon: <Mail className="w-6 h-6" /> },
    { title: "Enhanced Security", description: "Secure data management and access control", icon: <Shield className="w-6 h-6" /> },
    { title: "Real-time Monitoring", description: "Track student progress and attendance instantly", icon: <BarChart3 className="w-6 h-6" /> },
    { title: "Cost Effective", description: "Reduce operational costs and increase efficiency", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "24/7 Accessibility", description: "Access your school data anytime, anywhere", icon: <Settings className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal, Greenwood High School",
      content: "ESchool has transformed how we manage our institution. Administrative tasks that used to take hours now take minutes.",
      rating: 5,
      image: "/images/avatar1.jpg",
      school: "Greenwood High School",
      students: "1,200+ students"
    },
    {
      name: "Michael Chen",
      position: "Administrator, Sunrise Academy",
      content: "The comprehensive reporting features have given us insights we never had before. Highly recommended!",
      rating: 5,
      image: "/images/avatar3.jpg",
      school: "Sunrise Academy",
      students: "800+ students"
    },
    {
      name: "Emily Rodriguez",
      position: "Director, St. Mary's College",
      content: "Our teachers and parents love the communication features. It's made collaboration so much easier.",
      rating: 5,
      image: "/images/avatar2.jpg",
      school: "St. Mary's College",
      students: "2,000+ students"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <TopNavBar/>

      {/* Hero Section */}
      <HeroSection/>
      
      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Educational Institutions Worldwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of schools that have transformed their administration with ESchool
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-gray-600 font-medium">Schools Using ESchool</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">250K+</div>
              <div className="text-gray-600 font-medium">Students Managed</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">15K+</div>
              <div className="text-gray-600 font-medium">Teachers & Staff</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-gray-600 font-medium">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive School Management Features</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Everything you need to run your educational institution efficiently in one integrated platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl my-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose ESchool?</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Transform your institution with modern technology and streamlined processes
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What School Leaders Say</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Hear from principals and administrators who have transformed their institutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-start space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.school}</p>
                  <p className="text-xs text-gray-500 mt-1">{testimonial.students}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your School?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of schools that have already modernized their administration with ESchool
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-bold text-lg">
              Schedule Demo
            </button>
          </div>
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Full support included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default ESchoolLanding;