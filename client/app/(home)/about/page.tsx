import React from 'react';
import { Users, Target, Award, Globe, Heart, Lightbulb, Shield, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import TopNavBar from '@/components/common/Landing/top_nav';
import HomeFooter from '@/components/common/Landing/footer';

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student-Centered",
      description: "Every feature we build is designed with students' educational success as the primary goal.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously evolve our platform with cutting-edge technology and user feedback.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Privacy",
      description: "We maintain the highest standards of data protection and privacy for all users.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building strong connections between students, teachers, parents, and administrators.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "ESchool Founded",
      description: "Started with a vision to digitize school management systems",
      icon: <Target className="w-6 h-6" />
    },
    {
      year: "2019",
      title: "First 50 Schools",
      description: "Reached our first milestone of 50 partner schools",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "International Expansion",
      description: "Expanded services to schools across multiple countries",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "500+ Schools",
      description: "Celebrated serving over 500 educational institutions worldwide",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "AI Integration",
      description: "Launched AI-powered analytics and predictive insights",
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      position: "CEO & Co-Founder",
      education: "Former Principal, 15+ years in education",
      image: "/images/team1.jpg",
      bio: "Passionate about transforming education through technology"
    },
    {
      name: "David Chen",
      position: "CTO & Co-Founder", 
      education: "MIT Computer Science, EdTech Expert",
      image: "/images/team2.jpg",
      bio: "Building scalable solutions for modern education"
    },
    {
      name: "Maria Rodriguez",
      position: "Head of Product",
      education: "Stanford Education, UX Design Expert",
      image: "/images/team3.jpg",
      bio: "Designing intuitive experiences for educators"
    }
  ];

  const achievements = [
    { number: "500+", label: "Partner Schools", icon: <Users className="w-6 h-6" /> },
    { number: "250K+", label: "Students", icon: <Target className="w-6 h-6" /> },
    { number: "15K+", label: "Teachers", icon: <Award className="w-6 h-6" /> },
    { number: "25+", label: "Countries", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavBar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transforming Education Through 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Innovation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Founded by educators for educators, ESchool is on a mission to revolutionize school management 
            and create better learning environments for students worldwide.
          </p>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To empower educational institutions with innovative technology solutions that streamline 
              administration, enhance communication, and ultimately improve student outcomes. We believe 
              that when schools operate efficiently, educators can focus on what matters most: teaching 
              and inspiring students.
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed opacity-90">
              To be the global leader in educational technology, creating a world where every school 
              has access to powerful, intuitive tools that make education more effective, accessible, 
              and enjoyable for all stakeholders in the learning community.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            The principles that guide everything we do and shape our commitment to educational excellence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl my-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            From startup to global platform, see how we've grown alongside our partner schools
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Experienced educators and technologists working together to transform education
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
              <p className="text-sm text-gray-600 mb-4">{member.education}</p>
              <p className="text-gray-700 italic">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Be part of the educational transformation. Let's work together to create better learning environments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg">
              Partner With Us
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-bold text-lg">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default AboutPage;