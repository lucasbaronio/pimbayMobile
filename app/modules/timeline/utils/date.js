export const formatDateFromString = (dateString) => {
    var date = new Date(dateString);
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

export const formatFullDate = (dateString) => {
    var date = new Date(dateString);
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

export const formatDateFromDate = (date) => {
    var month = parseInt(date.getMonth(), 10)+1;
    return date.getDate() + "/" + month + "/" + date.getFullYear();
}

export const formatTimeFromDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}