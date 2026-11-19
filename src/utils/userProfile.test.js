import test from "node:test";
import assert from "node:assert/strict";
import {
  getDefaultUserProfile,
  validateUserProfile,
  maskApiKey,
  AVATAR_PRESETS,
} from "./userProfile.js";
test("getDefaultUserProfile returns a valid complete user profile", () => {
  const profile = getDefaultUserProfile();
  assert.equal(profile.name, "Elena Rostova");
  assert.equal(profile.role, "Revenue Director");
  assert.equal(profile.email, "elena.rostova@leadevo.io");
  assert.ok(profile.avatarUrl.length > 0);
  assert.equal(profile.dailyGoalLeads, 350);
  const validation = validateUserProfile(profile);
  assert.equal(validation.isValid, true);
  assert.equal(Object.keys(validation.errors).length, 0);
});
test("validateUserProfile catches invalid email and empty name", () => {
  const invalidProfile = {
    name: " ",
    email: "not-an-email",
    dailyGoalLeads: -5,
  };
  const validation = validateUserProfile(invalidProfile);
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors.name);
  assert.ok(validation.errors.email);
  assert.ok(validation.errors.dailyGoalLeads);
});
test("maskApiKey obfuscates sensitive secret token correctly", () => {
  const masked = maskApiKey("evo_live_sec_99a8f27e10b42c67");
  assert.ok(masked.startsWith("evo_live"));
  assert.ok(masked.endsWith("2c67"));
  assert.ok(
    masked.includes(
      "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    ),
  );
});
test("AVATAR_PRESETS provides at least 3 high-quality avatars", () => {
  assert.ok(AVATAR_PRESETS.length >= 3);
  assert.ok(AVATAR_PRESETS.some((a) => a.url.includes("elena_rostova")));
});
