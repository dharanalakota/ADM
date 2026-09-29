import React, { useState } from 'react';
import { VendorProfile } from '../../types/adm';
import { 
  Building2, 
  Search, 
  Star, 
  CheckCircle2, 
  ShieldAlert, 
  Compass, 
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface VendorsViewProps {
  vendors: VendorProfile[];
  onAskAboutVendor: (vendorName: string) => void;
  onFilterVendorDecisions: (vendorName: string) => void;
}

export const VendorsView: React.FC<VendorsViewProps> = ({
  vendors,
  onAskAboutVendor,
  onFilterVendorDecisions
}) => {
  const [search, setSearch] = useState('');

  const filteredVendors = vendors.filter(v => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#522912] text-amber-200 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Vendor Memory Profiles
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Historical memory scorecards synthesized from real post-contract outcomes. Know their true operational performance before your next decision.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-4 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search vendor by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
          />
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.name}
            className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#DACFC0] transition-colors"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-[#F2ECE3] pb-3">
                <div>
                  <span className="text-xs font-medium text-stone-500 block mb-0.5">
                    {vendor.category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">
                    {vendor.name}
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs font-bold text-stone-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{vendor.averageRating} / 5</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {vendor.outcomesCount} outcome logs
                  </span>
                </div>
              </div>

              {/* Memory Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 border-b border-[#F2ECE3] text-center">
                <div className="p-2 rounded-lg bg-[#FAF7F2]">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Decisions</span>
                  <span className="text-sm font-bold text-stone-900 font-mono">{vendor.decisionsCount}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2]">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Success Rate</span>
                  <span className="text-sm font-bold text-emerald-800 font-mono">{vendor.successRate}%</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2]">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Last Active</span>
                  <span className="text-xs font-semibold text-stone-700 font-mono mt-0.5 block">{vendor.lastDecisionDate}</span>
                </div>
              </div>

              {/* Strengths & Recurring Risks */}
              <div className="mt-3 space-y-3 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Verified Strengths
                  </span>
                  <ul className="space-y-1 text-stone-700">
                    {vendor.keyStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider block mb-1">
                    Retained Risk Warnings
                  </span>
                  <ul className="space-y-1 text-stone-700">
                    {vendor.recurringRisks.map((risk, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <ShieldAlert className="w-3 h-3 text-[#B45309] shrink-0" />
                        <span className="line-clamp-1">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
              <button
                onClick={() => onFilterVendorDecisions(vendor.name)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
              >
                View Decision History ({vendor.decisionsCount})
              </button>

              <button
                onClick={() => onAskAboutVendor(vendor.name)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-2xs transition-colors"
              >
                <Compass className="w-3 h-3" />
                <span>Ask ADM</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
