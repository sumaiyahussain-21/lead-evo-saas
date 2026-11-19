import { X, Star, ShieldCheck } from "lucide-react";
export const ReviewsModal = ({ isOpen, onClose, onStartFree }) => {
  if (!isOpen) return null;
  const reviews = [
    {
      id: "rev_1",
      name: "Elena Rostova",
      role: "Revenue Director",
      company: "Lead Evo Enterprise",
      avatar:
        "[https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90)",
      rating: 5,
      date: "Verified Enterprise Client \u2022 3 days ago",
      title: "Our booked meeting velocity tripled in our first month",
      text: "Lead Evo gave our sales team instant access to verified mobile numbers and automatic website redesign pitches. The combination of WhatsApp verification and 1-click meeting rooms made our pipeline conversion unstoppable.",
      stats: "310% increase in booked demos",
    },
    {
      id: "rev_2",
      name: "Marcus Thorne",
      role: "VP Commercial Operations",
      company: "Apex Commerce",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Verified Enterprise Client \u2022 1 week ago",
      title: "Eliminated wasted SDR outreach completely",
      text: "Filtering out dead landlines and unverified numbers prior to sending was a game changer. We reached an honest 94% read rate on our personalized WhatsApp sequences.",
      stats: "94% WhatsApp Open Rate",
    },
    {
      id: "rev_3",
      name: "Amanda Cruz",
      role: "Head of Growth",
      company: "FinTech Cloud Bus",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Verified Client \u2022 2 weeks ago",
      title: "The 0.4s AI Receptionist books meetings while we sleep",
      text: "Prospective buyers who submitted forms after hours got qualified via real voice within 30 seconds and were instantly scheduled into our Google Meet slots.",
      stats: "42 qualified inbound meetings in 14 days",
    },
    {
      id: "rev_4",
      name: "David Vance",
      role: "Founder & Managing Director",
      company: "ScaleVenture Labs",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Verified Client \u2022 3 weeks ago",
      title: "Generated $80k ARR in closed deals from SEO pitches",
      text: "We ran 1-click SEO audits and portfolio mockups for enterprise leads. Pitching clients with real data made closing high-ticket retainers remarkably straightforward.",
      stats: "$80,000 Closed Pipeline",
    },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-[32px] bg-white border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 text-[#141518] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close reviews"
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#141518] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5 Rating from 180+ Enterprise Teams</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141518] tracking-tight">
            Customer Reviews & Success Stories
          </h2>
          <p className="text-xs text-[#7A746B]">
            See how top-performing revenue leaders scale their outbound and VIP
            conversion engines with Lead Evo.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2.5">
                {/* Stars and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8F887C]">{rev.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-sm text-[#141518]">
                  {rev.title}
                </h3>

                {/* Quote Text */}
                <p className="text-xs text-[#524D44] leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Proof Badge */}
              <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border border-amber-400 shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#141518] leading-tight">
                      {rev.name}
                    </p>
                    <p className="text-[11px] text-[#7A746B] leading-tight">
                      {rev.role} • {rev.company}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {rev.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-[#EDE7DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#666056]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Meta WhatsApp Cloud API Certified Partner · 256-Bit SSL</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onStartFree();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Start Free Trial Now
          </button>
        </div>
      </div>
    </div>
  );
};
