const fastFocus = () =>{
    // focus means that you put the cusor on the field you want to focus on
    let userid = document.loginRegister.email.focus();
    return true
};

// errors
const email_error = document.getElementById('email3');
const password_error = document.getElementById('pwd');

// validating email
const usersE = () => {
    let usersE = document.loginRegister.email
    let emailexp = "^(.+)@(.+)$"
    if(usersE.value.match(emailexp)){
        document.loginRegister.password.focus()
        email_error.innerHTML = '';
        email.style.border ='1px solid green'
        return true
    }
    else {
        // if it is wrong
        // alert('email invalid')
        email.style.border ='1px solid red'
        email_error.textContent ='Email must have @'
        email.focus()
        return false
    }
};
// validating the password 
const passVal = (max,min) =>{
    let passid = document.loginRegister.password;
    var passLen = passid.value.length;
    // if is the function calling the alert and length is wrong giv us
    if(passLen == 0 || passLen >= min || passLen < max ){
        password.style.border ='1px solid red'
        password_error.textContent ='must be between 8-12'
        password.focus()
        return false;
        
    }
    // if its correct send us to the pass word line 
    password_error.innerHTML = '';
    password.style.border ='1px solid green'
    return true
};

const form = document.getElementById('registerform');
form.addEventListener('submit', function(e) {
    let validForm = 
        usersE() &&
        passVal();
        if(!validForm){
            e.preventDefault();
        }
});
