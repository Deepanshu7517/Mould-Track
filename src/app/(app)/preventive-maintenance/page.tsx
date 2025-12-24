'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/page-header';
import { Button } from '../../../components/ui/button';
import { FilterX, PlusCircle } from 'lucide-preact';
import { PMSchedule } from '../../../components/preventive-maintenance/pm-schedule';
import { PMStatusChart } from '../../../components/preventive-maintenance/pm-status-chart';
import { pmSchedule } from '../../../lib/data';
import type { PMTask } from '../../../lib/data';
import { useToast } from '../../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'pmScheduleTasks';

export default function PreventiveMaintenancePage() {
  // Read from localStorage first (if present), otherwise fall back to bundled pmSchedule
  const getInitialTasks = (): PMTask[] => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as PMTask[];
      }
    } catch (e) {
      // ignore parse errors
    }
    return pmSchedule;
  };

  const [tasks, setTasks] = useState<PMTask[]>(getInitialTasks);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Keep localStorage and state in sync when other tabs/windows write
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        try {
          const newVal = e.newValue ? (JSON.parse(e.newValue) as PMTask[]) : [];
          setTasks(newVal);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Optional: whenever tasks state changes, write to localStorage so changes persist and are visible
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore write errors
    }
  }, [tasks]);

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
        <Button
          onClick={() => {
            navigate('/preventive-maintenance/form');
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule PM Planning
        </Button>
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
// 'use client';

// import { useState } from 'react';
// import { PageHeader } from '../../../components/page-header';
// import { Button } from '../../../components/ui/button';
// import { FilterX, PlusCircle } from 'lucide-preact';
// import { PMSchedule } from '../../../components/preventive-maintenance/pm-schedule';
// import { PMStatusChart } from '../../../components/preventive-maintenance/pm-status-chart';
// import { pmSchedule } from '../../../lib/data';
// import type { PMTask } from '../../../lib/data';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// //   DialogTrigger,
// // } from '../../../components/ui/dialog';
// // import { PMScheduleForm } from '../../../components/preventive-maintenance/pm-schedule-form';
// import { useToast } from '../../../hooks/use-toast';
// import { useNavigate } from 'react-router-dom';

// export default function PreventiveMaintenancePage() {
//   const [tasks, setTasks] = useState<PMTask[]>(pmSchedule);
//   const [filterStatus, setFilterStatus] = useState<string | null>(null);
//   const [filterDate, setFilterDate] = useState<Date | null>(null);
//   // const [isFormOpen, setIsFormOpen] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate()
//   const handleStatusSelect = (status: string | null) => {
//     setFilterStatus(status);
//     setFilterDate(null); // Reset date filter when status is selected
//   };

//   const handleDateSelect = (date: Date | null) => {
//     setFilterDate(date);
//     if (date) {
//       setFilterStatus(null); // Reset status filter when a date is selected
//     }
//   };

//   const clearFilters = () => {
//     setFilterStatus(null);
//     setFilterDate(null);
//   };
//   // const handleScheduleSuccess = (newTaskData: Omit<PMTask, 'ticketId' | 'status'>) => {
//   //   const newTask: PMTask = {
//   //     ...newTaskData,
//   //     ticketId: `PM-00${tasks.length + 1}`,
//   //     status: 'Scheduled',
//   //   };
//   //   setTasks(prevTasks => [newTask, ...prevTasks]);
//   //   setIsFormOpen(false);
//   // }

//   const handleUpdateTaskStatus = (ticketId: string, status: PMTask['status']) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task =>
//         task.ticketId === ticketId ? { ...task, status } : task
//       )
//     );
//     toast({
//       title: 'Task Updated',
//       description: `Task ${ticketId} has been marked as ${status}.`,
//     });
//   };

//   const filteredTasks = tasks.filter(task => {
//     const statusMatch = filterStatus ? task.status === filterStatus : true;
//     const dateMatch = filterDate
//       ? new Date(task.dueDate).toDateString() === filterDate.toDateString()
//       : true;
//     return statusMatch && dateMatch;
//   });

//   const isFiltered = filterStatus !== null || filterDate !== null;

//   return (
//     <div className="space-y-8 max-md:pb-24 max-sm:pb-30 pb-12">
//       <PageHeader
//         title="Preventive Maintenance Planning"
//         description="Schedule, execute, and track regular maintenance tasks across all machines."
//       >
//         <Button onClick={() => {
//           navigate("/preventive-maintenance/form")
//         }}>
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Schedule PM Planning
//         </Button>
//         {/* <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Schedule PM Planning
//             </Button>
//           </DialogTrigger>
//           <DialogContent
//             className="sm:max-w-2xl"
//             onPointerDownOutside={(e) => e.preventDefault()}
//             onInteractOutside={(e) => e.preventDefault()}
//           >
//             <DialogHeader>
//               <DialogTitle>Schedule New PM Task</DialogTitle>
//               <DialogDescription>Fill out the form below to create a new maintenance task.</DialogDescription>
//             </DialogHeader>
//             <PMScheduleForm onSubmitSuccess={handleScheduleSuccess} />
//           </DialogContent>
//         </Dialog> */}
//       </PageHeader>

//       <div className="space-y-8">
//         <PMStatusChart
//           tasks={tasks}
//           onStatusSelect={handleStatusSelect}
//           activeStatus={filterStatus}
//         />

//         {isFiltered && (
//           <div className="flex justify-end">
//             <Button variant="outline" onClick={clearFilters}>
//               <FilterX className="mr-2 h-4 w-4" />
//               Clear Filters
//             </Button>
//           </div>
//         )}

//         <PMSchedule
//           tasks={filteredTasks}
//           allTasks={tasks}
//           onDateSelect={handleDateSelect}
//           selectedDate={filterDate}
//           onUpdateStatus={handleUpdateTaskStatus}
//         />
//       </div>
//     </div>
//   );
// }
