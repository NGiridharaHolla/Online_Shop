// var inventory=[
// 	{ 
// 		"Product_Name":"Chair",
// 		"Product_Price":12000,
// 		"Product_Quantity":4
// 	},
// 	{
// 		"Product_Name":"Sofa",
// 		"Product_Price":10000,
// 		"Product_Quantity":7
// 	}
// ];

// function addData() {
// 	for(let i=0;i<inventory.length;i++)
// 	{
// 		document.getElementById('Name'+i).innerHTML+=" "+" "+"<b>"+inventory[i].Name+"</b>";
// 		document.getElementById('Price'+i).innerHTML+=" "+" "+"<b>"+inventory[i].Price+"</b>";
// 		document.getElementById('Quantity'+i).innerHTML+=" "+" "+"<b>"+inventory[i].Quantity+"</b>";
// 	}	
// }

function showPopup(T,n){
	var src='<img src="../assets/Images/Pic'+n+'.jpg "'+'/>';
	document.getElementById('Pic').innerHTML=src;
	document.getElementById('Whole-container').style.display="block";
	document.getElementById('Header').style.opacity="0.0996";
	document.getElementById('Container').style.opacity="0.0996";
	document.getElementById('Footer').style.opacity="0.0996";
	document.getElementById('Copy-right').style.opacity="0.0996";

	document.getElementById('PName').innerHTML+=document.getElementById('Name'+n).innerHTML;
	document.getElementById('PPrice').innerHTML+=document.getElementById('Price'+n).innerHTML;
	document.getElementById('PQuantity').innerHTML+=document.getElementById('Quantity'+n).innerHTML;
}

function closePopup(){
	document.getElementById('Whole-container').style.display="none";
	document.getElementById('Header').style.opacity="1";
	document.getElementById('Container').style.opacity="1";
	document.getElementById('Footer').style.opacity="1";
	document.getElementById('Copy-right').style.opacity="1";

	document.getElementById('PName').innerHTML="";
	document.getElementById('PPrice').innerHTML="";
	document.getElementById('PQuantity').innerHTML="";
}

function Check(){
	for(let i=0;i<inventory.length;i++){
		if(inventory[i].Quantity==0){
		document.getElementById('Btns'+i).style.display="none";
		var x=document.getElementsByClassName('Stock');
		x[i].style.display="block";
	}	

	else
	    x[i].style.display="none";
    }
}


