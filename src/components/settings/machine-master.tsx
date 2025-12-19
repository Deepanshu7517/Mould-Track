import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { ChevronDown, Settings2 } from "lucide-preact";

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
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import { PlusCircle, Edit, Trash2 } from "lucide-preact";
import { useToast } from '../../hooks/use-toast';

/* -------------------- Types -------------------- */

interface MachineFormValues {
  id: string;
  machineCode: string;
  machineName: string;
  mouldCode: string;
  notes: string;
  createdBy: string;
  lastUpdated: string;
}

/* -------------------- Data -------------------- */

const machineData: MachineFormValues[] = Array(11).fill({
  id: "23232",
  machineCode: "23232",
  machineName: "23232",
  mouldCode: "23232",
  notes: "23232",
  createdBy: "23232",
  lastUpdated: "23232",
});

const mockMachines: MachineFormValues[] = [...machineData];

/* -------------------- Component -------------------- */

export function MachineMaster() {
  const [machines, setMachines] = useState<MachineFormValues[]>(mockMachines);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<MachineFormValues | null>(null);

  const { toast } = useToast();

  /* -------- Column Visibility State -------- */

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    machineCode: true,
    machineName: true,
    mouldCode: true,
    notes: true,
    createdBy: true,
    lastUpdated: true,
    actions: true,
  });

  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* -------- Form -------- */

  const form = useForm<MachineFormValues>({
    defaultValues: {
      id: "",
      machineCode: "",
      machineName: "",
      mouldCode: "",
      notes: "",
      createdBy: "",
      lastUpdated: "",
    },
  });

  const onSubmit = (data: MachineFormValues) => {
    if (editingMachine) {
      setMachines(machines.map(m => (m.id === editingMachine.id ? data : m)));
      toast({
        title: "Machine Updated",
        description: `${data.machineCode} has been updated.`,
      });
    } else {
      setMachines([...machines, data]);
      toast({
        title: "Machine Added",
        description: `${data.machineCode} has been added.`,
      });
    }

    setIsDialogOpen(false);
    setEditingMachine(null);
    form.reset();
  };

  const handleEdit = (machine: MachineFormValues) => {
    setEditingMachine(machine);
    form.reset(machine);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    toast({
      title: "Machine Deleted",
      description: `Machine ${id} has been deleted.`,
    });
  };

  const openNewMachineDialog = () => {
    setEditingMachine(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Machine Master</CardTitle>
            <CardDescription>
              Manage all machines in the system.
            </CardDescription>
          </div>

     <div className="flex gap-2 max-sm:flex-col">
            {/* -------- View Columns Dropdown -------- */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings2 className="mr-2 h-4 w-4" />
                  View Columns
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="h-64 overflow-y-auto"
              >
                {Object.keys(visibleColumns).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={visibleColumns[key as keyof typeof visibleColumns]}
                    onCheckedChange={() =>
                      toggleColumn(key as keyof typeof visibleColumns)
                    }
                    className="capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* -------- Add Machine -------- */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewMachineDialog}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Machine
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMachine ? 'Edit Machine' : 'Add New Machine'}
                  </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {[
                      "machineCode",
                      "machineName",
                      "mouldCode",
                      "notes",
                      "createdBy",
                      "lastUpdated",
                    ].map((field) => (
                      <FormField
                        key={field}
                        control={form.control}
                        name={field as keyof MachineFormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">
                              {field.name.replace(/([A-Z])/g, " $1")}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">
                        {editingMachine ? 'Save Changes' : 'Add Machine'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.id && <TableHead>ID</TableHead>}
                {visibleColumns.machineCode && <TableHead>Machine Code</TableHead>}
                {visibleColumns.machineName && <TableHead>Machine Name</TableHead>}
                {visibleColumns.mouldCode && <TableHead>Mould Code</TableHead>}
                {visibleColumns.notes && <TableHead>Notes</TableHead>}
                {visibleColumns.createdBy && <TableHead>Created By</TableHead>}
                {visibleColumns.lastUpdated && <TableHead>Last Updated</TableHead>}
                {visibleColumns.actions && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {machines.map(machine => (
                <TableRow key={machine.id}>
                  {visibleColumns.id && (
                    <TableCell className="font-medium">{machine.id}</TableCell>
                  )}
                  {visibleColumns.machineCode && (
                    <TableCell>{machine.machineCode}</TableCell>
                  )}
                  {visibleColumns.machineName && (
                    <TableCell>{machine.machineName}</TableCell>
                  )}
                  {visibleColumns.mouldCode && (
                    <TableCell>{machine.mouldCode}</TableCell>
                  )}
                  {visibleColumns.notes && (
                    <TableCell>{machine.notes}</TableCell>
                  )}
                  {visibleColumns.createdBy && (
                    <TableCell>{machine.createdBy}</TableCell>
                  )}
                  {visibleColumns.lastUpdated && (
                    <TableCell>{machine.lastUpdated}</TableCell>
                  )}
                  {visibleColumns.actions && (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(machine)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(machine.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
