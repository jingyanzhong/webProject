// 錯誤訊息
const accountErrorText = document.getElementById('accountErrorText');
const pwdErrorText = document.getElementById('pwdErrorText');
const pwdCheckErrorText = document.getElementById('pwdCheckErrorText');
const firstNameErrorText = document.getElementById('firstNameErrorText');
const lastNameErrorText = document.getElementById('lastNameErrorText');
const phoneErrorText = document.getElementById('phoneErrorText');
const mailErrorText = document.getElementById('mailErrorText');
const addErrorText = document.getElementById('addErrorText');
// input value
const account = document.getElementById('account');
const password = document.getElementById('password');
const checkPassword = document.getElementById('checkPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const add = document.getElementById('add');
//正則表達式
const accountReg = /^(?=.*[a-z,A-Z].*\d).{8,20}$/;
const passwordReg = /^(?=.*[a-z,A-Z].*\d).{6,12}$/;
const nameReg = /^[\u4E00-\u9FA5]{1,4}$/;
const phoneReg = /^09[0-9]{8}$/;
const emailReg = /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*@[a-z0-9]+(\.[a-z0-9-_]+)*(\.[a-z]{2,})$/;

const signUpBtn = document.getElementById('signUp');
signUpBtn.addEventListener("click",allCheck);

function accReg(){
 if(!accountReg.test(account.value)){
        accountErrorText.innerHTML = '帳號填寫錯誤';
        return false
    }else{
        accountErrorText.innerHTML = '';
        return true
    }
}
function pwdReg(){
if(!passwordReg.test(password.value)){
        pwdErrorText.innerHTML = '密碼填寫錯誤';
        return false
    }else{
        pwdErrorText.innerHTML = '';
        return true
    }
}

function pwdCheckReg(){
    if(!passwordReg.test(checkPassword.value) || (checkPassword.value !== password.value)){
            pwdCheckErrorText.innerHTML = '與密碼不相符';
            return false
        }else{
            pwdCheckErrorText.innerHTML = '';
            return true
        }
}

function firstNameReg(){
    if(!nameReg.test(firstName.value)){
        firstNameErrorText.innerHTML = '姓氏填寫錯誤';
        return false
    }else{
        firstNameErrorText.innerHTML = '';
        return true
    }
}

function lastNameReg(){
    if(!nameReg.test(lastName.value)){
        lastNameErrorText.innerHTML = '名字填寫錯誤';
        return false
    }else{
        lastNameErrorText.innerHTML = '';
        return true
    }
}

function phoneCheckReg(){
if(!phoneReg.test(phone.value)){
        phoneErrorText.innerHTML = '手機填寫錯誤';
        return false
    }else{
        phoneErrorText.innerHTML = '';
        return true
    }
}

function mailReg(){
if(!emailReg.test(email.value)){
        mailErrorText.innerHTML = 'email填寫錯誤';
        return false
    }else{
        mailErrorText.innerHTML = '';
        return true
    }
}

function addReg(){
    if(add.value == ''){
        addErrorText.innerHTML = '請輸入地址';
        return false
    }else{
        addErrorText.innerHTML = '';
        return true
    }
}

function reg(e){
 if(!accReg()||!pwdReg()||!pwdCheckReg()||!firstNameReg()||!lastNameReg()||!phoneCheckReg()||!mailReg()||!addReg()){  
    return false
}
alert('註冊成功')
    return true
}

function allCheck(){
    accReg();
    pwdReg();
    pwdCheckReg();
    firstNameReg();
    lastNameReg();
    phoneCheckReg();
    mailReg();
    addReg();
    if(!accReg()||!pwdReg()||!pwdCheckReg()||!firstNameReg()||!lastNameReg()||!phoneCheckReg()||!mailReg()||!addReg()){  
        alert('資料輸入有誤，請重新填寫')
    }
}