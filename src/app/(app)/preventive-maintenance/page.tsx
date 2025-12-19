
'use client';

import { useState } from 'react';
import { PageHeader } from '../../../components/page-header';
import { Button } from '../../../components/ui/button';
import {  FilterX, PlusCircle } from 'lucide-preact';
import { PMSchedule } from '../../../components/preventive-maintenance/pm-schedule';
import { PMStatusChart } from '../../../components/preventive-maintenance/pm-status-chart';
import { pmSchedule } from '../../../lib/data';
import type { PMTask } from '../../../lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { PMScheduleForm } from '../../../components/preventive-maintenance/pm-schedule-form';
import { useToast } from '../../../hooks/use-toast';

export default function PreventiveMaintenancePage() {
  const [tasks, setTasks] = useState<PMTask[]>(pmSchedule);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleStatusSelect = (status: string | null) => {
    setFilterStatus(status);
    setFilterDate(null); // Reset date filter when status is selected
  };

  const handleDateSelect = (date: Date | null) => {
    setFilterDate(date);
    if (date) {
      setFilterStatus(null); // Reset status filter when a date is selected
    }
  };

  const clearFilters = () => {
    setFilterStatus(null);
    setFilterDate(null);
  };
  const handleScheduleSuccess = (newTaskData: Omit<PMTask, 'ticketId' | 'status'>) => {
    const newTask: PMTask = {
      ...newTaskData,
      ticketId: `PM-00${tasks.length + 1}`,
      status: 'Scheduled',
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setIsFormOpen(false);
  }

  const handleUpdateTaskStatus = (ticketId: string, status: PMTask['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.ticketId === ticketId ? { ...task, status } : task
      )
    );
    toast({
      title: 'Task Updated',
      description: `Task ${ticketId} has been marked as ${status}.`,
    });
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus ? task.status === filterStatus : true;
    const dateMatch = filterDate
      ? new Date(task.dueDate).toDateString() === filterDate.toDateString()
      : true;
    return statusMatch && dateMatch;
  });

  const isFiltered = filterStatus !== null || filterDate !== null;

  return (
    <div className="space-y-8 max-md:pb-24 max-sm:pb-30 pb-12">
      <PageHeader
        title="Preventive Maintenance Planning"
        description="Schedule, execute, and track regular maintenance tasks across all machines."
      >
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule PM Planning
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-2xl"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >

            <DialogHeader>
              <DialogTitle>Schedule New PM Task</DialogTitle>
              <DialogDescription>Fill out the form below to create a new maintenance task.</DialogDescription>
            </DialogHeader>
            <PMScheduleForm onSubmitSuccess={handleScheduleSuccess} />
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="space-y-8">
        <PMStatusChart
          tasks={tasks}
          onStatusSelect={handleStatusSelect}
          activeStatus={filterStatus}
        />

        {isFiltered && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}

        <PMSchedule
          tasks={filteredTasks}
          allTasks={tasks}
          onDateSelect={handleDateSelect}
          selectedDate={filterDate}
          onUpdateStatus={handleUpdateTaskStatus}
        />
      </div>
    </div>
  );
}
