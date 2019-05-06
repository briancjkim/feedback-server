const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
  // regex 통과못하는 이메일주소만걸러낸다
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    // 맨마지막에,로 끝나면 email이 공백인놈이 들어오게되서 regex.test를 통과못하는데 email.length>0을해서 test를 피할수있다.
    .filter(email => re.test(email) === false);
  if (invalidEmails.length) {
    if (invalidEmails.includes("")) {
      return `Remove the trailing comma or add another email`;
    }
    return `These are invalid emails ${invalidEmails}`;
  }
};
