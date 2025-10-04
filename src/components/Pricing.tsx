'use client';
import React from 'react';

const pricingPlans = [
  {
    name: 'Standard',
    price: 1,
    period: '/month',
    features: [
      'Company-wise Questions',
      'DSA practice sheets',
      'Core subjects preparation',
      'User reviews & experience-sharing',
      'Time or question limit for focused initial practice',
    ],
    buttonText: 'Get started',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: 2,
    period: '/month',
    features: [
      'Standard features',
      'Mock interviews',
      'AI-generated questions',
      'Interview scheduling',
      'Reminders',
      '1:1 bot-driven interview practice',
    ],
    buttonText: 'Get started',
    isPopular: true,
  },
  {
    name: 'Pro+',
    price: 5,
    period: '/month',
    features: [
      'Standard & Pro features',
      'Session Summary',
      'AI Mentor',
      'Resume Building',
      'Top Company Interview Q&A',
    ],
    buttonText: 'Get started',
    isPopular: false,
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-700">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm tracking-wide">
              Choose Your Plan
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`relative ${plan.isPopular ? 'lg:scale-105' : ''}`}>
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                  plan.isPopular
                    ? 'border-emerald-200 shadow-emerald-500/10 dark:shadow-emerald-700/20'
                    : 'border-gray-200 hover:border-emerald-200 dark:border-gray-700 dark:hover:border-emerald-600'
                }`}
              >
                {/* Plan name only */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
