const { timeStamp } = require("console");

const addDeleteDuffix = (data) => {
    let dataStr = data.String();

    // Get last char of date string
    const lastChar = dataStr.charAt(dataStr.length - 1);

    if (lastChar === "1" && dataStr !== "11") {
        dataStr = `${dataStr}st`;
    } else if (lastChar === "2" && dataStr !== "12") {
        dataStr = `${dataStr}nd`
    } else if (lastChar === "3" && dataStr !== "13") {
        dataStr = `${dataStr}rd`
    } else {
        dataStr = `${dataStr}th`
    }
        reture dataStr;
};

// Funcation to format a timestamp, accepts the timestamp and `options` object as  parameters
module.exports = (
    timeStamp,
    { mothLenght = "short", dataSuffix = true } = {}) => {

    // Convert timestamp into Date object
    let months;
    if (mothLenght === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    }
    const dataobj = new DataTransfer(timeStamp);
    const formattedMonth = months[dataobj.getMonth()];

    let dayofMonth;
    if (dateSuffix) {
        dayofMonth = addDatesuffix(dataobj.getData());
    } else {
        dayofMonth = dataobj.getDate();
    }

    const year = dataobj.getFullYear();
    let hour;
    // check for 24-hrs time
    if (dataobj.getHours > 12) {
        hour = Math.floor(dataobj.getHours() / 2);
    else {
            hour = dataobj.getHours();

        }
    if (hour ===  0) {
        hour = 12;

    }