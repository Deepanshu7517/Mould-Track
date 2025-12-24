
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
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
import {  MoreVertical, Calendar, CheckCircle } from 'lucide-preact';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../../components/ui/dialog';
import { PMCalendar } from './pm-calendar';
import type { PMTask } from '../../lib/data';

const statusVariant: {
  [key: string]: 'default' | 'destructive' | 'secondary' | 'outline';
} = {
  Completed: 'default',
  'In Progress': 'secondary',
  Overdue: 'destructive',
  Scheduled: 'outline',
};

interface PMScheduleProps {
  tasks: PMTask[];
  allTasks: PMTask[];
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
  onUpdateStatus: (ticketId: string, status: PMTask['status']) => void;
}

export function PMSchedule({ tasks, allTasks, onDateSelect, selectedDate, onUpdateStatus }: PMScheduleProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [checklistTask, setChecklistTask] = useState<PMTask | null>(null);

  
  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date || null);
    // setIsCalendarOpen(false); // Removed so the dialog stays open
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>PM Schedule & Checklists</CardTitle>
            <CardDescription>
              View and manage all upcoming and overdue maintenance tasks.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Preventive Maintenance Calendar</DialogTitle>
                </DialogHeader>
                <PMCalendar
                  events={allTasks}
                  onDateSelect={handleDateSelect} // Use the updated handler
                  selectedDate={selectedDate || undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={!!checklistTask} onOpenChange={(isOpen) => !isOpen && setChecklistTask(null)}>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket No.</TableHead>
                  <TableHead>Mould</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Checksheet</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((item) => (
                  <TableRow key={item.ticketId}>
                    <TableCell className="font-medium">{item.ticketId}</TableCell>
                    <TableCell>
                      <div>{item.mouldName}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.mouldId}
                      </div>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.activity}</TableCell>
                    <TableCell>{item.checksheets}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[item.status]} className={item.status === 'Completed' ? 'bg-green-500' : ''}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.assignee}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem onSelect={() => setChecklistTask(item)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Checklist
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onSelect={() => onUpdateStatus(item.ticketId, 'Completed')}
                            disabled={item.status === 'Completed'}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Completion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Maintenance Checklist for {checklistTask?.ticketId}</DialogTitle>
              <DialogDescription>
                Activity: {checklistTask?.activity} for {checklistTask?.mouldName}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-2">
              {checklistTask?.checklist && checklistTask.checklist.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {checklistTask.checklist.map((check, index) => (
                    <li key={index}>{check}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No checklist items defined for this task.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
