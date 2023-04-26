export const ValueEmpty = value => {
  if (value) {
    return false;
  }
  return true;
};

export const ValidateMobile = mobile => {
  const reg = new RegExp('^\\d+$');

  if (ValueEmpty(mobile)) {
    const data = alert('Please enter your mobile number');
    return data;
  } else if (!reg.test(mobile)) {
    const data = alert('Invalid mobile number');
    return data;
  } 
  // else if (mobile.length != 10) {
  //   const data = alert('Mobile number must be 10 digits');
  //   return data;
  // }
  return true;
};

export const ValidateMail = email => {
  if (ValueEmpty(email?.trim())) {
    return 'Please provide an email';
  }
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.trim())) {
    return false;
  }
  return true;
};
