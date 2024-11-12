const firebaseConfig = {
    apiKey: "AIzaSyAVS20Ekm4x2PlXm4kMdDagI8guCUSGh-Y",
    authDomain: "datosformulario-8375b.firebaseapp.com",
    projectId: "datosformulario-8375b",
    storageBucket: "datosformulario-8375b.firebasestorage.app",
    messagingSenderId: "350314123494",
    appId: "1:350314123494:web:9600e7c137c945f87ceb27",
    measurementId: "G-M7QRSLYYBF"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit',(event) => {
    event.preventDefault();

    //Validar Nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '' ) {
        errorNombre.textContent = 'Por favor, introduce tu nombre.';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    };
    //Validar Correo
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un correo valido.';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    };

    //Validar Contraseña
    let password = document.getElementById('password');
    let passwordError = document.getElementById('passwordError');
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!passwordPattern.test(password.value)){
        passwordError.textContent = 'Por favor, introduce una contraseñá mayor a 8 caracteres, con numeros, mayusculas y minusculas y caracteres especiales';
        passwordError.classList.add('error-message');
    } else{ 
        passwordError.textContent = '';
        passwordError.classList.remove('error-message');
    };

    //Si todos los campos son validos!
    if(!errorNombre.textContent && !emailError.textContent && !passwordError.textContent) {
        
        //Backend Firebase
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: password.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito!', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });
    };
})
