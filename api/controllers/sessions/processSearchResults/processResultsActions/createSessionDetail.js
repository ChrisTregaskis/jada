const mongoose = require('mongoose');

exports.create_session_detail = () => {
    const today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    let date = yyyy+'-'+mm+'-'+dd;

    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    if(hh < 10) hh = '0' + hh;
    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' + sec;
    let time = `${hh}:${min}:${sec}`;

    let session_id = yyyy+ mm + dd + mongoose.Types.ObjectId();

    return {
        session_date: date,
        session_time: time,
        session_id: session_id
    }
}