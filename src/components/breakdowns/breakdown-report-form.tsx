
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';
import { Upload, PlusCircle, Trash2 } from 'lucide-preact';
import { machineData } from '../../lib/data';
import { breakdownLogs } from '../../lib/data';

type BreakdownFormValues = {
  machineId: string
  breakdownType: string
  rootCause: string
  correctiveAction: string
  sparesUsed?: { value: string }[]
  photos?: FileList | null
}


interface BreakdownReportFormProps {
  onSubmitSuccess: (data: Omit<BreakdownFormValues, 'photos'>) => void;
}

export function BreakdownReportForm({
  onSubmitSuccess,
}: BreakdownReportFormProps) {
  const { toast } = useToast();
  const form = useForm<BreakdownFormValues>({
    defaultValues: {
      machineId: '',
      breakdownType: '',
      rootCause: '',
      correctiveAction: '',
      sparesUsed: [{ value: '' }],
    },
  })


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sparesUsed',
  })

  const onSubmit = (data: BreakdownFormValues) => {
    const { photos, ...submissionData } = data

    toast({
      title: 'Breakdown Reported',
      description: `Successfully reported breakdown for machine ${data.machineId}.`,
    })

    onSubmitSuccess(submissionData)
    form.reset()
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="machineId"
            rules={{ required: 'Machine ID is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Machine ID</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a machine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {machineData.map(machine => (
                      <SelectItem key={machine.id} value={machine.id}>
                        {machine.name} ({machine.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breakdownType"
            rules={{ required: 'Breakdown type is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakdown Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mechanical, Electrical" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <FormField
          control={form.control}
          name="rootCause"
          rules={{ required: 'Root cause is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Root Cause</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a root cause" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(breakdownLogs.map(l => l.rootCause))).map(cause => (
                      <SelectItem key={cause} value={cause}>
                        {cause}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="correctiveAction"
          rules={{ required: 'Corrective action is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corrective Action Taken</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the actions taken..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div>
          <FormLabel>Spares Used</FormLabel>
          <div className="mt-2 space-y-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`sparesUsed.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="e.g., Part #12345" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1 && form.getValues('sparesUsed.0.value') === ''}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Spare
          </Button>
        </div>

        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Photos or Data</FormLabel>
              <FormControl>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="file"
                    className="pl-10"
                    multiple
                    onChange={(e) => field.onChange(e.currentTarget.files)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto">
          Submit Report
        </Button>
      </form>
    </Form>
  );
}
