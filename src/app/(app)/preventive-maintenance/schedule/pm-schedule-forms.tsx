'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { useToast } from '../../../../hooks/use-toast';
import {
  checksheetData,
  type Checksheet,
  mouldSelectionOptions,
  type PMTask,
} from '../../../../lib/data';
import { addDays, format } from 'date-fns';
import { PreactCombobox as Combobox } from './combobox';
import { Card, CardContent, CardDescription } from '../../../../components/ui/card';
import { CalendarDays } from 'lucide-preact';
import { PageHeader } from '../../../../components/page-header';
import { useNavigate } from 'react-router-dom';

interface ScheduleFormValues {
  mouldId: string;
  location: string;
  assignee: string;
  checksheetId: string;
  activity: string;
}

const LOCAL_STORAGE_KEY = 'pmScheduleTasks';

const mouldOptions = mouldSelectionOptions.map(m => ({ value: m.mould_id_no, label: `${m.model} (${m.mould_no}) ${m.mould_id_no}` }));
const checksheetOptions = checksheetData.map(cs => ({ value: cs.id, label: cs.name }));

type FormFieldConfig = {
  name: keyof ScheduleFormValues;
  label: string;
  type: 'combobox' | 'text';
  placeholder?: string;
  options?: { value: string; label: string }[];
  searchPlaceholder?: string;
  onSelect?: (value: string) => void;
  rules?: object;
};

