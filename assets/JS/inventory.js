function openLogForm() {
    document.getElementById('Reg-form').style.display = "none";
    document.getElementById('Log-form').style.display = "block";
    document.getElementById('Cust').style.display = "none";
    document.getElementById('Head').style.opacity = "0.25";
}

function openRegForm() {
    document.getElementById('Log-form').style.display = "none";
    document.getElementById('Reg-form').style.display = "block";
    document.getElementById('Head').style.opacity = "0.25";
}

function openCust() {
    document.getElementById('Emp').style.display = "none";
    document.getElementById('Cust').style.display = "block";
}

function openEmp() {
    document.getElementById('Cust').style.display = "none";
    document.getElementById('Emp').style.display = "block";
}

function closeForm() {
    document.getElementById('Reg-form').style.display = "none";
    document.getElementById('Log-form').style.display = "none";
    document.getElementById('Head').style.opacity = "1";
}