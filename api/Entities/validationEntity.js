exports.validate_email = (validateData) => {
    let email = validateData.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (email === 0) {
        return validateData
    } else {
        return 'invalid email'
    }
}

exports.validate_type = (data, requiredType) => {
    const r = requiredType;
    const s = 'string';
    const o = 'object';
    const n = 'number';
    const b = 'boolean';

    if (r === s || r === o || r === n || r === b) {
        return typeof data === r;
    } else {
        return false
    }
}

exports.sanitize_string = (str) => {
    let sanitisedStr = str.trim();
    return sanitisedStr.replace(/[^a-zA-Z\d\#\++\_: ]/g, "");
}