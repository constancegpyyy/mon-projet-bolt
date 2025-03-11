import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
  steps: string[];
}

export function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark/10 -translate-y-1/2" />
      
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div
              key={step}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-colors ${
                  isCompleted
                    ? 'bg-success text-white'
                    : isCurrent
                    ? 'bg-accent text-primary'
                    : 'bg-white border border-dark/10'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm ${
                isCurrent ? 'text-primary font-medium' : 'text-muted'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}