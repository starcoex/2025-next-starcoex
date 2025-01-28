export const checkFirstChar = (name: string) => {
  const username = name.trim();
  const firstChar = username.charAt(0);
  return isNaN(parseInt(firstChar));
};

export const addCountryCode = (phone_number: string) => {
  return "82" + phone_number.replace(/^0/, "");
};

export const checkPasswords = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => {
  return password === password_confirm;
};

export const checkPhoneNumber = (phone_number: string) => {
  const regex = /^\d{3}-\d{4}-\d{4}$/; // 010으로 시작하고, 중간에 4자리, 마지막에 4자리가 있는지 확인하는 정규 표현식
  console.log(regex);
  const test = regex.test(phone_number);
  console.log(test);
  return test;
};
