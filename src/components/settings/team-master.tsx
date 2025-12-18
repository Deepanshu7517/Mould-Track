'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  CardDescription
} from "../../components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-preact";
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';

/* -------------------- Types -------------------- */

interface TeamMemberFormValues {
  id: string; // backend generated
  userName: string;
  password: string;
  fullName: string;
  employeeId: string;
  department: string;
  role: string;
  emailId: string;
  mobileNumber: string;
  status: string;
  lastLogin: string;
  createdBy: string;
  remarks: string;
}

/* -------------------- Mock Data -------------------- */

const mockTeam: TeamMemberFormValues[] = [
  {
    id: "1",
    userName: "johndoe",
    password: "sdjfdsksdfbdsibf",
    fullName: "John Doe",
    employeeId: "EMP-001",
    department: "Maintenance",
    role: "Maintenance Engineer",
    emailId: "john@company.com",
    mobileNumber: "9876543210",
    status: "Active",
    lastLogin: "2025-01-10 10:30",
    createdBy: "Admin",
    remarks: "Senior engineer",
  },
];

/* -------------------- Component -------------------- */

export function TeamMaster() {
  const [team, setTeam] = useState<TeamMemberFormValues[]>(mockTeam);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberFormValues | null>(null);
  const { toast } = useToast();

  const form = useForm<Omit<TeamMemberFormValues, "id">>({
    defaultValues: {
      userName: "",
      password: "",
      fullName: "",
      employeeId: "",
      department: "",
      role: "",
      emailId: "",
      mobileNumber: "",
      status: "Active",
      lastLogin: "",
      createdBy: "",
      remarks: "",
    },
  });

  /* -------------------- Handlers -------------------- */

  const onSubmit = (data: Omit<TeamMemberFormValues, "id">) => {
    if (editingMember) {
      setTeam(prev =>
        prev.map(m =>
          m.id === editingMember.id ? { ...data, id: m.id } : m
        )
      );
      toast({ title: "Team Member Updated" });
    } else {
      // simulate backend id
      setTeam(prev => [...prev, { ...data, id: crypto.randomUUID() }]);
      toast({ title: "Team Member Added" });
    }

    setIsDialogOpen(false);
    setEditingMember(null);
    form.reset();
  };

  const handleEdit = (member: TeamMemberFormValues) => {
    const { id, ...rest } = member;
    setEditingMember(member);
    form.reset(rest);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    toast({ title: "Team Member Deleted" });
  };

  /* -------------------- UI -------------------- */

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Team Master</CardTitle>
            <CardDescription>Manage all users</CardDescription>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Edit Member" : "Add Member"}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

                  {[
                    "userName",
                    "password",
                    "fullName",
                    "employeeId",
                    "department",
                    "emailId",
                    "mobileNumber",
                    "lastLogin",
                    "createdBy",
                    "remarks",
                  ].map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{field.name}</FormLabel>
                          <FormControl>
                            <Input {...field} type={field.name === "password" ? "password" : "text"} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Operator">Operator</SelectItem>
                            <SelectItem value="Maintenance Engineer">Maintenance Engineer</SelectItem>
                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                            <SelectItem value="QA">QA</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="col-span-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                      {editingMember ? "Save Changes" : "Add Member"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(mockTeam[0]).map(key => (
                key !== "passwor" && <TableHead key={key}>{key}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {team.map(member => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.userName}</TableCell>
                <TableCell>{member.password}</TableCell>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.employeeId}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell><Badge>{member.role}</Badge></TableCell>
                <TableCell>{member.emailId}</TableCell>
                <TableCell>{member.mobileNumber}</TableCell>
                <TableCell><Badge>{member.status}</Badge></TableCell>
                <TableCell>{member.lastLogin}</TableCell>
                <TableCell>{member.createdBy}</TableCell>
                <TableCell>{member.remarks}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}