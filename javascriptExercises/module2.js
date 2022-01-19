"use strict";

window.onload = function(){
	var btn = document.getElementById("btnCreate")
	var textarea = document.getElementById("textArea")
	var accNum = document.getElementById("accNum")
	var deposit = document.getElementById("deposit")

	var accountsList = []

	var account = function(){
		var accountName = ""
		var balance = 0
		return {
			createAccount : function(){
				accountName = accNum.value
				balance = deposit.value
			},
			value : function(){
				return "Account Name: " + accountName + "  " + "Balance: " + balance
			}
		}
	};

	console.log(accountsList)
	btn.onclick = function(){
		if(accNum.value != "" && deposit.value != ""){
			var newAccount = account()
			newAccount.createAccount()
			accountsList.push(newAccount)
			textarea.innerHTML += "\n" + newAccount.value()
		}else{
			alert("Fields should not be empty")
		}
		
	}
}