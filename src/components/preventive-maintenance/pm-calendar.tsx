
'use client';

import { Calendar } from '../../components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { format, parseISO, isSameDay } from 'date-fns';
import type { PMTask } from '../../lib/data';

interface PMCalendarProps {
  events: PMTask[];
  onDateSelect: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

const statusVariant: {
  [key: string]: 'default' | 'destructive' | 'secondary' | 'outline';
} = {
  Completed: 'default',
  'In Progress': 'secondary',
  Overdue: 'destructive',
  Scheduled: 'outline',
};

export function PMCalendar({ events, onDateSelect, selectedDate }: PMCalendarProps) {

  const dueDates = events.map((event) => parseISO(event.dueDate));

  const eventsForSelectedDay = selectedDate
    ? events.filter((event) => isSameDay(parseISO(event.dueDate), selectedDate))
    : [];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      <Calendar
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border-none" // Removed border to match your beige style
        modifiers={{
          due: dueDates,
        }}
      />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Tasks for{' '}
          {selectedDate ? format(selectedDate, 'PPP') : 'the selected date'}
        </h3>
        {eventsForSelectedDay.length > 0 ? (
          <div className="space-y-4">
            {eventsForSelectedDay.map((event, index) => (
              <Card key={index}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{event.activity}</CardTitle>
                  <CardDescription>
                    {event.machineName} ({event.machineId})
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between p-4 pt-0">
                  <span className="text-sm text-muted-foreground">
                    {event.assignee}
                  </span>
                  <Badge variant={statusVariant[event.status]}>
                    {event.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No maintenance tasks scheduled for this day.
          </p>
        )}
      </div>
    </div>
  );
}
