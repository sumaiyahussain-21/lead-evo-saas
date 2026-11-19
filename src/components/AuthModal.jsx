import { useState } from "react";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import { authApi } from "../services/api";
export const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("elena.rostova@leadevo.io");
  const [password, setPassword] = useState("lead-evo-pass-2026");
  const [name, setName] = useState("Elena Rostova");
  const [company, setCompany] = useState("Lead Evo Enterprise");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login({
        email: "elena.rostova@leadevo.io",
        password: "demo",
      });
      if (data.success) {
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = isRegister
        ? await authApi.register({ email, name, company })
        : await authApi.login({ email, password });
      if (data.success) {
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        setError("Authentication error");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141518] text-amber-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#18191E]">
                {isRegister
                  ? "Create Lead Evo Account"
                  : "Secure Portal Sign In"}
              </h3>
              <p className="text-xs text-[#7A746B]">
                JWT Protected Session & MongoDB Atlas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* 1-Click Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full p-3 rounded-2xl bg-[#FEEFC3] hover:bg-[#FDE7A9] border border-[#ECD9A0] text-[#7A5200] font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>1-Click Demo Sign In as Elena Rostova</span>
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#8C8477]">
          <div className="flex-1 h-px bg-[#ECE6DB]" />
          <span>or sign in with email</span>
          <div className="flex-1 h-px bg-[#ECE6DB]" />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="font-bold text-[#18191E] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-medium text-[#18191E]"
                />
              </div>

              <div>
                <label className="font-bold text-[#18191E] block mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-medium text-[#18191E]"
                />
              </div>
            </>
          )}

          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-medium text-[#18191E]"
            />
          </div>

          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-medium text-[#18191E]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-[#141518] hover:bg-black text-white font-extrabold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : isRegister
                ? "Create Account"
                : "Authenticate Session"}
          </button>
        </form>

        <div className="pt-2 text-center text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-amber-800 hover:underline font-semibold"
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};
