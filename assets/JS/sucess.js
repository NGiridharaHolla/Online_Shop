function addDate() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() + 5;
    var year = dateObj.getUTCFullYear();

    var newdate = day + "/" + month + "/" + year;
    document.getElementById('Date').innerHTML = " " + newdate;
}