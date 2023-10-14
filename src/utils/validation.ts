export const validateEmail = (email: string): boolean => {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) ? true : false
}

export const validatePhone = (phone: string): boolean => {
    return phone.match(/[1-9][0-9]{9}/) ? true : false
}

export const validateName = (name: string): boolean => {
    return name.match(/[^0-9]/) ? true : false
}

export const validateBio = (bio: string): boolean => {
    return bio.split(" ").length <= 15
}