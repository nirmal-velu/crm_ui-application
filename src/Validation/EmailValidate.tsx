const validateEmail = (inputEmail:string):boolean => {
    // Replace 'example.com' with your desired email domain
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(inputEmail);
  };

  export {validateEmail}