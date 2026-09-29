import React from 'react';
import { Search, Bell, Plus, Compass, Menu, ArrowLeft } from 'lucide-react';
import { NavPage } from './Sidebar';

interface TopBarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectDecision?: (id: string) => void;
  onGoToLanding?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activePage,
  onNavigate,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  onGoToLanding
}) => {
  const getBreadcrumbTitle = (page: NavPage): string => {
    switch (page) {
      case 'overview':
        return 'Overview';
      case 'new-decision':
        return 'Record Decision';
      case 'decision-history':
        return 'Decision History';
      case 'outcomes':
        return 'Outcome Tracker';
      case 'ask-adm':
        return 'Ask ADM';
      case 'vendors':
        return 'Vendor Profiles';
      case 'insights':
        return 'Learned Patterns';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between border-b border-[#E7DFD5] bg-[#FAF7F2]/90 backdrop-blur-md px-4 sm:px-6">
      {/* Zone 1: Mobile menu toggle + Contextual title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-[#F4EFEA] md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-stone-500 font-medium hidden sm:inline">ADM</span>
          <span className="text-stone-300 hidden sm:inline" aria-hidden="true">/</span>
          <h1 className="font-semibold text-stone-900 tracking-tight">
            {getBreadcrumbTitle(activePage)}
          </h1>
        </div>
      </div>

      {/* Zone 2: Search input */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search decisions, vendors, outcomes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9.5 pr-4 py-1.5 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Zone 3: Primary Actions + Notifications */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-[#FAF7F2] border border-[#E3DCD2] hover:border-[#DACFC0] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            title="Return to Opening Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="hidden sm:inline">Opening Page</span>
            <span className="sm:hidden text-[11px]">Home</span>
          </button>
        )}

        {/* Ask ADM quick trigger button */}
        {activePage !== 'ask-adm' && (
          <button
            onClick={() => onNavigate('ask-adm')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-[#E3DCD2] rounded-lg hover:bg-[#F9F6F0] hover:text-[#7C2D12] transition-colors shadow-2xs whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Ask ADM</span>
          </button>
        )}

        {/* Primary CTA: Record Decision */}
        {activePage !== 'new-decision' && (
          <button
            onClick={() => onNavigate('new-decision')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Record Decision</span>
            <span className="xs:hidden">Record</span>
          </button>
        )}

        {/* Notification bell */}
        <button
          onClick={() => onNavigate('outcomes')}
          className="relative p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-[#F4EFEA] transition-colors"
          title="NovaTech Supplies outcome is pending recording"
          aria-label="Pending outcome alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B45309] ring-2 ring-[#FAF7F2]" />
        </button>
      </div>
    </header>
  );
};
