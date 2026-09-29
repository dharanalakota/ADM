import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  CheckSquare, 
  Compass, 
  Building2, 
  Lightbulb, 
  Settings,
  Database,
  ArrowLeft,
  X
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export type NavPage = 
  | 'overview' 
  | 'new-decision' 
  | 'decision-history' 
  | 'outcomes' 
  | 'ask-adm' 
  | 'vendors' 
  | 'insights';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenSettings: () => void;
  onGoToLanding?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  pendingOutcomesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  onOpenSettings,
  onGoToLanding,
  isMobileOpen = false,
  onCloseMobile,
  pendingOutcomesCount = 1
}) => {
  const navItems: Array<{
    id: NavPage;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'new-decision', label: 'New Decision', icon: PlusCircle },
    { id: 'decision-history', label: 'Decision History', icon: History },
    { id: 'outcomes', label: 'Outcomes', icon: CheckSquare, badge: pendingOutcomesCount },
    { id: 'ask-adm', label: 'Ask ADM', icon: Compass },
    { id: 'vendors', label: 'Vendors', icon: Building2 },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed md:sticky top-0 z-50 flex h-screen w-64 flex-col border-r border-[#E7DFD5] bg-[#FAF7F2] transition-transform duration-200 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-18 items-center justify-between border-b border-[#E7DFD5] px-5 bg-[#FAF7F2]">
          <button 
            onClick={() => onGoToLanding && onGoToLanding()}
            className="text-left hover:opacity-90 transition-opacity"
            title="Return to Product Landing Page"
          >
            <BrandLogo />
          </button>
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Back to Opening Page CTA */}
          {onGoToLanding && (
            <button
              onClick={() => {
                onGoToLanding();
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-[#7C2D12] bg-[#FAF0E6] border border-[#E7DFD5] hover:bg-[#F5E8D8] rounded-lg transition-colors mb-4 group shadow-2xs"
              title="Return to Opening Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#B45309] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Opening Page</span>
            </button>
          )}

          <div className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
            Platform
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`group flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EFE8DF] text-[#7C2D12] font-semibold shadow-xs'
                      : 'text-stone-600 hover:bg-[#F4EFEA] hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#B45309]' : 'text-stone-400 group-hover:text-stone-700'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span 
                      className={`text-xs font-mono font-medium px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-[#D97706]/20 text-[#9A3412]' : 'bg-[#EAE4D7] text-stone-600'
                      }`}
                      title={`${item.badge} pending outcome recording`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Memory Status Callout */}
          <div className="mt-8 rounded-xl border border-[#E7DFD5] bg-[#F4EFEA] p-3 text-xs">
            <div className="flex items-center gap-2 font-medium text-stone-800">
              <Database className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Persistent Memory</span>
            </div>
            <p className="mt-1 text-stone-600 leading-relaxed text-[11px]">
              ADM retains past decisions and outcomes as historical evidence.
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-[#E5DDD2]">
              <span>Memory sync</span>
              <span className="font-mono text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Bottom footer: Settings & User profile */}
        <div className="border-t border-[#E7DFD5] p-3 space-y-1 bg-[#FAF7F2]">
          <button
            onClick={onOpenSettings}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-stone-600 rounded-lg hover:bg-[#F4EFEA] hover:text-stone-900 transition-colors"
          >
            <Settings className="w-4 h-4 text-stone-400" />
            <span>Settings & Memory</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-2.5 pt-2 border-t border-[#ECE5DC]">
            <div className="w-8 h-8 rounded-full bg-[#E5DDD2] text-[#7C2D12] flex items-center justify-center font-bold text-xs shrink-0 border border-[#DACFC0]">
              SC
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-stone-900 truncate">
                Sarah Chen
              </span>
              <span className="text-[11px] text-stone-500 truncate">
                Procurement & Ops
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
