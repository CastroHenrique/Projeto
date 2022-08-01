class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',    
        ]
    }
    // iniciar a validação de todos os campos
    validate (form) {
        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .erro-validation');
        
        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //Transformar uma HTMLColection -> array
        let inputsArray = [...inputs];
        
        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
            // loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {
                  // limpando a string para vira um método
                  let method = this.validations[i].replace('data-', '').replace('-', '');

                  //valor do input 
                  let value = input.getAttribute(this.validations[i]);

                  // invocar o método
                  this[method](input, value); 
                }
            }

        }, this);

    }

    // verifica se um input tem um número mínimo de caracter
    minlength(input, minValue) {

        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }
   // verifica se o input passou do limite de caracter
    maxlength(input, maxValue){

        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }
    // valida emails
    emailvalidate(input) {

        // email@email.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `Insira um email no padrão email@email.com`;
        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }
     // valida se o campo te apenas letras 
     onlyletters(input){
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem cacacteres especiais`;
        if (!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }  

    // verifica se o input é requirido
    required(input) {
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
        }
    }
  
     // verifica se dois campos são iguais
     equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }
    passwordvalidate(input) {
        // transformar string em um array
        let charArr = input.value.split("");

        //contador de  letras e numeros
        let uppercases = 0;
        let numbers = 0;
        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases ++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }
        if(uppercases === 0 || numbers === 0){
            let errorMessage = `A senha precisa de um caractere maiúscua e um número`;
            this.printMessage(input, errorMessage);
        }
    }
     // metodo para imprimir mensagem de erro na tela
     printMessage(input, msg) {

    // verificar qauntidade de erro que ele possui
    let errorsQty = input.parentNode.querySelector('.erro-validation');

        if (errorsQty === null) {
        let template = document.querySelector('.erro-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
        }
    }
    //linpa as validações da tela
    cleanValidations(validation){
        validation.forEach(el => el.remove());
    }

}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator ();
let registration = '..pj/cadastro.html';


// eventos que dispara as validações
submit.addEventListener('click', function(e){

    e.preventDefault();

   validator.validate(form);
   
 
})



