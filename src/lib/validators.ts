// Card number validation
export const validateCardNumber = (value: string): boolean => {
  const regex = /^[\d\s]+$/;
  const digits = value.replace(/\s/g, '');
  
  return regex.test(value) && digits.length === 16;
};

// Card holder validation
export const validateCardHolder = (value: string): boolean => {
  return !!value && value.length >= 3;
};

// Expiry date validation
export const validateExpiryDate = (value: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  
  if (!regex.test(value)) {
    return false;
  }
  
  const [month, year] = value.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
  const today = new Date();
  
  return expiry > today;
};

// CVV validation
export const validateCvv = (value: string): boolean => {
  const regex = /^\d{3}$/;
  return regex.test(value);
};
