/**
 * @author sanjeet.pandit
 * @utility for date and category status on loading the page 
 */


window.onload = function(){
     document.getElementById("variablesid").disabled = true;
     today = new Date().toISOString().split('T')[0];

    document.getElementById("myDate").min = today;   

};

/**
 * @author sanjeet.pandit
 * @description utility for the form1 to validate income and date fields
 * 
 */

 function validateForm(){
     income=document.getElementById("mIncome").value.trim();//global variable
     ldate=document.getElementById("myDate").value;//global variable
     ldate
     numbers = /^[0-9]+$/;
     if(!numbers.test(income) || income =='' || income <= 0){
          document.getElementById("mIncome").style.borderStyle="solid";
          document.getElementById("mIncome").style.borderColor = "red";
          document.getElementById("lblincome").style.visibility="visible";
          document.getElementById("lblincome").style.marginRight="10px";
          return false;

     }else if(ldate.match(/^\d{4}([./-])\d{2}([./-])\d{2}$/)===null){
          document.getElementById("mIncome").style.borderStyle="";
          document.getElementById("mIncome").style.borderColor = "";
          document.getElementById("lblincome").style.visibility="hidden";
          document.getElementById("myDate").style.borderStyle="solid 3px red";
          document.getElementById("myDate").style.borderColor="red";
          document.getElementById("lbldate").style.visibility="visible";
          document.getElementById("lbldate").style.marginRight="10px";
          return false;
     }
     else{
          return true;
     }
}

/**
 * @author sanjeet.pandit
 * @param {} elementId 
 * @description setting budget and other parameter by default while opening form2 
 * 
 */
function show(elementId) { 
 var result = validateForm();
 if(result){
    document.getElementById("form1").style.display="none";
    document.getElementById("form2").style.display="block";
    document.getElementById("income").value = parseInt(income);
    var budget=document.getElementById("salary").value = parseInt(income - (income * 0.2));//setting salary of form 2
    var expense=document.getElementById("expenses").value = 0;//setting expanses of form 2
    document.getElementById("balance").value = parseInt(budget-expense);
    document.getElementById("saving").value = parseInt(income-expense);
    document.getElementById("expense_date").min = today;
    var date = new Date(document.getElementById("myDate").value);
    date.setHours(23, 59, 59);   // Set hours, minutes and seconds
    showTimer(date);
 }else{
    document.getElementById("form1").style.display="block";
    document.getElementById("form2").style.display="none";
 }
}

/**
 * @author sanjeet.pandit
 *  category raodio buttons validation
 */

function checkRadio() {
			
     var fixedid = document.getElementById("fixedid").disabled = false;
     var variablesid = document.getElementById("variablesid").value = " ";
    
     var variablesid = document.getElementById("variablesid").disabled = true;
}
   function checkRadio2() {
     var variablesid = document.getElementById("variablesid").disabled = false;
   
    var options = document.querySelectorAll('#fixedid option');
        for (var i = 0, l = options.length; i < l; i++) {
             options[i].selected = options[i].defaultSelected;
        }
     var fixedid = document.getElementById("fixedid").disabled = true;
}


/**
 * @author sanjeet.pandit
 * @param {} elementId 
 * 
 */

