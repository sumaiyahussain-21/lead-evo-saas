import { useState } from "react";
import {
  Layers,
  Lock,
  Mail,
  User as UserIcon,
  Building,
  Briefcase,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Zap,
} from "lucide-react";
import { authApi } from "../services/api";
import {
  validateLoginForm,
  validateSignUpForm,
  calculatePasswordStrength,
} from "../utils/auth";
export const AuthScreen = ({
  onAuthSuccess,
  onBackToPortal,
  backButtonLabel,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState(initialMode);
  const [loginEmail, setLoginEmail] = useState("elena.rostova@leadevo.io");
  const [loginPassword, setLoginPassword] = useState("lead-evo-pass-2026");
  const [rememberMe, setRememberMe] = useState(true);
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpCompany, setSignUpCompany] = useState("");
  const [signUpRole, setSignUpRole] = useState("Revenue Director");
  const [signUpPhone, setSignUpPhone] = useState("+1 (415) 892-0419");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const handleInstantDemoLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await authApi.login({
        email: "elena.rostova@leadevo.io",
        password: "demo",
      });
      if (data.success) {
        setSuccessMessage(
          "Welcome back, Elena Rostova! Redirecting to dashboard...",
        );
        setTimeout(() => {
          onAuthSuccess(data.user, data.token);
        }, 600);
      } else {
        setErrorMessage("Demo login failed");
      }
    } catch (err) {
      setErrorMessage(err.message || "Network error during login");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSso = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await authApi.login({
        email: "elena.rostova@leadevo.io",
        password: "demo",
      });
      if (data.success) {
        setSuccessMessage("Authenticated via Google Workspace SSO!");
        setTimeout(() => {
          onAuthSuccess(data.user, data.token);
        }, 600);
      } else {
        setErrorMessage("Google SSO failed");
      }
    } catch (err) {
      setErrorMessage(err.message || "Google SSO error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const validation = validateLoginForm({
      email: loginEmail,
      password: loginPassword,
      rememberMe,
    });
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const data = await authApi.login({
        email: loginEmail,
        password: loginPassword,
      });
      if (data.success) {
        setSuccessMessage(`Authenticated successfully as ${data.user.name}`);
        setTimeout(() => {
          onAuthSuccess(data.user, data.token);
        }, 500);
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err) {
      setErrorMessage(err.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const validation = validateSignUpForm({
      name: signUpName,
      email: signUpEmail,
      company: signUpCompany,
      role: signUpRole,
      phone: signUpPhone,
      password: signUpPassword,
      agreeToTerms,
    });
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const data = await authApi.register({
        name: signUpName,
        email: signUpEmail,
        company: signUpCompany,
      });
      if (data.success) {
        setSuccessMessage(
          `Account created for ${data.user.name}! Logging in...`,
        );
        setTimeout(() => {
          onAuthSuccess(data.user, data.token);
        }, 600);
      } else {
        setErrorMessage("Failed to create account");
      }
    } catch (err) {
      setErrorMessage(err.message || "Server error during sign up");
    } finally {
      setIsLoading(false);
    }
  };
  const passwordStrength = calculatePasswordStrength(signUpPassword);
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141518] antialiased flex flex-col justify-between selection:bg-amber-200">
      {/* Top Header Bar */}
      <header className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-[#EBE4D8] bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#141518] to-[#252830] flex items-center justify-center text-amber-400 shadow-sm border border-stone-800">
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-[#141518]">
              Lead Evo
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-[#141518]">
              PRO
            </span>
          </div>
        </div>

        {onBackToPortal && (
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#666056] hover:text-[#141518] hover:bg-white border border-transparent hover:border-[#E0D7C9] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backButtonLabel || "Return to Dashboard"}</span>
          </button>
        )}
      </header>

      {/* Main Split Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] bg-white">
          {/* Left Column: Dark Luxury Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141518] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Gold Radial Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Brand Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-xs font-medium text-amber-300">
                <Zap className="w-3.5 h-3.5 fill-amber-300" />
                <span>Next-Gen Enterprise Lead Engine</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  Close high-value accounts on{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                    WhatsApp & AI Meet.
                  </span>
                </h1>
                <p className="text-xs text-stone-300 leading-relaxed max-w-md">
                  Discover verified mobile decision-makers, launch targeted
                  multi-channel outreach, and automatically book qualified VIP
                  discovery calls in seconds.
                </p>
              </div>

              {/* Key Quantitative Proof Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p className="text-2xl font-extrabold text-amber-400 font-mono">
                    94%
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">
                    WhatsApp Read Rate
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p className="text-2xl font-extrabold text-white font-mono">
                    4.8k+
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">
                    Verified B2B Leads
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p className="text-2xl font-extrabold text-emerald-400 font-mono">
                    142
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">
                    Monthly VIP Calls
                  </p>
                </div>
              </div>

              {/* Authentic Testimonial Quote */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
                <p className="text-xs italic text-stone-200 leading-relaxed">
                  "Lead Evo gave our sales team instant access to verified
                  mobile numbers and automatic website redesign pitches. Our
                  booked meeting velocity tripled in our first month."
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <img
                    src="[https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90)"
                    alt="Elena Rostova"
                    className="w-9 h-9 rounded-full object-cover border border-amber-400/80 shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      Elena Rostova
                    </p>
                    <p className="text-[11px] text-amber-400 leading-tight">
                      Revenue Director • Lead Evo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Security Footer */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span>Meta Cloud API Verified</span>
            </div>
          </div>

          {/* Right Column: High-Converting Auth Surface (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Segmented Mode Switcher (Sign In vs Create Account) */}
              <div className="flex items-center p-1.5 bg-[#EDE7DB] rounded-2xl border border-[#DFD8CC]">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setFieldErrors({});
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${mode === "login" ? "bg-white text-[#141518] shadow-sm" : "text-[#6E685F] hover:text-[#141518]"}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setFieldErrors({});
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${mode === "signup" ? "bg-white text-[#141518] shadow-sm" : "text-[#6E685F] hover:text-[#141518]"}`}
                >
                  Create Account
                </button>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#141518] tracking-tight">
                  {mode === "login"
                    ? "Welcome back to Lead Evo"
                    : "Start your Lead Evo workspace"}
                </h2>
                <p className="text-xs text-[#7A746B] mt-1">
                  {mode === "login"
                    ? "Enter your credentials to access live pipeline and verified leads."
                    : "Get started with 4,800+ decision makers and multi-channel outreach."}
                </p>
              </div>

              {/* Alerts */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* 1-Click Instant Demo Login Button (Available in both modes) */}
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                disabled={isLoading}
                className="w-full p-3 rounded-2xl bg-[#FEEFC3] hover:bg-[#FDE7A9] border border-[#ECD9A0] text-[#7A5200] font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span className="font-extrabold">
                    1-Click Instant Demo Login (Elena Rostova)
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </button>

              {/* Social Login: Google Workspace */}
              <button
                type="button"
                onClick={handleGoogleSso}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-[#DDD6C8] text-[#141518] text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Workspace</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-[#9E978C]">
                <div className="flex-1 h-px bg-[#E4DDD1]" />
                <span>or continue with email</span>
                <div className="flex-1 h-px bg-[#E4DDD1]" />
              </div>

              {/* ----------------- MODE A: SIGN IN FORM ----------------- */}
              {mode === "login" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#141518] mb-1">
                      Work Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@company.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-xs text-[#141518] placeholder-[#9E978C] focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-xs ${fieldErrors.email ? "border-rose-400 ring-1 ring-rose-300" : "border-[#E0D7C9]"}`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#141518]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordModal(true)}
                        className="text-[11px] font-semibold text-amber-800 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border text-xs text-[#141518] placeholder-[#9E978C] focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-xs ${fieldErrors.password ? "border-rose-400 ring-1 ring-rose-300" : "border-[#E0D7C9]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E978C] hover:text-[#141518] cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                      />
                      <span className="text-xs text-[#6E685F]">
                        Remember this device for 30 days
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>
                      {isLoading ? "Authenticating..." : "Sign In to Portal"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* ----------------- MODE B: SIGN UP FORM ----------------- */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#141518] mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                        <input
                          type="text"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="e.g. Marcus Thorne"
                          className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${fieldErrors.name ? "border-rose-400" : "border-[#E0D7C9]"}`}
                        />
                      </div>
                      {fieldErrors.name && (
                        <p className="text-[10px] text-rose-500 mt-1">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#141518] mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                        <input
                          type="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="marcus@company.io"
                          className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${fieldErrors.email ? "border-rose-400" : "border-[#E0D7C9]"}`}
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[10px] text-rose-500 mt-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#141518] mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                        <input
                          type="text"
                          value={signUpCompany}
                          onChange={(e) => setSignUpCompany(e.target.value)}
                          placeholder="Apex Commerce"
                          className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${fieldErrors.company ? "border-rose-400" : "border-[#E0D7C9]"}`}
                        />
                      </div>
                      {fieldErrors.company && (
                        <p className="text-[10px] text-rose-500 mt-1">
                          {fieldErrors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#141518] mb-1">
                        Job Role / Title{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                        <select
                          value={signUpRole}
                          onChange={(e) => setSignUpRole(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                        >
                          <option value="Revenue Director">
                            Revenue Director
                          </option>
                          <option value="Founder & CEO">Founder & CEO</option>
                          <option value="Head of Sales / Growth">
                            Head of Sales / Growth
                          </option>
                          <option value="VP Commercial Operations">
                            VP Commercial Operations
                          </option>
                          <option value="Marketing Lead">Marketing Lead</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#141518] mb-1">
                      Direct WhatsApp Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                      <input
                        type="text"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        placeholder="+1 (415) 892-0419"
                        className="w-full pl-10 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs font-mono text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#141518] mb-1">
                      Create Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className={`w-full pl-10 pr-10 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${fieldErrors.password ? "border-rose-400" : "border-[#E0D7C9]"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E978C] hover:text-[#141518] cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {signUpPassword.length > 0 && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-stone-200 overflow-hidden flex gap-1">
                          <div
                            className={`h-full transition-all ${passwordStrength.color}`}
                            style={{
                              width: `${(passwordStrength.score / 4) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#6E685F]">
                          {passwordStrength.label}
                        </span>
                      </div>
                    )}
                    {fieldErrors.password && (
                      <p className="text-[10px] text-rose-500 mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded mt-0.5 cursor-pointer"
                      />
                      <span className="text-[11px] text-[#6E685F] leading-tight">
                        I agree to Lead Evo's Terms of Service, Privacy Policy,
                        and Meta WhatsApp Cloud API data processing agreements.
                      </span>
                    </label>
                    {fieldErrors.agreeToTerms && (
                      <p className="text-[10px] text-rose-500 mt-1">
                        {fieldErrors.agreeToTerms}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-[#141518] hover:bg-black text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>
                      {isLoading
                        ? "Creating Workspace..."
                        : "Create Lead Evo Workspace"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>
                </form>
              )}

              {/* Toggle Mode Footer */}
              <div className="pt-2 text-center text-xs text-[#7A746B]">
                {mode === "login" ? (
                  <span>
                    Don't have an enterprise workspace yet?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-bold text-[#141518] hover:underline cursor-pointer"
                    >
                      Sign up for free
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-bold text-[#141518] hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-[#EDE8DF] space-y-4">
            <h3 className="text-base font-extrabold text-[#141518]">
              Reset Account Password
            </h3>
            <p className="text-xs text-[#7A746B]">
              Enter your work email address and we'll send you a secure
              verification link to reset your credentials.
            </p>
            {resetSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Password reset instructions sent to{" "}
                  {resetEmail || "your email"}!
                </span>
              </div>
            ) : (
              <div>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
            )}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordModal(false);
                  setResetSent(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#6E685F] hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>
              {!resetSent && (
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className="px-4 py-2 rounded-xl bg-[#141518] text-white text-xs font-bold hover:bg-black cursor-pointer"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Footer */}
      <footer className="py-4 px-6 text-center text-xs text-[#9E978C] border-t border-[#EBE4D8]">
        © 2026 Lead Evo Inc. Enterprise Conversion Engine · All rights reserved.
      </footer>
    </div>
  );
};
