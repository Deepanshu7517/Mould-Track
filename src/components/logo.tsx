import { Factory } from 'lucide-preact';
import { cn } from '../lib/utils';

export function Logo({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Factory className="h-7 w-7 text-primary" />
      <span className={cn("text-xl font-bold font-headline tracking-tighter", textClassName)}>
        MouldTrack
      </span>
    </div>
  );
}