function transactionpopup(elementId){
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


/**
 * @author sanjeet.pandit
 * @description updating budget
 * 
 */

function update_budget(){
	var salary = parseInt(document.getElementById("salary").value);
	var income = parseInt(document.getElementById("income").value);
	var expenses = parseInt(document.getElementById("expenses").value);
	var updated_budget = parseInt(document.getElementById("update_budget").value);
	if(!numbers.test(updated_budget) || updated_budget =='' || updated_budget <= 0){
		alert("please enter valid amount");
		return;
	}
	if(updated_budget > income){
		alert("Budget cannot be greater than income!");
		return;
	}
	if(updated_budget < expenses){
		alert("Budget cannot be less than the expenses!");
		return;
	}
	// updated_budget = parseInt(updated_budget - (updated_budget * 0.2));
	document.getElementById("salary").value = updated_budget;
	document.getElementById("update_budget").value = "";
	document.getElementById("balance").value = updated_budget - expenses;
}

/**
 * @author sanjeet.pandit
 * @description Adding budget
 * 
 */

var expense_date = [];
var array = new Array();
function add_expense(){
	var salary = parseInt(document.getElementById("salary").value);
	var income = parseInt(document.getElementById("income").value);
	var description = document.getElementById("description").value;
	var amount      = parseInt(document.getElementById("amount").value);
	var expenses      = parseInt(document.getElementById("expenses").value);
	var balance      = parseInt(document.getElementById("balance").value);
	var saving      = parseInt(document.getElementById("saving").value);
	var date        = document.getElementById("expense_date").value;
	if(description.trim() == ""){
		alert("please enter a description!");
		return;
	}
	if(!numbers.test(amount) || amount <= 0){
		alert("please enter valid amount!");
		return;
	}
	if((expenses+ amount) > income){
		alert("Cannot purchase. Amount is higher than the Income!");
		return;
	}
	if(amount > balance){
		alert("Cannot purchase. Amount is higher than the Balance!");
		return;
	}
	if(date.match(/^\d{4}([./-])\d{2}([./-])\d{2}$/)===null){
		alert("Date not valid!")
		return;
	}
	var d = new Date();
  	var n = d.getTime();
	objectLength 	= Object.keys(expense_date).length
	expense_date[objectLength] = {};
	expense_date[objectLength]['description'] = description;
	expense_date[objectLength]['amount']      = amount;
	expense_date[objectLength]['date']        = date;
	expense_date[objectLength]['time']        = n;
	if(document.getElementById('fixed').checked){
		console.log("fixed is  selected ");
		var e = document.getElementById("fixedid");
		if(e.options[e.selectedIndex].value == "Open this select menu"){
			alert("Please select an option from dropdown");
			return;
		}
		expense_date[objectLength]['expense_type'] = 1;//for fixed
		expense_date[objectLength]['expense_value'] = e.options[e.selectedIndex].value;
	}else{
		if(document.getElementById('variablesid').value.trim() == "" ){
			alert("Please insert variable expense name!");
			return;
		}
		expense_date[objectLength]['expense_type'] = 2;//for variables
		expense_date[objectLength]['expense_value'] = document.getElementById('variablesid').value;
	}
	console.log(expense_date[objectLength]['expense_value']);
	document.getElementById("expenses").value = expenses + amount;
	document.getElementById("balance").value  = balance - amount;
	document.getElementById("saving").value   = saving - amount;
	alert("Expense added");
	document.getElementById("description").value = "";
	document.getElementById("amount").value  = "";
	document.getElementById("expense_date").value   = "";
  	array.push(n);
}
/**
 * @author sanjeet.pandit
 * @description Showing transaction History
 * 
 */
function show_modal(){
	objectLength 	= Object.keys(expense_date).length
	if(objectLength == 0){
		alert("You do not have any expense history");
		return;
	}
	var table = document.getElementById("expense_history_tbody");
	expense_date.sort(function(a, b){
    	return b.time-a.time;
	});
	var row_count = 0;
    for(var i =0; i <expense_date.length;i++){
    	row_count++;
		var row = table.insertRow(-1);
		var checkbox = document.createElement("INPUT"); //Added for checkbox
        checkbox.type = "checkbox"; //Added for checkbox
        row.id = "row_"+i;
        var cells0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cb = document.createElement('input');
	    cb.type  = 'checkbox';
	    cb.id = i;
	    cb.value = expense_date[i]['expense_type'];
	    cb.name = "selected_checkbox";
	  	cells0.appendChild(cb);
		cell1.innerHTML = expense_date[i]['description'];
		cell2.innerHTML = expense_date[i]['expense_value'];
		cell3.innerHTML = expense_date[i]['date'];
		cell4.id = "amount_"+i;
		cell4.innerHTML = expense_date[i]['amount'];
		console.log(row_count);
		// if (row_count === )
   		// 	 break;
   	}
	[].forEach.call(  document.querySelectorAll('.close-modal')  , function(elm){
	    elm.onclick = function() {
		    var modal = document.getElementById("myModal2");
	    	modal.style.display = "none";
	    	modal_body = document.getElementById("expense_history_tbody");
	    	modal_body.innerHTML = "";
	    }
	});

	var modal = document.getElementById("myModal2");
	modal.style.display = "block";
    
}
/**
 * @author sanjeet.pandit
 * @description Deleting History
 * 
 */
function delete_expense_rows(){
	var expense_rows = document.getElementsByName("selected_checkbox");
	var selected_checkbox = 0;
	var fixed_expense_selected = 0;
	var deleted_rows = [];
	var delete_row_length  = expense_rows.length
	if(delete_row_length > 0){
		for (var i = 0; i < delete_row_length; i++) {
			if (true === expense_rows[i].checked) {
				if(expense_rows[i].value == 1){
					fixed_expense_selected = 1;
					continue;
				}
				selected_checkbox += 1;
	       		deleted_rows.push(i);
	 		}
		}
		for(var i =0; i<deleted_rows.length;i++){
			console.log("deleting from array");
			var expenses = parseInt(document.getElementById("expenses").value);
			var balance  = parseInt(document.getElementById("balance").value);
			var saving   = parseInt(document.getElementById("saving").value);
			var amount   = parseInt(document.getElementById("amount_"+deleted_rows[i]).innerText);
			document.getElementById("expenses").value = expenses - amount;
			document.getElementById("balance").value  = balance + amount;
			document.getElementById("saving").value   = saving + amount;
			var row = document.getElementById("row_"+deleted_rows[i]);
			row.parentNode.removeChild(row);
			//row.parentNode.removeChild(row.childNodes[0]);
			
		}
	}
	if(fixed_expense_selected){
		alert("Cannot delete a fixed expense!");
		return;
	}
	if(selected_checkbox == 0){
		alert("Please select checkbox to delete a expense history!");
		return;
	}
}


function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}