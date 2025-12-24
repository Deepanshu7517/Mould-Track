'use client'

import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form' // Added useWatch
import { format, addDays } from 'date-fns'
import { Check, ChevronsUpDown } from 'lucide-preact'

/* -------------------- UI IMPORTS -------------------- */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui/popover'
import { cn } from '../../lib/utils'

/* -------------------- COMMAND (INLINE) -------------------- */
import { Command as CommandPrimitive } from 'cmdk'

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>((props, ref) => (
  <CommandPrimitive
    ref={ref}
    className="flex w-full flex-col rounded-md border bg-popover text-popover-foreground"
    {...props}
  />
))
Command.displayName = 'Command'

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>((props, ref) => (
  <CommandPrimitive.Input
    ref={ref}
    className="h-10 w-full border-b px-3 text-sm outline-none bg-background placeholder:text-muted-foreground"
    {...props}
  />
))
CommandInput.displayName = 'CommandInput'

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>((props, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className="max-h-60 overflow-y-auto"
    {...props}
  />
))
CommandList.displayName = 'CommandList'

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))
CommandEmpty.displayName = 'CommandEmpty'

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>((props, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm aria-selected:bg-accent"
    {...props}
  />
))
CommandItem.displayName = 'CommandItem'

/* -------------------- COMBOBOX -------------------- */
type Option = { value: string; label: string }

function Combobox({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          role="combobox"
          variant="outline"
          className={cn(
            'h-10 w-full justify-between px-3 py-2 text-sm',
            'bg-[#F5F7F9] border border-input',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        >
          {value
            ? options.find(o => o.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            {options.map(option => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/* -------------------- DATA -------------------- */
import { machineData, checksheetData } from '../../lib/data'
import type { PMTask } from '../../lib/data'
import { useToast } from '../../hooks/use-toast'

const mouldOptions = machineData.map(m => ({
  value: m.id,
  label: `${m.name} (${m.id})`,
}))

const checksheetOptions = checksheetData.map(cs => ({
  value: cs.id,
  label: cs.name,
}))

/* -------------------- FORM -------------------- */
interface FormValues {
  mould: string
  assignee: string
  checksheet: string
}

export function PMScheduleForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: (data: Omit<PMTask, 'ticketId' | 'status'>) => void
}) {
  const { toast } = useToast()

  const form = useForm<FormValues>({
    defaultValues: {
      mould: '',
      assignee: '',
      checksheet: '',
    },
  })

  // 1. WATCH: Listens for changes in the checksheet combobox
  const selectedChecksheetId = useWatch({
    control: form.control,
    name: "checksheet"
  });

  // 2. FIND: Matches selected ID to data for the table preview
  const selectedChecksheetData = React.useMemo(() => {
    return checksheetData.find(cs => cs.id === selectedChecksheetId);
  }, [selectedChecksheetId]);

  const dueDate = addDays(new Date(), 7)

  const onSubmit = (data: FormValues) => {
    const machine = machineData.find(m => m.id === data.mould)
    const checksheet = checksheetData.find(c => c.id === data.checksheet)
    if (!machine || !checksheet) return

    onSubmitSuccess({
      mouldId: machine.id,
      mouldName: machine.name,
      location: `Shop Floor ${machine.id.slice(-1)}`,
      activity: checksheet.name,
      checksheets: 'Ad-hoc',
      assignee: data.assignee,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      checklist: checksheet.tasks,
    })

    toast({
      title: 'PM Task Scheduled',
      description: `Task scheduled for mould ${machine.id}`,
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="mould"
          rules={{ required: 'Mould is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mould</FormLabel>
              <FormControl>
                <Combobox
                  options={mouldOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Search & select mould"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignee"
          rules={{ required: 'Assignee is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <FormControl>
                <Input placeholder="Enter assignee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Due Date</FormLabel>
          <Input disabled value={format(dueDate, 'PPP')} />
        </FormItem>

        <FormField
          control={form.control}
          name="checksheet"
          rules={{ required: 'Checksheet is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Checksheet</FormLabel>
              <FormControl>
                <Combobox
                  options={checksheetOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Search & select checksheet"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 3. TABLE PREVIEW: Displays when a checksheet is selected */}
        {selectedChecksheetData && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
            <FormLabel className="text-sm font-semibold text-slate-700">Checklist Preview</FormLabel>
            <div className="rounded-md border bg-slate-50 overflow-hidden">
              <div className="max-h-52 overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                <table className="w-full text-[13px] border-collapse bg-white">
                  <thead className="bg-slate-100 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-slate-600 border-b w-10">No.</th>
                      <th className="px-3 py-2 text-left font-bold text-slate-600 border-b">Task Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedChecksheetData.tasks.map((task, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-2 text-slate-400 font-mono text-center border-r">{idx + 1}</td>
                        <td className="px-3 py-2 text-slate-700">{task}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground italic">
              * The table above reflects the tasks that will be assigned.
            </p>
          </div>
        )}

        <Button type="submit" className="w-full">
          Schedule Task
        </Button>

      </form>
    </Form>
  )
}