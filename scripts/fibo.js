function fibonacci(position) {
  if (position === 1) return 0;
  if (position === 2) return 1;

  let num1 = 0;
  let num2 = 1;
  let current;

  for (let i = 3; i <= position; i++) {
    current = num1 + num2;
    num1 = num2;
    num2 = current;
  }

  return num2;
}
