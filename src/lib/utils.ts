import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format card number with spaces
export const formatCardNumber = (value: string): string => {
  return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Format expiry date
export const formatExpiryDate = (value: string): string => {
  return value.replace(/\D/g, '')
              .replace(/(\d{2})(?=\d)/g, '$1/');
};

// Display card number with last 4 digits visible
export const displayCardNumber = (value: string): string => {
  if (!value) return '•••• •••• •••• ••••';
  
  const lastFourDigits = value.replace(/\s/g, '').slice(-4);
  return `•••• •••• •••• ${lastFourDigits}`;
};

// Format current date for receipt
export const formatCurrentDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return now.toLocaleDateString('en-IN', options);
};

// Generate a random transaction ID
export const generateTransactionId = (): string => {
  const random = Math.floor(Math.random() * 100000000);
  return `ICICI${random.toString().padStart(8, '0')}`;
};
