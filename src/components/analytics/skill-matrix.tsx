import { useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../components/ui/card';

import { PlusCircle, Edit, Trash2 } from 'lucide-preact';
import { useToast } from '../../hooks/use-toast';
import { skillMatrixData, type SkillMatrixMember } from '../../lib/data';

type MemberForm = {
  id: string;
  name: string;
  post:
    | 'Operator'
    | 'Maintenance Engineer'
    | 'Supervisor'
    | 'QA'
    | 'Team Lead';
};

export function SkillMatrix() {
  const [members, setMembers] =
    useState<SkillMatrixMember[]>(skillMatrixData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] =
    useState<SkillMatrixMember | null>(null);

  const { toast } = useToast();

  const form = useForm<MemberForm>({
    defaultValues: {
      id: '',
      name: '',
      post: 'Operator',
    },
  });

  const onSubmit = (data: MemberForm) => {
    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editingMember.id ? data : m))
      );
      toast({
        title: 'Member Updated',
        description: `${data.name} has been updated.`,
      });
    } else {
      if (members.find((m) => m.id === data.id)) {
        form.setError('id', {
          type: 'manual',
          message: 'Employee ID already exists.',
        });
        return;
      }
      setMembers((prev) => [...prev, data]);
      toast({
        title: 'Member Added',
        description: `${data.name} has been added.`,
      });
    }

    setIsDialogOpen(false);
    setEditingMember(null);
    form.reset();
  };

  const handleEdit = (member: SkillMatrixMember) => {
    setEditingMember(member);
    form.reset(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast({
      title: 'Member Deleted',
      description: `Member ${id} has been deleted.`,
    });
  };

  const openNewMemberDialog = () => {
    setEditingMember(null);
    form.reset({ id: '', name: '', post: 'Operator' });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Skill Matrix</CardTitle>
            <CardDescription>
              Manage team members and their roles.
            </CardDescription>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingMember(null);
                form.reset();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={openNewMemberDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="id"
                    rules={{ required: 'Employee ID is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!!editingMember} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="post"
                    rules={{ required: 'Post is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a post" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Operator">
                              Operator
                            </SelectItem>
                            <SelectItem value="Maintenance Engineer">
                              Maintenance Engineer
                            </SelectItem>
                            <SelectItem value="Supervisor">
                              Supervisor
                            </SelectItem>
                            <SelectItem value="QA">QA</SelectItem>
                            <SelectItem value="Team Lead">
                              Team Lead
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                      {editingMember ? 'Save Changes' : 'Add Member'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Post</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.id}
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.post}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
