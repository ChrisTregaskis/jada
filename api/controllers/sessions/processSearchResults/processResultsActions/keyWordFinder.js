const { get_user_kw } = require('./dataBaseRequests/getUserPreferences');
let dkw, udkw, ikw;

exports.key_word_finder = async (jobDesc, userId) => {
    const allUserKw = await get_user_kw(userId)
    dkw = allUserKw.key_words.dkw;
    udkw = allUserKw.key_words.udkw;
    ikw = allUserKw.key_words.ikw;

    let explodedJD_dkw = jobDesc.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_udkw = jobDesc.split(/[^a-zA-Z\d\#\++:]/);
    let explodedJD_ikw = jobDesc.split(/[^a-zA-Z\d\#\++:]/);

    let dkwFoundAll = explodedJD_dkw.filter(check_dkw);
    let udkwFoundAll = explodedJD_udkw.filter(check_udkw);
    let ikwFoundAll = explodedJD_ikw.filter(check_ikw);

    let dkwFoundUnique = remove_duplicates(dkwFoundAll)
    let udkwFoundUnique = remove_duplicates(udkwFoundAll)
    let ikwFoundUnique = remove_duplicates(ikwFoundAll)

    return {
        found_dkw: dkwFoundUnique,
        found_udkw: udkwFoundUnique,
        found_ikw: ikwFoundUnique
    }
}

function check_dkw(currentWord) {
    let foundMatch = dkw.includes(currentWord)
    if (foundMatch) {
        return currentWord
    }
}

function check_udkw(currentWord) {
    let foundMatch = udkw.includes(currentWord)
    if (foundMatch) {
        return currentWord
    }
}

function check_ikw(currentWord) {
    let foundMatch = ikw.includes(currentWord)
    if (foundMatch) {
        return currentWord
    }
}

function remove_duplicates(array) {
    return array.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item],[]);
}