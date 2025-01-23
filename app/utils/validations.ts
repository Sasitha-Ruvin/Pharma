//validations

export const isValidEmail = (email:string):boolean =>{
    const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validateForm = (fields: any[], formData: Record<string, any>) => {
    for (const field of fields) {
      if (!formData[field.name]) {
        return {
          valid: false,
          message: `${field.label} is required.`,
        };
      }
      // Email validation
      if (field.name === "email" && formData[field.name] && !isValidEmail(formData[field.name])) {
        return {
          valid: false,
          message: "Please enter a valid email address.",
        };
      }
    }
    return { valid: true };
  };