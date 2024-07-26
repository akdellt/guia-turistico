function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById('recover-password-button').disabled = !emailValid;

    const password = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !password;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}