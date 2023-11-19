const form = document.querySelector("#signin-form");

const email = document.querySelector("#email");
const password1 = document.querySelector("#password1");
const password2 = document.querySelector("#password2");

// Verificamos que los datos de la cuenta sean validos, y en ese caso lo registramos en la base de datos.

form.addEventListener("submit", function(event){

    if (!form.checkValidity() || !validateForm()){
        event.preventDefault();
        event.stopPropagation();
    } else {
        const user = {
            "email": email.value,
            "password": password1.value
        };
        sendUser("/usuarios", user);
    }

    form.classList.add("was-validated");

    password2.addEventListener("input", function(){
        if (password2.value != password1.value || !password2.checkValidity()){
            password2.classList.add("is-invalid");
            password2.classList.remove("is-valid");
        } else {
            password2.classList.add("is-valid");
            password2.classList.remove("is-invalid");
        }
    });

});

// Chequeamos que los datos del formulario sean validos

function validateForm(){

    if (email.checkValidity() && password1.checkValidity() && password2.checkValidity() && password1.value === password2.value){
        return true;
    }

    return false;

}

// Realizamos un fetch para enviar los datos al servidor

async function sendUser(url, data){

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.log(error.message);
    }

}