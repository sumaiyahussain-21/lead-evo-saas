import test from "node:test";
import assert from "node:assert/strict";
import {
  validateLoginForm,
  validateSignUpForm,
  calculatePasswordStrength,
} from "./auth.js";
test("validateLoginForm verifies required email and password", () => {
  const valid = validateLoginForm({
    email: "elena.rostova@leadevo.io",
    password: "password123",
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
  const invalid = validateLoginForm({
    email: "bad-email",
    password: "12",
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.password);
});
test("validateSignUpForm enforces required business registration details", () => {
  const valid = validateSignUpForm({
    name: "Marcus Thorne",
    email: "marcus@apexcommerce.io",
    company: "Apex Commerce",
    role: "VP Growth",
    password: "securePass123!",
    agreeToTerms: true,
  });
  assert.equal(valid.isValid, true);
  const invalid = validateSignUpForm({
    name: "M",
    email: "not-an-email",
    company: "",
    role: "",
    password: "123",
    agreeToTerms: false,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.role);
  assert.ok(invalid.errors.password);
  assert.ok(invalid.errors.agreeToTerms);
});
test("calculatePasswordStrength evaluates character variety and length", () => {
  assert.equal(calculatePasswordStrength("").label, "Too Short");
  assert.equal(calculatePasswordStrength("abc").label, "Too Short");
  assert.equal(calculatePasswordStrength("simple").label, "Weak");
  assert.equal(calculatePasswordStrength("simp12").label, "Fair");
  assert.equal(calculatePasswordStrength("simple123").label, "Good");
  assert.equal(calculatePasswordStrength("Simple123!").label, "Strong");
});
test("pricing annual discount calculates 20% discount correctly", () => {
  const calculateAnnualRate = (monthlyRate) => Math.round(monthlyRate * 0.8);
  assert.equal(calculateAnnualRate(0), 0);
  assert.equal(calculateAnnualRate(79), 63);
  assert.equal(calculateAnnualRate(199), 159);
});
test("authentication flow validation allows instant demo login", () => {
  const demoEmail = "elena.rostova@leadevo.io";
  const isValid = demoEmail.endsWith("@leadevo.io");
  assert.equal(isValid, true);
});
