const measurements = document.getElementsByClassName("input-value");
const bodyTypes = document.getElementsByClassName('body');
const sexes = document.getElementsByClassName('sex');
const gains = document.getElementById('gains');
const eat = document.getElementById('eat');

gains.onclick = function () {
  const [{ value: height }, { value: weight }, { value: age }] = measurements;
  const bodyType = [...bodyTypes].find((t) => t.checked).value;
  const sex = [...sexes].find((s) => s.checked).value;

  const calculateBMR = (height, weight, age, sex) => {
    return (15.875 * height) + (4.5359237 * weight) - (5 * age) + (sex === 'male' ? 5 : -161);
  };
  // Could've set the values on the radio buttons, but did a ternary to keep the numbers in the JS.
  const bmrMuliplier = bodyType === 'ectomorph' ? 1.24 : bodyType === 'mesomorph' ? 1.16 : 1.08;
  const calories = calculateBMR(height, weight, age, sex) * bmrMuliplier * 1.5;

  const protein = weight * 1.3;
  const remainingCalories = (calories - (protein * 4)) / 2;
  const carbs = remainingCalories / 4;
  const fat = remainingCalories / 9;

  eat.innerText = Math.round(protein) + 'g Protein, ' + Math.round(carbs) + 'g Carbs, ' + Math.round(fat) + 'g Fat.\n' + Math.round(calories) + ' Calories';
  eat.style.display = 'initial';
};