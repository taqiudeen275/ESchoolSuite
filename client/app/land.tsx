import React from 'react';
import { Star, Play, Users, BookOpen, Award, ChevronRight, Menu, Search } from 'lucide-react';

const ESchool = () => {
  const courses = [
    {
      id: 1,
      title: "Learn Figma to Develop Crea Beginner to Advanced",
      instructor: "Robert Fox",
      rating: 4.8,
      price: "$45.00",
      image: "/api/placeholder/300/200",
      category: "Design"
    },
    {
      id: 2,
      title: "Create a Digital Illustration With Illustrator",
      instructor: "Esther Howard",
      rating: 4.9,
      price: "$65.00",
      image: "/api/placeholder/300/200",
      category: "Design"
    },
    {
      id: 3,
      title: "Create a gaming stream with hit Game High Pixel",
      instructor: "Devon Lane",
      rating: 4.7,
      price: "$75.00",
      image: "/api/placeholder/300/200",
      category: "Gaming"
    },
    {
      id: 4,
      title: "Leadership and Management Courses",
      instructor: "Jane Cooper",
      rating: 4.8,
      price: "$55.00",
      image: "/api/placeholder/300/200",
      category: "Business"
    },
    {
      id: 5,
      title: "Create a Design System From Lia",
      instructor: "Annette Black",
      rating: 4.9,
      price: "$85.00",
      image: "/api/placeholder/300/200",
      category: "Design"
    },
    {
      id: 6,
      title: "Create a Digital Illustrate With Photoshop",
      instructor: "Wade Warren",
      rating: 4.6,
      price: "$95.00",
      image: "/api/placeholder/300/200",
      category: "Design"
    }
  ];

  const categories = [
    { name: "WordPress Development", courses: "25+ courses", icon: "💻" },
    { name: "Web Development", courses: "45+ courses", icon: "🌐" },
    { name: "App Development", courses: "35+ courses", icon: "📱" },
    { name: "Java Script", courses: "15+ courses", icon: "⚡" },
    { name: "UI & UX Design", courses: "25+ courses", icon: "🎨" },
    { name: "Graphics Manager", courses: "20+ courses", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-orange-500">DEVSKILL</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">About</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Courses</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Blog</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-500" />
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Sign In
          </button>
          <Menu className="w-6 h-6 md:hidden" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ONLINE COURSES
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Learning
              <br />
              Deeper & More
              <br />
              <span className="text-orange-500">-Amazing</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Smart learning is an educational method that aims to help students study more efficiently and effectively.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-teal-500 text-white px-8 py-4 rounded-full hover:bg-teal-600 transition-colors font-medium">
                Join For Free
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Video</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-teal-400 to-orange-400 rounded-2xl relative overflow-hidden">
              <img 
                src="/images/female-student.webp" 
                alt="Happy student" 
                className="absolute bottom-0 right-0 w-80  object-cover"
              />
              <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Live Teaching</span>
                </div>
              </div>
              <div className="absolute top-16 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are passionate about empowering learners Worldwide with high-quality, accessible & engaging education. Our mission offering a diverse range of courses.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
            <div className="text-gray-600">Years of Language Learning Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">56K</div>
            <div className="text-gray-600">Active Students Enrolled in the Last 5 Years</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">170+</div>
            <div className="text-gray-600">Professional Instructors Around the World</div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Course</h2>
            <p className="text-gray-600">All Categories</p>
          </div>
          <div className="flex items-center space-x-2 text-orange-500">
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="/api/placeholder/32/32" 
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">{course.price}</span>
                  <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors">
            View More
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choice Favourite Course from top category</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-6">{category.courses}</p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            All Category
          </button>
        </div>
      </section>

      {/* Growth Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/400/300" 
                alt="Professional instructor"
                className="w-full rounded-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">5.0</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Growth Skill With <span className="text-orange-500">Devskill</span> Academy & Accelerate to your Better future
              </h2>
              <p className="text-gray-600 mb-8">
                Completely provide access to professional scenrios strategically technology. Rather than providing access to client experiences.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25K+</div>
                  <div className="text-gray-600 text-sm">Students Community</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">756+</div>
                  <div className="text-gray-600 text-sm">Skilled Instructors</div>
                </div>
              </div>
              <button className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          See why We're rated <span className="text-orange-500">#1 in</span>
          <br />
          Online <span className="text-teal-500">Platform tech</span>
        </h2>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <img src="/api/placeholder/120/40" alt="Clutch" className="h-10" />
          <div className="text-center">
            <p className="text-gray-600">
              Our dynamic educational laders offers you the tools and resources to prepare yourself to make a meaningful impact on the economy in a supportive community.
            </p>
            <div className="flex justify-center space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Shared from <strong>Clutch Review</strong></p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            "How do I get started with your website?",
            "What support methods do you accept?",
            "Is there a free trial available?",
            "Is technical support available?",
            "Can I track my shipments?",
            "Is only device add my account?"
          ].map((question, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{question}</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">What You Looking for?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Distinctively provide access to professional scenarios rather than client experiences. Dramatically optimize.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-yellow-100 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Are You Ready To Start Your Course?</h3>
            <p className="text-gray-600 mb-6">
              Dramatically optimize professional competitive theme vis-a-vis the best practice.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
              Browse Course
            </button>
          </div>
          
          <div className="bg-teal-500 rounded-2xl p-8 text-center text-white">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-4">Are You Ready To Start Your Course?</h3>
            <p className="text-teal-100 mb-6">
              Dramatically optimize professional competitive theme vis-a-vis the best practice.
            </p>
            <button className="bg-white text-teal-500 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Apply As Instructor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-4">DEVSKILL</div>
              <p className="text-gray-600 mb-6">
                Dramatically optimize professional competitive theme rather than client experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
                <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Company Info</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-500">About DevSkill</a></li>
                <li><a href="#" className="hover:text-orange-500">Affiliate</a></li>
                <li><a href="#" className="hover:text-orange-500">Fashion Benefit</a></li>
                <li><a href="#" className="hover:text-orange-500">Career</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Help Center</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-500">DevSkill Support</a></li>
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Download our app</h3>
              <p className="text-gray-600 mb-4">Download our App and get the discount code!</p>
              <div className="space-y-2">
                <img src="/api/placeholder/150/45" alt="Download on App Store" className="h-11" />
                <img src="/api/placeholder/150/45" alt="Get it on Google Play" className="h-11" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600">© 2024 Dev Skill. All rights reserved</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 hover:text-orange-500">Privacy & Policy</a>
                <a href="#" className="text-gray-600 hover:text-orange-500">Terms & Condition</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ESchool;