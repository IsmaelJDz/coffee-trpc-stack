export function validatePasswordRules(password: string) {
  const hasOneCapitalLetter = /[A-Z]/;
  const hasOneLowerCaseLetter = /[a-z]/;
  const hasOneDigit = /[0-9]/;
  const hasMinLength = /^.{8,}$/;

  const passwordValidation = [
    { valid: hasMinLength.test(password), labelHint: "8 characters, " },
    { valid: hasOneCapitalLetter.test(password), labelHint: "1 capital letter, " },
    { valid: hasOneLowerCaseLetter.test(password), labelHint: "1 lowercase letter, " },
    { valid: hasOneDigit.test(password), labelHint: "1 number" }
  ];

  return passwordValidation;
}
