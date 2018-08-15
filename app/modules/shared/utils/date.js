import moment from 'moment';

const formatDateFromString = (dateString) => {
    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = parseInt(date.getMonth(), 10)+1;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + strTime;
}

const formatFullDate = (dateString) => {
    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = parseInt(date.getMonth(), 10)+1;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + strTime;
}

const formatDateFromDate = (date) => {
    var month = parseInt(date.getMonth(), 10)+1;
    return date.getDate() + "/" + month + "/" + date.getFullYear();
}

const formatTimeFromDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const getFormalDate = (dateString) => {
    var days = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SAB'];
    var months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SET','OCT','NOV','DIC'];

    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var dayOfWeek = days[ date.getDay() ];
    var month = months[ date.getMonth() ];
    return `${dayOfWeek}, ${date.getDate()} ${month}, ${hours}` + (minutes !== 0 ? `:${minutes} ` : ' ') + 'hs';
}

export {
    formatDateFromString,
    formatFullDate,
    formatDateFromDate,
    formatTimeFromDate,
    getFormalDate,
}