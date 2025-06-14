
"use client"
import React, { useState } from 'react';
import { 
  Check, X, Star, Users, BookOpen, BarChart3, Shield, 
  Zap, Crown, Building, Phone, Mail, CheckCircle, 
  Calculator, CreditCard, Globe, Headphones
} from 'lucide-react';
import TopNavBar from '@/components/common/Landing/top_nav';
import HomeFooter from '@/components/common/Landing/footer';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [studentCount, setStudentCount] = useState(500);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small schools getting started",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      monthlyPrice: 2,
      yearlyPrice: 20,
      maxStudents: 500,
      popular: false,
      features: {
        included: [
          "Student Information System",
          "Basic Academic Management", 
          "Attendance Tracking",
          "Parent Communication",
          "Basic Reports",
          "Email Support",
          "Mobile App Access",
          "Data Backup"
        ],
        excluded: [
          "Advanced Analytics",
          "Financial Management",
          "Staff Management",
          "Custom Reports",
          "API Access",
          "Priority Support"
        ]
      }
    },
    {
      name: "Professional",
      description: "Comprehensive solution for growing schools",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
      monthlyPrice: 4,
      yearlyPrice: 40,
      maxStudents: 2000,
      popular: true,
      features: {
        included: [
          "All Starter Features",
          "Advanced Academic Management",
          "Financial Management",
          "Staff Management",
          "Communication Hub",
          "Advanced Reports & Analytics",
          "Examination System",
          "Document Management",
          "Priority Email Support",
          "Phone Support",
          "Custom Branding"
        ],
        excluded: [
          "White Label Solution",
          "Dedicated Account Manager",
          "Custom Integrations",
          "On-premise Deployment"
        ]
      }
    },
    {
      name: "Enterprise",
      description: "Advanced features for large institutions",
      icon: <Building className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      monthlyPrice: 6,
      yearlyPrice: 60,
      maxStudents: "Unlimited",
      popular: false,
      features: {
        included: [
          "All Professional Features",
          "Unlimited Students",
          "White Label Solution",
          "Advanced Security & Compliance",
          "Custom Integrations",
          "API Access",
          "Dedicated Account Manager",
          "24/7 Priority Support",
          "On-premise Deployment Option",
          "Advanced Analytics & AI",
          "Multi-campus Management",
          "Custom Training"
        ],
        excluded: []
      }
    }
  ];

  const addOns = [
    {
      name: "SMS Package",
      description: "Send SMS notifications to parents and students",
      price: "$50/month",
      icon: <Phone className="w-6 h-6" />
    },
    {
      name: "Custom Development",
      description: "Custom features and integrations for your school",
      price: "Starting at $2,000",
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Data Migration",
      description: "Professional data migration from your current system",
      price: "$500 one-time",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      name: "Training & Onboarding",
      description: "Comprehensive staff training and system setup",
      price: "$1,000 one-time",
      icon: <Users className="w-6 h-6" />
    }
  ];

  const faq = [
    {
      question: "How is pricing calculated?",
      answer: "Pricing is based on the number of active students in your system. You only pay for students currently enrolled, and you can adjust your plan as your school grows or shrinks."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any differences."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for Starter and Professional plans. Enterprise plans include free setup and migration assistance as part of the package."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and can accommodate purchase orders for Enterprise customers."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 30-day free trial with access to all features. No credit card required to start your trial."
    },
    {
      question: "What if I need more than the plan limits?",
      answer: "Contact our sales team for custom pricing if you need more students or additional features beyond our standard plans."
    }
  ];

  const calculatePrice = (plan: typeof plans[0]) => {
    const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const totalPrice = typeof plan.maxStudents === 'number' 
      ? Math.min(studentCount, plan.maxStudents) * basePrice
      : studentCount * basePrice;
    return totalPrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <TopNavBar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Choose the perfect plan for your school. All plans include core features, 
            with advanced capabilities available as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-colors"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>

          {/* Student Count Selector */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto mb-12">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Students
            </label>
            <div className="flex items-center space-x-4">
              <Calculator className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={studentCount}
                onChange={(e) => setStudentCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="text-lg font-bold text-blue-600 min-w-[80px]">
                {studentCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-3xl shadow-xl p-8 ${plan.popular ? 'ring-4 ring-blue-500 ring-opacity-20 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${calculatePrice(plan).toLocaleString()}
                    <span className="text-lg text-gray-500 font-normal">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice} per student
                  </div>
                  <div className="text-sm text-blue-600 font-medium mt-1">
                    Up to {typeof plan.maxStudents === 'number' ? plan.maxStudents.toLocaleString() : plan.maxStudents} students
                  </div>
                </div>
                
                <button className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 mb-4">What's included:</h4>
                {plan.features.included.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.features.excluded.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl my-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Add-on Services</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Enhance your ESchool experience with additional services tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {addOns.map((addon, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white mb-4">
                {addon.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{addon.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
              <div className="text-lg font-bold text-blue-600">{addon.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <Crown className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            For large institutions or unique requirements, we offer custom enterprise solutions 
            with dedicated support and tailored features.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg">
              Contact Sales
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-bold text-lg">
              Schedule Consultation
            </button>
          </div>
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Custom pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Dedicated support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>White-label options</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Have questions about our pricing? We're here to help.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of schools that trust ESchool for their management needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg">
              Start 30-Day Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-bold text-lg">
              Talk to Sales
            </button>
          </div>
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Full feature access</span>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default PricingPage;