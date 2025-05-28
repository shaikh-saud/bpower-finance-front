
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type CTAButtonProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'lg' | 'sm';
  className?: string;
  onClick?: () => void;
  icon?: boolean;
};

const CTAButton = ({ 
  text, 
  variant = 'primary', 
  size = 'default', 
  className = '',
  onClick, 
  icon = true 
}: CTAButtonProps) => {
  const getVariantClass = () => {
    switch(variant) {
      case 'primary':
        return 'bg-bpower-green text-white hover:bg-bpower-darkGreen';
      case 'secondary':
        return 'bg-bpower-blue text-white hover:bg-bpower-blue/90';
      case 'outline':
        return 'bg-transparent border border-bpower-green text-bpower-green hover:bg-bpower-green hover:text-white';
      default:
        return 'bg-bpower-green text-white hover:bg-bpower-darkGreen';
    }
  };

  const getSizeClass = () => {
    switch(size) {
      case 'lg':
        return 'text-lg py-3 px-8';
      case 'sm':
        return 'text-sm py-1.5 px-4';
      default:
        return 'py-2 px-6';
    }
  };

  return (
    <Button 
      className={`rounded-full font-medium transition-all shadow-md hover:shadow-lg ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
    >
      {text}
      {icon && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default CTAButton;
