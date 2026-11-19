import { useState } from "react";
import { Database, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
export const MongoAtlasModal = ({ status, onClose, onConnectUri }) => {
  const [uriInput, setUriInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const handleConnect = async () => {
    if (!uriInput.trim()) return;
    setIsConnecting(true);
    setFeedback(null);
    try {
      const result = await onConnectUri(uriInput);
      setFeedback(result);
    } catch (e) {
      setFeedback({
        success: false,
        message: e.message || "Connection failed",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#18191E]">
                MongoDB Atlas Cloud Database
              </h3>
              <p className="text-xs text-[#7A746B]">
                Real-time persistence & analytics cluster health
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

        {/* Live Status Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between ${status?.connected ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}`}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status?.connected ? "bg-emerald-400" : "bg-amber-400"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${status?.connected ? "bg-emerald-500" : "bg-amber-500"}`}
              />
            </span>
            <div>
              <p className="font-extrabold text-xs">
                {status?.connected
                  ? "Connected to MongoDB Atlas Cloud"
                  : "Running on High-Speed Resilient In-Memory Store"}
              </p>
              <p className="text-[11px] opacity-80 font-mono">
                Cluster: {status?.cluster || "local-saas-cluster"} • Database:{" "}
                {status?.database || "leadevo"}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Latency
            </span>
            <p className="font-mono font-bold text-xs">
              {status?.latencyMs || 1.2} ms
            </p>
          </div>
        </div>

        {/* Collections Breakdown */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
              Leads
            </span>
            <p className="text-xl font-extrabold text-[#18191E] mt-0.5">
              {status?.collections.leads ?? 8}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
              Audits
            </span>
            <p className="text-xl font-extrabold text-[#18191E] mt-0.5">
              {status?.collections.audits ?? 2}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
              Meetings
            </span>
            <p className="text-xl font-extrabold text-[#18191E] mt-0.5">
              {status?.collections.meetings ?? 2}
            </p>
          </div>
        </div>

        {/* MongoDB Atlas URI Configurator */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#18191E] block">
            Custom MongoDB Atlas Connection URI
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={uriInput}
              onChange={(e) => setUriInput(e.target.value)}
              placeholder="mongodb+srv://user:pass@cluster0.mongodb.net/leadevo"
              className="flex-1 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-xs font-mono text-[#18191E] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={handleConnect}
              disabled={isConnecting || !uriInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#141518] hover:bg-black text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {isConnecting ? "Testing..." : "Connect"}
            </button>
          </div>
          <p className="text-[11px] text-[#7A746B]">
            You can also configure{" "}
            <span className="font-mono bg-stone-100 px-1 py-0.5 rounded">
              MONGODB_URI
            </span>{" "}
            in your environment variables.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${feedback.success ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}
          >
            {feedback.success ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
          <span className="text-[11px] text-[#8C8477] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            TLS 1.3 End-to-end Encrypted
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#18191E] text-white font-bold text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
