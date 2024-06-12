const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str){
    
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}
function isInvalidInput(str){
    const regex = /\d+e\d+/i;
    return str.match(regex)
}

function addEntry(){
    const targetId = '#' + entryDropdown.value;
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container `);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories" />`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e){
    e.preventDefault();
    isError = false;
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    //pass them to your getCaloriesFromInputs function to extract the calorie total
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if(isError){
        return;
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}"> ${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr/>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;// Create p element with text using interpolation after the hr element
    
    //Make the output element visible
    output.classList.remove('hide');



}


function getCaloriesFromInputs(list){
    let calories = 0;
    for(const item of list){
        const currVal = cleanInputString(item.value);
        const invalidInputMatch =  isInvalidInput(currVal);
        if(invalidInputMatch){
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}

//User can clear  the formm
function cleanForm(){
   const targetInputContainers = Array.from(document.querySelectorAll('.input-container'));

 /* for...of loop with a variable called container
    to iterate through the inputContainers array.Inside the loop, 
    set the innerHTML property of the container to an empty string. 
    This will clear all of the contents of that input container.*/ 
  
  
    for(const container of inputContainers){
    container.innerHTML = '';
   }

   budgetNumberInput.value = '';
   output.innerText = '';
   output.classList.add('hide');
}


addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener('click', clearForm);



/*In regex, shorthand character classes allow you to match specific characters without having to 
write those characters in your pattern. Shorthand character classes are 
preceded with a backslash (\). The character class \s will match
 any whitespace character. Add this to your regex pattern.*/