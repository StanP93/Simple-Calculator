const calc = document.querySelector('.calc');
const result = document.getElementById('display')


calc.addEventListener('click', function(event){
    const value = event.target.innerText;

    result.innerText += value;
})