export function PMScheduleForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedChecksheet, setSelectedChecksheet] = useState<Checksheet | null>(null);

  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      mouldId: '',
      assignee: '',
      checksheetId: '',
      location: '',
      activity: '',
    },
  });

  const handleChecksheetSelect = (id: string) => {
    console.log(selectedChecksheet);
    form.setValue('checksheetId', id);
    const selected = checksheetData.find(cs => cs.id === id) || null;
    setSelectedChecksheet(selected);
    form.trigger('checksheetId');
  };

  const formConfig: FormFieldConfig[] = [
    {
      name: 'mouldId',
      label: 'Mould',
      type: 'combobox',
      options: mouldOptions,
      placeholder: 'Select a mould...',
      searchPlaceholder: 'Search moulds...',
      rules: { required: 'Mould is required.' },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Enter location name',
      rules: { required: 'Location is required.' },
    },
    {
      name: 'assignee',
      label: 'Assignee',
      type: 'text',
      placeholder: 'Enter assignee name',
      rules: { required: 'Assignee is required.' },
    },
    {
      name: 'checksheetId',
      label: 'Checksheet Name',
      type: 'combobox',
      options: checksheetOptions,
      placeholder: 'Select a checksheet...',
      searchPlaceholder: 'Search checksheets...',
      onSelect: handleChecksheetSelect,
      rules: { required: 'Checksheet is required.' },
    },
    {
      name: 'activity',
      label: 'Activity',
      type: 'text',
      placeholder: 'Enter activity name',
      rules: { required: 'Activity is required.' },
    },
  ];

  const saveTaskToLocalStorage = (task: PMTask) => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const arr: PMTask[] = raw ? JSON.parse(raw) : [];
      // add new task at front
      arr.unshift(task);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.error('Failed to save PM task to localStorage', e);
    }
  };

  const onSubmit = (data: ScheduleFormValues) => {
    const mould = mouldSelectionOptions.find(m => m.mould_id_no === data.mouldId);
    const checksheet = checksheetData.find(cs => cs.id === data.checksheetId);

    if (!mould || !checksheet) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid mould or checksheet selected.',
      });
      return;
    }

    const dueDate = addDays(new Date(), 7);

    // Build PMTask matching your PMTask type
    const newTask: PMTask = {
      ticketId: `PM-${Date.now()}`,
      mouldId: data.mouldId,
      mouldName: mould.part_name || mould.model || mould.mould_id_no,
      location: data.location  || `Shop Floor ${String(mould.mould_id_no).slice(-1)}`,
      activity: data.activity || checksheet.name,
      checksheets: checksheet.name,
      status: 'Scheduled',
      assignee: data.assignee,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      checklist: checksheet.tasks,
    };

    // Persist so main listing picks it up
    saveTaskToLocalStorage(newTask);

    toast({
      title: 'PM Task Scheduled',
      description: `Successfully scheduled task for mould ${data.mouldId}.`,
    });

    form.reset();
    setSelectedChecksheet(null);

    // navigate back to listing (parent will re-read localStorage on mount or via storage event)
    navigate('/preventive-maintenance');
  };

  const simulatedDueDate = format(addDays(new Date(), 7), 'PPP');

  const renderField = (fieldConfig: FormFieldConfig, field: any) => {
    switch (fieldConfig.type) {
      case 'combobox':
        return (
          <Combobox
            options={fieldConfig.options || []}
            selectedValue={field.value}
            onSelect={(value: any) => {
              if (fieldConfig.onSelect) {
                fieldConfig.onSelect(value);
              } else {
                field.onChange(value);
              }
            }}
            placeholder={fieldConfig.placeholder}
            searchPlaceholder={fieldConfig.searchPlaceholder}
          />
        );
      case 'text':
        return (
          <FormControl>
            <Input placeholder={fieldConfig.placeholder} {...field} />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-md:pb-24 max-sm:pb-30 pb-12">
      <PageHeader
        title="Preventive Maintenance - Schedule"
        description="Create a new PM task. Fields not shown in the form are autogenerated and stored."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {formConfig.map(config => (
              <FormField
                key={config.name}
                control={form.control}
                name={config.name}
                rules={config.rules}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{config.label}</FormLabel>
                    {renderField(config, field)}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="space-y-2">
              <FormLabel>Due Date</FormLabel>
              <Card className="bg-secondary">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">{simulatedDueDate}</span>
                  </div>
                  <CardDescription className="text-xs mt-1">Due date is automatically set to 7 days from now.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full sm:w-auto">
              Schedule Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../../../../components/ui/form';
// import { Input } from '../../../../components/ui/input';
// import { Button } from '../../../../components/ui/button';
// import { useToast } from '../../../../hooks/use-toast';
// import { checksheetData, type Checksheet, mouldSelectionOptions } from '../../../../lib/data';
// import { addDays, format } from 'date-fns';
// import { PreactCombobox as Combobox } from './combobox';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
// import { CalendarDays } from 'lucide-preact';
// import { Card, CardContent, CardDescription } from '../../../../components/ui/card';
// import { PageHeader } from '../../../../components/page-header';
// import { useNavigate } from 'react-router-dom';

// interface ScheduleFormValues {
//   mouldId: string;
//   location: string;
//   assignee: string;
//   checksheetId: string;
//   activity: string;
// }

// const mouldOptions = mouldSelectionOptions.map(m => ({ value: m.mould_id_no, label: `${m.model} (${m.mould_no}) ${m.mould_id_no}` }));
// const checksheetOptions = checksheetData.map(cs => ({ value: cs.id, label: cs.name }));

// type FormFieldConfig = {
//   name: keyof ScheduleFormValues;
//   label: string;
//   type: 'combobox' | 'text';
//   placeholder?: string;
//   options?: { value: string; label: string }[];
//   searchPlaceholder?: string;
//   gridCols?: string;
//   onSelect?: (value: string) => void;
//   rules?: object; 
// };

// export function PMScheduleForm() {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [selectedChecksheet, setSelectedChecksheet] = useState<Checksheet | null>(null);

//   const form = useForm<ScheduleFormValues>({
//     defaultValues: {
//       mouldId: '',
//       assignee: '',
//       checksheetId: '',
//       location: '',
//       activity: '',
//     },
//   });

//   const handleChecksheetSelect = (id: string) => {
//     form.setValue('checksheetId', id);
//     const selected = checksheetData.find(cs => cs.id === id) || null;
//     setSelectedChecksheet(selected);
//     form.trigger('checksheetId');
//   };

//   const formConfig: FormFieldConfig[] = [
//     {
//       name: 'mouldId',
//       label: 'Mould',
//       type: 'combobox',
//       options: mouldOptions,
//       placeholder: 'Select a mould...',
//       searchPlaceholder: 'Search moulds...',
//       rules: { required: 'Mould is required.' }
//     },
//     {
//       name: 'location',
//       label: 'Location',
//       type: 'text',
//       placeholder: 'Enter location name',
//       rules: { required: 'Location is required.' }
//     },
//     {
//       name: 'assignee',
//       label: 'Assignee',
//       type: 'text',
//       placeholder: 'Enter assignee name',
//       rules: { required: 'Assignee is required.' }
//     },
//     {
//       name: 'checksheetId',
//       label: 'Checksheet Name',
//       type: 'combobox',
//       options: checksheetOptions,
//       placeholder: 'Select a checksheet...',
//       searchPlaceholder: 'Search checksheets...',
//       onSelect: handleChecksheetSelect,
//       rules: { required: 'Checksheet is required.' }
//     },
//     {
//       name: 'activity',
//       label: 'Activity',
//       type: 'text',
//       placeholder: 'Enter activity name',
//       rules: { required: 'Activity is required.' }
//     },
//   ];

//   const onSubmit = (data: ScheduleFormValues) => {
//     // Find the selected mould from mouldSelectionOptions using mould_id_no
//     const mould = mouldSelectionOptions.find(m => m.mould_id_no === data.mouldId);

//     const checksheet = checksheetData.find(cs => cs.id === data.checksheetId);

//     if (!mould || !checksheet) {
//       toast({
//         variant: "destructive",
//         title: 'Error',
//         description: 'Invalid mould or checksheet selected.',
//       });
//       return;
//     }

//     const dueDate = addDays(new Date(), 7);

//     // Use mouldId / mouldName in place of machineId / machineName
//     const submissionData = {
//       mouldId: data.mouldId,
//       mouldName: (mould.part_name || mould.model || mould.mould_id_no),
//       location: data.location  || `Shop Floor ${String(mould.mould_id_no).slice(-1)}`,
//       activity: data.activity || checksheet.name,
//       frequency: 'Ad-hoc',
//       assignee: data.assignee,
//       dueDate: format(dueDate, 'yyyy-MM-dd'),
//       checklist: checksheet.tasks,
//     };

//     // Console log the form data
//     console.log('Form Submission Data:', submissionData);

//     toast({
//       title: 'PM Task Scheduled',
//       description: `Successfully scheduled task for mould ${data.mouldId}.`,
//     });

//     form.reset();
//     setSelectedChecksheet(null);
//   };

//   const simulatedDueDate = format(addDays(new Date(), 7), 'PPP');

//   const renderField = (fieldConfig: FormFieldConfig, field: any) => {
//     switch (fieldConfig.type) {
//       case 'combobox':
//         return (
//           <Combobox
//             options={fieldConfig.options || []}
//             selectedValue={field.value}
//             onSelect={(value: any) => {
//               if (fieldConfig.onSelect) {
//                 fieldConfig.onSelect(value);
//               } else {
//                 field.onChange(value);
//               }
//             }}
//             placeholder={fieldConfig.placeholder}
//             searchPlaceholder={fieldConfig.searchPlaceholder}
//           />
//         );
//       case 'text':
//         return (
//           <FormControl>
//             <Input placeholder={fieldConfig.placeholder} {...field} />
//           </FormControl>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-8 max-md:pb-24 max-sm:pb-30 pb-12">
//       <PageHeader
//         title="Preventive Maintenance Planning"
//         description="Schedule, execute, and track regular maintenance tasks across all machines."
//       />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//             {formConfig.map(config => (
//               <FormField
//                 key={config.name}
//                 control={form.control}
//                 name={config.name}
//                 rules={config.rules}
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>{config.label}</FormLabel>
//                     {renderField(config, field)}
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             ))}
//             <div className="space-y-2">
//               <FormLabel>Due Date</FormLabel>
//               <Card className="bg-secondary">
//                 <CardContent className="p-3">
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <CalendarDays className="h-5 w-5 text-primary" />
//                     <span className="font-semibold text-foreground">{simulatedDueDate}</span>
//                   </div>
//                   <CardDescription className="text-xs mt-1">Due date is automatically set to 7 days from now.</CardDescription>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Checksheet preview (commented out) */}
//           {/* {selectedChecksheet && (
//             <div className="space-y-2">
//               <FormLabel>Checksheet Preview</FormLabel>
//               <div className="rounded-md border max-h-48 overflow-y-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Task</TableHead>
//                       <TableHead>Expected Value</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {selectedChecksheet.tasks.map((task, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{task}</TableCell>
//                         <TableCell className="text-muted-foreground">Pass/Fail</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//           )} */}

//           <div className="flex justify-end pt-4">
//             <Button type="submit" className="w-full sm:w-auto">
//               Schedule Task
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }