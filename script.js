const display = document.getElementById('display');
let resultShown = false;

function append(value) {
  if (display.innerText === '0' || resultShown || display.innerText === 'Error') {
    display.innerText = value;
    resultShown = false;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = '0';
  resultShown = false;
}

function deleteLast() {
  if (resultShown || display.innerText === 'Error') {
    display.innerText = '0';
    resultShown = false;
    return;
  }

  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = '0';
  }
}

function calculate() {
  try {
    let exp = display.innerText
      .replace(/÷/g, '/')
      .replace(/×/g, '*');

    // Convert 4%200 => (4/100)*200
    exp = exp.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?)/g, "($1/100)*$3");
    // Convert standalone % => (x/100)
    exp = exp.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    const result = eval(exp);
    display.innerText = result;
    resultShown = true; // set flag to reset on next input
  } catch {
    display.innerText = 'Error';
    resultShown = true;
  }
}
