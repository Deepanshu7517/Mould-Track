import { cn } from "../../lib/utils";

export function HealthChart({ data = [], className }: any) {
  if (!data.length) return null;
  return (
    <div className={cn("w-full bg-card rounded-xl  p-6 shadow-sm", className)}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Machine Health Trends</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Hover bars for details</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" /> Optimal
            <div className="w-2.5 h-2.5 rounded-sm bg-[#ef4444] ml-2" /> Needs Attention
          </div>
        </div>
      </div>

      <div className="relative h-48 w-full mt-4">
        {/* Y-Axis Grid */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-l border-border/50">
          {[100, 50, 0].map((v) => (
            <div key={v} className="w-full border-t border-border/20 flex items-center relative">
              <span className="absolute -left-7 text-[9px] text-muted-foreground font-mono">{v}</span>
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="relative h-full flex items-end justify-between w-full gap-2 px-1">
          {data.map((item: any) => (
            <div key={item.month} className="flex-1 h-full flex flex-col justify-end items-center group relative min-w-0">
              
              {/* --- HOVER TOOLTIP START --- */}
              <div className="absolute z-30 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <div className="bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg flex flex-col items-center">
                  <span>{item.avgHealthScore}%</span>
                  {/* Small triangle at the bottom of the tooltip */}
                  <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-2 mt-[-4px]" />
                </div>
              </div>
              {/* --- HOVER TOOLTIP END --- */}

              <div 
                className="w-full max-w-[28px] rounded-t-sm transition-all duration-300 group-hover:brightness-110 group-hover:shadow-md cursor-pointer"
                style={{ 
                  height: `${item.avgHealthScore}%`,
                  backgroundColor: item.avgHealthScore < 80 ? '#ef4444' : '#10b981'
                }} 
              />
              
              <span className="absolute -bottom-7 text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-6" />
    </div>
  );
}