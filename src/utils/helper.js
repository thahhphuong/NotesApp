export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

}
export const validatePassword = (password) => {
    const passwordLength = password.length
}