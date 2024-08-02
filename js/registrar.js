function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = email ? "none" : "block";
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();
    RegisterButtonDisabled();
}

function onChangeConfirmPassword() {
    validatePasswordMatch();
    RegisterButtonDisabled();
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmMatchPassword().style.display = password === confirmPassword ? "none" : "block";
}

function RegisterButtonDisabled() {
    form.registerButton().disabled = isFormValid();
}

function isFormValid() {
    const email = form.email().value

    if(!email || !validateEmail(email)){
        return true
    }

    const confirmPassword = form.confirmPassword().value

    if(!confirmPassword){
        return true
    }

    const password = form.password().value

    if(!password){
        return true
    }
    if(form.emailInvalidError().style.display === 'block'){

        return true
    }
    if(form.emailRequiredError().style.display === 'block'){
        return true
    }
    if(form.confirmMatchPassword().style.display === 'block'){
        return true
    }
    if(form.passwordMinError().style.display === 'block'){
        return true
    }
    if(form.passwordRequiredError().style.display === 'block'){
        return true
    }
    return false
}

function registrar() {
    showLoading();
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then (() => {
        hideLoading();
        window.location.href = "../index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if(error.code === "(auth/invalid-value-(email),-starting-an-object-on-a-scalar-field-invalid-value-(password),-starting-an-object-on-a-scalar-field") {
        return "Email já em uso";
    }
    return error.message;
}

const form = {
    confirmPassword: () => document.getElementById('confirm-password'),
    confirmMatchPassword: () => document.getElementById('password-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinError: () => document.getElementById('password-min-error'),
    registerButton: () => document.getElementById('botao-registrar')
}