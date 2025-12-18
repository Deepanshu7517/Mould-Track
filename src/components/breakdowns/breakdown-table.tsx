
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import { cn } from '../../lib/utils';
import type { BreakdownLog } from '../../lib/data';
import { formatDistanceToNow, format } from 'date-fns';
import { CheckCircle2, ShieldAlert } from 'lucide-preact';
import { useToast } from '../../hooks/use-toast';

interface BreakdownTableProps {
    breakdownLogs: BreakdownLog[];
    onCloseTicket: (id: string) => void;
}

export function BreakdownTable({ breakdownLogs, onCloseTicket }: BreakdownTableProps) {
    const { toast } = useToast();

    const handleCloseTicket = (id: string) => {
        onCloseTicket(id);
        toast({
            title: "Ticket Closed",
            description: `Breakdown log ${id} has been marked as closed.`,
        });
    }

  return (
    <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Machine</TableHead>
              <TableHead>Root Cause</TableHead>
              <TableHead>Downtime</TableHead>
              <TableHead>Recurrence</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {breakdownLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                    <div>{log.machineId}</div>
                    <div className="text-xs text-muted-foreground">{log.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{log.rootCause}</Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span>
                          {formatDistanceToNow(new Date(log.downtimeStart), {
                            addSuffix: true,
                          })}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Started: {format(new Date(log.downtimeStart), "PPpp")}</p>
                        {log.downtimeEnd && <p>Ended: {format(new Date(log.downtimeEnd), "PPpp")}</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{log.recurrence}</TableCell>
                <TableCell>
                  <Badge
                    variant={log.status === 'Open' ? 'destructive' : 'default'}
                    className={cn("capitalize gap-1", log.status === 'Closed' && "bg-green-600")}
                  >
                    {log.status === 'Open' ? <ShieldAlert className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCloseTicket(log.id)}
                    disabled={log.status === 'Closed'}
                  >
                    Verify & Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
