export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidContact = (contact: string): boolean => {
    const contactRegex = /^\d{10}$/; // Adjust regex for your desired contact format
    return contactRegex.test(contact);
  };
  