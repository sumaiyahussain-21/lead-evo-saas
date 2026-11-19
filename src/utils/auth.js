export function validateLoginForm(data) {
  const errors = {};
  if (!data.email || !data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid work email address";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
export function validateSignUpForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters";
  }
  if (!data.email || !data.email.trim()) {
    errors.email = "Work email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid business email";
  }
  if (!data.company || data.company.trim().length < 2) {
    errors.company = "Company name is required";
  }
  if (!data.role || !data.role.trim()) {
    errors.role = "Role or title is required";
  }
  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!data.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the Terms of Service";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
export function calculatePasswordStrength(password) {
  if (!password || password.length < 4) {
    return { score: 0, label: "Too Short", color: "bg-stone-300" };
  }
  let score = 1;
  if (password.length >= 8) score++;
  if (/[0-9]/.test(password)) score++;
  if (
    /[^A-Za-z0-9]/.test(password) ||
    (/[A-Z]/.test(password) && /[a-z]/.test(password))
  )
    score++;
  switch (score) {
    case 1:
      return { score: 1, label: "Weak", color: "bg-rose-500" };
    case 2:
      return { score: 2, label: "Fair", color: "bg-amber-500" };
    case 3:
      return { score: 3, label: "Good", color: "bg-blue-500" };
    case 4:
    default:
      return { score: 4, label: "Strong", color: "bg-emerald-500" };
  }
}
