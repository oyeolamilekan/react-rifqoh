const acceptOnlyNumber = (digits) => {
    return digits.replace(/[^0-9.]/g,'').replace(/[a-zA-Z]/, '').replace(/,/g, '')
}

export default acceptOnlyNumber;