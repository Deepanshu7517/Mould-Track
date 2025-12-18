
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
import { cn } from '../../lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-preact';

const qualityData = [
  {
    date: '2023-11-05',
    rejectionRate: 3.2,
    reason: 'Sink Marks',
    trend: 'up',
  },
  {
    date: '2023-11-04',
    rejectionRate: 2.8,
    reason: 'Sink Marks',
    trend: 'up',
  },
  {
    date: '2023-11-03',
    rejectionRate: 1.5,
    reason: 'Flash',
    trend: 'down',
  },
  {
    date: '2023-11-02',
    rejectionRate: 1.8,
    reason: 'Flash',
    trend: 'down',
  },
  {
    date: '2023-11-01',
    rejectionRate: 2.1,
    reason: 'Warpage',
    trend: 'up',
  },
];

export function QualityDataTable() {
  const getRateColor = (rate: number) => {
    if (rate > 2.5) return 'text-destructive';
    if (rate > 1.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Rejection Rate</TableHead>
              <TableHead>Primary Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityData.map((item) => (
              <TableRow key={item.date}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell
                  className={cn('text-right font-bold', getRateColor(item.rejectionRate))}
                >
                    <div className="flex items-center justify-end gap-2">
                        {item.trend === 'up' ? <ArrowUp className="h-4 w-4 text-destructive" /> : <ArrowDown className="h-4 w-4 text-green-500" />}
                        {item.rejectionRate.toFixed(1)}%
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.reason}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
