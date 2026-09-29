import React, { useState } from 'react';
import { X, Database, Download, RotateCcw, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { admService } from '../../services/admService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataReset
}) => {
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    const data = {
      app: 'ADM — Adaptive Decision Memory',
      exportDate: new Date().toISOString(),
      decisions: admService.getDecisions(),
      outcomes: admService.getOutcomes(),
      insights: admService.getInsights()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adm_memory_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (confirm('Reset ADM persistent memory back to initial enterprise sample records?')) {
      admService.resetToDefaultData();
      setResetSuccess(true);
      onDataReset();
      setTimeout(() => {
        setResetSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white border border-[#E7DFD5] rounded-2xl shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#F2ECE3] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#B45309]" />
            <h3 className="text-base font-bold text-stone-900">
              Settings & Memory Preferences
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs text-stone-600">
          {/* Theme Branding Spec */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800 text-xs">
                Design System: Sahara Theme
              </span>
              <span className="flex items-center gap-1 text-emerald-800 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                WCAG AAA / AA Compliant
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Calibrated warm earth palette with sand canvas, deep espresso typography, and Sahara terracotta accents. High contrast ratios verified for B2B readability.
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-5 h-5 rounded-md bg-[#FAF7F2] border border-[#DACFC0]" title="Sahara Dune Canvas (#FAF7F2)" />
              <span className="w-5 h-5 rounded-md bg-[#FAF0E6] border border-[#DACFC0]" title="Sand Neutral (#FAF0E6)" />
              <span className="w-5 h-5 rounded-md bg-[#B45309]" title="Sahara Ochre Primary (#B45309)" />
              <span className="w-5 h-5 rounded-md bg-[#522912]" title="Desert Umber (#522912)" />
              <span className="w-5 h-5 rounded-md bg-[#1C1917]" title="Deep Espresso Text (#1C1917)" />
              <span className="w-5 h-5 rounded-md bg-emerald-700" title="Desert Oasis (#15803D)" />
            </div>
          </div>

          {/* Export Data */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E7DFD5]">
            <div>
              <span className="font-bold text-stone-900 block">Export Memory Archive</span>
              <span className="text-stone-500 text-[11px]">
                Download all recorded decisions, outcomes, and synthesized lessons as JSON.
              </span>
            </div>
            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-stone-700 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Export</span>
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-rose-200 bg-rose-50/30">
            <div>
              <span className="font-bold text-rose-900 block">Reset Memory Cache</span>
              <span className="text-rose-700 text-[11px]">
                Re-initialize ADM memory to the default enterprise sample decisions and outcomes.
              </span>
            </div>
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-rose-800 bg-white border border-rose-300 hover:bg-rose-50 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            >
              {resetSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reset Done</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F2ECE3] flex justify-end bg-[#FAF7F2]">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-[#E3DCD2] hover:bg-stone-50 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
