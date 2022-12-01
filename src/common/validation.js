export const empValidation = (email, password, setEmail, setPassword) => {
  if (email === "" || undefined || null) {
    setEmail((prev) => ({
      ...prev,
      errPosition: "hasError",
      errText: "Invalid email",
      loading: false,
    }));
    return true;
  } else if (password === "" || undefined || null) {
    setPassword((prev) => ({
      ...prev,
      errPosition: "hasError",
      errText: "Invalid password",
      loading: false,
    }));
    return true;
  }
  return false;
};
