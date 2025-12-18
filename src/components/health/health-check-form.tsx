import { useForm } from 'react-hook-form';
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
import { Upload } from 'lucide-preact';
import { machineData } from '../../lib/data';

type HealthCheckFormValues = {
  mouldId: string
  insertWear: string
  coolingCondition: string
  cavityPolish: string
  defectPhotos?: FileList | null
  comments?: string
}



interface HealthCheckFormProps {
  onSubmitSuccess: () => void;
}

export function HealthCheckForm({ onSubmitSuccess }: HealthCheckFormProps) {
  const { toast } = useToast();
  const form = useForm<HealthCheckFormValues>({
    defaultValues: {
      mouldId: 'MLD-45B-01',
      insertWear: '',
      coolingCondition: '',
      cavityPolish: '',
      comments: '',
    },
  })


  const onSubmit = (data: HealthCheckFormValues) => {
    console.log(data);
    toast({
      title: 'Health Check Submitted',
      description: `Successfully submitted health check for ${data.mouldId}.`,
    });
    onSubmitSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mouldId"
          rules={{ required: 'Mould ID is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mould ID</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mould" />
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="insertWear"
            rules={{ required: 'Insert wear assessment is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insert Wear</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assess wear" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coolingCondition"
            rules={{ required: 'Cooling condition assessment is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooling Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assess condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="adequate">Adequate</SelectItem>
                    <SelectItem value="blocked">Blocked/Leaking</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cavityPolish"
            rules={{ required: 'Cavity polish assessment is required.' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cavity Polish</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assess polish" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="minor_scratches">Minor Scratches</SelectItem>
                    <SelectItem value="major_scratches">Major Scratches</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Noticed minor flashing on part line..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="defectPhotos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Photos/Videos of Defects</FormLabel>
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

        <Button type="submit" className="w-full">
          Submit Health Check
        </Button>
      </form>
    </Form>
  );
}
