'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Zap, CheckCircle } from 'lucide-react';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { icon: ShoppingCart, text: "Setting up your cart", color: "text-blue-500" },
    { icon: Package, text: "Loading products", color: "text-purple-500" },
    { icon: Zap, text: "Optimizing experience", color: "text-yellow-500" },
    { icon: CheckCircle, text: "Almost ready!", color: "text-green-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }

        const newProgress = prev + Math.random() * 15 + 5;
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));

        return Math.min(newProgress, 100);
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[currentStep]?.icon || ShoppingCart;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Brand Logo */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuickCart
            </h1>
            <p className="text-slate-600 text-sm mt-1">Fast. Simple. Secure.</p>
          </div>
        </div>

        {/* Animated Icon */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-500 hover:shadow-xl">
            <CurrentIcon className={`w-8 h-8 ${steps[currentStep]?.color || 'text-blue-500'} transition-colors duration-300`} />
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full border-2 border-blue-200 animate-ping opacity-30"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className={`text-lg font-medium transition-colors duration-300 ${steps[currentStep]?.color || 'text-blue-500'}`}>
            {steps[currentStep]?.text || "Loading..."}
          </p>
          <p className="text-sm text-slate-500">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center px-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index <= currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110'
                  : 'bg-slate-300'
                  }`}></div>
                <div className={`w-px h-4 transition-colors duration-300 ${index < currentStep ? 'bg-blue-500' : 'bg-slate-300'
                  }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce"></div>
              <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Preparing your shopping experience</span>
          </div>

          {isComplete && (
            <div className="animate-fadeIn">
              <p className="text-green-600 font-medium">Ready to shop! 🛍️</p>
            </div>
          )}
        </div>

        {/* Floating Shopping Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 text-blue-300 opacity-60 animate-float">
            <Package className="w-full h-full" />
          </div>
          <div className="absolute top-1/3 right-1/4 w-5 h-5 text-purple-300 opacity-60 animate-float" style={{ animationDelay: '1s' }}>
            <Zap className="w-full h-full" />
          </div>
          <div className="absolute bottom-1/3 left-1/5 w-4 h-4 text-pink-300 opacity-60 animate-float" style={{ animationDelay: '2s' }}>
            <CheckCircle className="w-full h-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Loading;