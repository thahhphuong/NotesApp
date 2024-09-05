export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

}
export const validatePassword = (password) => {
    const passwordLength = password.length
}

export const getInitials = (name) => {
    if (!name) {
        return ""
    }
    const words = name.split(" ")
    let initals = ""
    for (const w of words) {
        initals += w.charAt(0)
    }
    return initals.toUpperCase()
}