const generatePassword = (firstName, lastName, mobileNum) => {
    const firstNamePart = firstName.length >= 3 ? firstName.slice(0, 3) : firstName;
    const lastNamePart = lastName.length >= 3 ? lastName.slice(-3) : lastName;

    const mobileDigits = mobileNum.length >= 4 ? mobileNum.slice(0, 4) : mobileNum;

    const randomFirstNameLetter = firstName.length >= 3 ? firstName[Math.floor(Math.random() * firstName.length)] : '';
    const randomLastNameLetter = lastName.length >= 3 ? lastName[Math.floor(Math.random() * lastName.length)] : '';

    let password = firstNamePart + randomFirstNameLetter + lastNamePart + randomLastNameLetter + mobileDigits;

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
};


module.exports = { generatePassword };