import validator from 'validator';

export function validateEmailPassword(email, password){
    let result = '';
    if (!validator.isEmail(email))
      result = result + 'Wrong email format';
    if (!validator.isLength(password, {min:6, max: 20})){
      let text = 'Password must be at 6-20 characters';
      result = result + ((result) ? ", " + text : text);
    }
    return result;
} 