const generatePassword = (firstName, lastName, mobileNum) => {
    const firstNamePart = firstName.length >= 3 ? firstName.slice(0, 3) : firstName;

    const lastNamePart = lastName.length >= 3 ? lastName.slice(-3) : lastName;

    const mobileNumPart = mobileNum;

    const combinedPassword = lastNamePart + mobileNumPart + firstNamePart;

    return combinedPassword;
};


module.exports = { generatePassword };