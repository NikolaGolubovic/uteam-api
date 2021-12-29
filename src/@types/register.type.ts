export interface registerValues {
  username: string;
  password: string;
  email: string;
}

function validateEmail(email): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function parseParams(req): registerValues {
  const { username, password, email } = req.body;
  if (!username || typeof username !== "string") {
    throw new Error("Invalid Username");
  }
  if (!password || typeof password !== "string") {
    throw new Error("Invalid Username");
  }
  if (email && !validateEmail(email)) {
    throw new Error("Please Check Your Email");
  }
  return {
    username,
    password,
    email,
  };
}
