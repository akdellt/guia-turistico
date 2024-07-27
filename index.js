function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword () {
    toggleButtonsDisable();
    togglePasswordError();
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

function toggleEmailErrors() {
    const email = form.email().value;

    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordError() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function login() {
    showLoading();

    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        window.location.href = "../index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if(error.code === "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    return error.message;
}

function register() {
    window.location.href = "../paginas/registrar.html"
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}