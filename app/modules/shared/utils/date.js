import moment from 'moment';

const formatDateFromString = (dateString) => {
    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = parseInt(date.getMonth(), 10) + 1;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + strTime;
}

const formatFullDate = (dateString) => {
    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = parseInt(date.getMonth(), 10) + 1;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + strTime;
}

const formatDateFromDate = (date) => {
    var month = parseInt(date.getMonth(), 10) + 1;
    return date.getDate() + "/" + month + "/" + date.getFullYear();
}

const formatTimeFromDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const getFormalDate = (dateString) => {
    var days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SAB'];
    var months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];

    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var dayOfWeek = days[date.getDay()];
    var month = months[date.getMonth()];
    return `${dayOfWeek}, ${date.getDate()} ${month}, ${hours}` + (minutes !== 0 ? `:${minutes} ` : ' ') + 'hs';
}

const getCompleteFormalDate = (dateString) => {
    var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    var date = new Date(moment(dateString).format());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var dayOfWeek = days[date.getDay()];
    var month = months[date.getMonth()];
    return `${dayOfWeek}, ${date.getDate()} de ${month}, ${hours}` + (minutes !== 0 ? `:${minutes} ` : ' ') + 'hs';
}

const getDueTime = (dueDate) => {
    var dueDateParsed = moment(dueDate); //current format YYYY-MM-DDTHH:mm:ss.SSSSZ
    var now = moment(new Date());
    var diff = moment.duration(moment(dueDateParsed).diff(now));
    var days = parseInt(diff.asDays());
    var hours = parseInt(diff.asHours()); //it gives in miliseconds
    hours = hours - days * 24;
    var minutes = parseInt(diff.asMinutes());
    minutes = minutes - (days * 24 * 60 + hours * 60);
    if (days > 0) return 'Caduca en ' + days + "d " + hours + "h ";
    if (hours > 0) return 'Caduca en ' + hours + " h " + minutes + " min";
    if (minutes > 0) return 'Caduca en ' + minutes + " min";
    return "Vencido";
}

const getCreatedTime = (dateCreated) => {
    var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

    var dateCreatedParsed = moment(dateCreated); //current format YYYY-MM-DDTHH:mm:ss.SSSSZ
    var now = moment(new Date());
    var diff = moment.duration(moment(now).diff(dateCreatedParsed));
    var days = parseInt(diff.asDays());
    var hours = parseInt(diff.asHours()); //it gives in miliseconds
    hours = hours - days * 24;
    var minutes = parseInt(diff.asMinutes());
    minutes = minutes - (days * 24 * 60 + hours * 60);

    if (days > 1) return months[dateCreatedParsed.month()] + " " + dateCreatedParsed.date() + " a las " + dateCreatedParsed.format('HH:mm');
    if (days == 1) return "Ayer a las " + dateCreatedParsed.format('HH:mm');
    if (hours > 1) return "Hace " + hours + " horas";
    if (hours == 1) return "Hace " + hours + " hora";
    if (minutes > 1) return "Hace " + minutes + " minutos";
    if (minutes == 1) return "Hace " + minutes + " minuto";
    if (minutes < 1) return "Ahora";
}

const getInvSentTime = (dateCreated) => {
    var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

    var dateCreatedParsed = moment(dateCreated); //current format YYYY-MM-DDTHH:mm:ss.SSSSZ
    var now = moment(new Date());
    var diff = moment.duration(moment(now).diff(dateCreatedParsed));
    var days = parseInt(diff.asDays());
    var hours = parseInt(diff.asHours()); //it gives in miliseconds
    hours = hours - days * 24;
    var minutes = parseInt(diff.asMinutes());
    minutes = minutes - (days * 24 * 60 + hours * 60);

    if (days > 1) return "Enviada el " + dateCreatedParsed.date() + " " + months[dateCreatedParsed.month()] + " a las " + dateCreatedParsed.format('HH:mm');
    if (days == 1) return "Enviada ayer a las " + dateCreatedParsed.format('HH:mm');
    if (hours > 1) return "Enviada hace " + hours + " horas";
    if (hours == 1) return "Enviada hace " + hours + " hora";
    if (minutes > 1) return "Enviada hace " + minutes + " minutos";
    if (minutes == 1) return "Enviada hace " + minutes + " minuto";
    if (minutes < 1) return "Enviada ahora";
}

const getInvReceivedTime = (dateCreated) => {
    var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

    var dateCreatedParsed = moment(dateCreated); //current format YYYY-MM-DDTHH:mm:ss.SSSSZ
    var now = moment(new Date());
    var diff = moment.duration(moment(now).diff(dateCreatedParsed));
    var days = parseInt(diff.asDays());
    var hours = parseInt(diff.asHours()); //it gives in miliseconds
    hours = hours - days * 24;
    var minutes = parseInt(diff.asMinutes());
    minutes = minutes - (days * 24 * 60 + hours * 60);

    if (days > 1) return "Recibida el " + dateCreatedParsed.date() + " " + months[dateCreatedParsed.month()] + " a las " + dateCreatedParsed.format('HH:mm');
    if (days == 1) return "Recibida ayer a las " + dateCreatedParsed.format('HH:mm');
    if (hours > 1) return "Recibida hace " + hours + " horas";
    if (hours == 1) return "Recibida hace " + hours + " hora";
    if (minutes > 1) return "Recibida hace " + minutes + " minutos";
    if (minutes == 1) return "Recibida hace " + minutes + " minuto";
    if (minutes < 1) return "Recibida ahora";
}

const isInvitationExpired = (realizationDate) => {
    var realizationDateParsed = moment(realizationDate);
    var now = moment(new Date());
    var diff = moment.duration(moment(realizationDateParsed).diff(now));
    var minutes = parseInt(diff.asMinutes());
    return minutes + 1440 < 0;
}

export {
    formatDateFromString,
    formatFullDate,
    formatDateFromDate,
    formatTimeFromDate,
    getFormalDate,
    getCompleteFormalDate,
    getDueTime,
    getCreatedTime,
    getInvSentTime,
    getInvReceivedTime,
    isInvitationExpired
}