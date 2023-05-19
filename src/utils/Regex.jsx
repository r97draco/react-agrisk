export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validName = new RegExp("^[a-zA-Z]+[a-zA-Z]+$");

export const validName2 = new RegExp("^[A-Z][a-z]+( [A-Z][a-z]+)*")

export const validUsername = new RegExp("^[a-z0-9]{4,16}$");
