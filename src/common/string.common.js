function getPhoneNumber(value) {
    return "+840" + value.substr(value.length - 9, value.length);
}

const strCommon = {
    getPhoneNumber: getPhoneNumber
}

export default strCommon