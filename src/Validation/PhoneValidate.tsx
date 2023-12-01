const validatePhone = (input: string):boolean => {
    // Implement your phone validation logic here
    // Example: Assume a valid phone number contains only digits and is at least 10 digits long
    const phoneRegex = /^\d{,10}$/;
    return phoneRegex.test(input);
  };
  export {validatePhone}