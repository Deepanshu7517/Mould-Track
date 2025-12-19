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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { PlusCircle, Edit, Trash2, ChevronDown, Settings2 } from "lucide-preact";
import { useToast } from '../../hooks/use-toast';
import { ArrayDropdownCell } from '../dropdown/arrayDropDownCell';

/* -------------------- Types -------------------- */

interface thresHold {
  pmScheduleDate?: string;
  pmScheduleTime?: number;
}

interface MouldFormValues {
  id?: string;
  mouldCode?: string;
  mouldName?: string;
  partNumber?: string;
  supplierName?: string;
  dateRecieved?: string;
  currentStatus?: "OK" | "PM Due" | "Breakdown" | "Health Due";
  totalShotsCompleted?: number;
  shotLifeLimit?: number;
  pmThreshold: thresHold;
  currentLocation?: string;
  compatibleMachines?: string[];
  mouldReadinessCheeckStatus?: string;
  documents?: string[];
  remarks?: string;
  createdBy?: string;
  lastModifiedDate?: string;
}

/* -------------------- Mock Data -------------------- */

const mockMoulds: MouldFormValues[] = [
  {
    id: "MD-001",
    mouldCode: "MLD-45B-01",
    mouldName: "Front Bumper Mould",
    partNumber: "FB-8892-A",
    supplierName: "Precision Toolings Pvt Ltd",
    dateRecieved: "2024-01-12",
    currentStatus: "OK",
    totalShotsCompleted: 320000,
    shotLifeLimit: 1000000,
    pmThreshold: { pmScheduleDate: "2025-01-20", pmScheduleTime: 20000 },
    currentLocation: "Tool Room A",
    compatibleMachines: ["MC-001", "MC-003"],
    mouldReadinessCheeckStatus: "Approved",
    documents: ["front-bumper-drawing.pdf", "Adhaar Card"],
    remarks: "Running smoothly.",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-10",
  },
  // ... (rest of your mock data)
];

export function MouldMaster() {
  const [moulds, setMoulds] = useState<MouldFormValues[]>(mockMoulds);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMould, setEditingMould] = useState<MouldFormValues | null>(null);
  const { toast } = useToast();

  // --- Column Visibility State ---
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    mouldCode: true,
    mouldName: true,
    partNumber: true,
    supplierName: true,
    dateRecieved: true,
    currentStatus: true,
    totalShotsCompleted: true,
    shotLifeLimit: true,
    pmScheduleDate: true,
    pmScheduleTime: true,
    currentLocation: true,
    compatibleMachines: true,
    readinessStatus: true,
    documents: true,
    createdBy: true,
    lastModifiedDate: true,
    remarks: true,
    actions: true,
  });

  const form = useForm<MouldFormValues>({
    defaultValues: {
      id: "",
      mouldCode: "",
      mouldName: "",
      partNumber: "",
      supplierName: "",
      dateRecieved: "",
      currentStatus: "OK",
      totalShotsCompleted: 0,
      shotLifeLimit: 0,
      pmThreshold: { pmScheduleDate: "", pmScheduleTime: 0 },
      currentLocation: "",
      compatibleMachines: [],
      mouldReadinessCheeckStatus: "",
      documents: [],
      createdBy: "",
      remarks: "",
      lastModifiedDate: ""
    },
  });

  const onSubmit = (data: MouldFormValues) => {
    if (editingMould) {
      setMoulds(moulds.map(m => (m.id === editingMould.id ? data : m)));
      toast({ title: "Mould Updated", description: `${data.id} updated.` });
    } else {
      setMoulds([...moulds, data]);
      toast({ title: "Mould Added", description: `${data.id} added.` });
    }
    setIsDialogOpen(false);
    setEditingMould(null);
    form.reset();
  };

  const handleEdit = (mould: MouldFormValues) => {
    setEditingMould(mould);
    form.reset(mould);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMoulds(moulds.filter(m => m.id !== id));
    toast({ title: "Mould Deleted", description: `Mould ${id} has been deleted.` });
  };

  const openNewMouldDialog = () => {
    setEditingMould(null);
    form.reset({
      id: "",
      mouldCode: "",
      mouldName: "",
      partNumber: "",
      supplierName: "",
      dateRecieved: "",
      currentStatus: "OK",
      totalShotsCompleted: 0,
      shotLifeLimit: 0,
      pmThreshold: { pmScheduleDate: "", pmScheduleTime: 0 },
      currentLocation: "",
      compatibleMachines: [],
      mouldReadinessCheeckStatus: "",
      documents: [],
      createdBy: "",
      remarks: "",
      lastModifiedDate: ""
    });
    setIsDialogOpen(true);
  };

  // Helper to toggle columns
  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Mould Master</CardTitle>
            <CardDescription>Manage all moulds in the system.</CardDescription>
          </div>
 <div className="flex gap-2 max-sm:flex-col">
            {/* COLUMN VISIBILITY DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  <Settings2 className="mr-2 h-4 w-4" />
                  View Columns
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="h-64 overflow-y-auto">
                {Object.keys(visibleColumns).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    className="capitalize"
                    checked={visibleColumns[key as keyof typeof visibleColumns]}
                    onCheckedChange={() => toggleColumn(key as keyof typeof visibleColumns)}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewMouldDialog}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Mould
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[800px] bg-white">
                <DialogHeader>
                  <DialogTitle>{editingMould ? 'Edit Mould' : 'Add New Mould'}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white">
                    {/* SCROLLABLE GRID CONTAINER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-[60vh] overflow-y-auto px-1 py-2">
                      {/* --- FORM FIELDS (unchanged from previous version) --- */}
                      <FormField control={form.control} name="id" rules={{ required: "Required" }} render={({ field }) => (
                        <FormItem><FormLabel>Mould ID</FormLabel><FormControl><Input {...field} disabled={!!editingMould} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="mouldCode" render={({ field }) => (
                        <FormItem><FormLabel>Mould Code</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="mouldName" render={({ field }) => (
                        <FormItem><FormLabel>Mould Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="partNumber" render={({ field }) => (
                        <FormItem><FormLabel>Part Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="supplierName" render={({ field }) => (
                        <FormItem><FormLabel>Supplier Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="dateRecieved" render={({ field }) => (
                        <FormItem><FormLabel>Date Received</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="totalShotsCompleted" render={({ field }) => (
                        <FormItem><FormLabel>Total Shots</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="shotLifeLimit" render={({ field }) => (
                        <FormItem><FormLabel>Shot Life Limit</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="pmThreshold.pmScheduleDate" render={({ field }) => (
                        <FormItem><FormLabel>PM Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="pmThreshold.pmScheduleTime" render={({ field }) => (
                        <FormItem><FormLabel>PM Threshold</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="currentLocation" render={({ field }) => (
                        <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="createdBy" render={({ field }) => (
                        <FormItem><FormLabel>Created By</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="compatibleMachines" render={({ field }) => (
                        <FormItem><FormLabel>Machines (comma sep)</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(","))} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="lastModifiedDate" render={({ field }) => (
                        <FormItem><FormLabel>Last Modified</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="documents" render={({ field }) => (
                        <FormItem><FormLabel>Documents</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(","))} /></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="remarks" render={({ field }) => (
                        <FormItem><FormLabel>Remarks</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                      <Button type="submit">{editingMould ? "Save Changes" : "Add Mould"}</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full overflow-x-auto h-96 overflow-y-scroll">
          <Table>
            <TableHeader>
              <TableRow>
                {/* CONDITIONAL HEADERS */}
                {visibleColumns.id && <TableHead>ID</TableHead>}
                {visibleColumns.mouldCode && <TableHead>Mould Code</TableHead>}
                {visibleColumns.mouldName && <TableHead>Name</TableHead>}
                {visibleColumns.partNumber && <TableHead>Part</TableHead>}
                {visibleColumns.supplierName && <TableHead>Supplier</TableHead>}
                {visibleColumns.dateRecieved && <TableHead>Date Received</TableHead>}
                {visibleColumns.currentStatus && <TableHead>Current Status</TableHead>}
                {visibleColumns.totalShotsCompleted && <TableHead>Total Shots</TableHead>}
                {visibleColumns.shotLifeLimit && <TableHead>Life Limit</TableHead>}
                {visibleColumns.pmScheduleDate && <TableHead>PM Date</TableHead>}
                {visibleColumns.pmScheduleTime && <TableHead>PM Threshold</TableHead>}
                {visibleColumns.currentLocation && <TableHead>Location</TableHead>}
                {visibleColumns.compatibleMachines && <TableHead>Machines</TableHead>}
                {visibleColumns.readinessStatus && <TableHead>Readiness</TableHead>}
                {visibleColumns.documents && <TableHead>Documents</TableHead>}
                {visibleColumns.createdBy && <TableHead>Created By</TableHead>}
                {visibleColumns.lastModifiedDate && <TableHead>Modified</TableHead>}
                {visibleColumns.remarks && <TableHead>Remarks</TableHead>}
                {visibleColumns.actions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {moulds.map((mould) => (
                <TableRow key={mould.id}>
                  {/* CONDITIONAL CELLS - Must match Header order exactly */}
                  {visibleColumns.id && <TableCell className="font-medium">{mould.id}</TableCell>}
                  {visibleColumns.mouldCode && <TableCell>{mould.mouldCode}</TableCell>}
                  {visibleColumns.mouldName && <TableCell>{mould.mouldName}</TableCell>}
                  {visibleColumns.partNumber && <TableCell>{mould.partNumber}</TableCell>}
                  {visibleColumns.supplierName && <TableCell>{mould.supplierName}</TableCell>}
                  {visibleColumns.dateRecieved && <TableCell>{mould.dateRecieved}</TableCell>}
                  {visibleColumns.currentStatus && <TableCell>{mould.currentStatus}</TableCell>}
                  {visibleColumns.totalShotsCompleted && <TableCell>{mould.totalShotsCompleted?.toLocaleString()}</TableCell>}
                  {visibleColumns.shotLifeLimit && <TableCell>{mould.shotLifeLimit?.toLocaleString()}</TableCell>}
                  {visibleColumns.pmScheduleDate && <TableCell>{mould.pmThreshold?.pmScheduleDate}</TableCell>}
                  {visibleColumns.pmScheduleTime && <TableCell>{mould.pmThreshold?.pmScheduleTime}</TableCell>}
                  {visibleColumns.currentLocation && <TableCell>{mould.currentLocation}</TableCell>}
                  {visibleColumns.compatibleMachines && (
                    <TableCell>
                      {mould.compatibleMachines && mould.compatibleMachines.length > 0 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              {mould.compatibleMachines.length} Machines
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="start" className="min-w-[160px]">
                            {mould.compatibleMachines.map((machine) => (
                              <div
                                key={machine}
                                className="px-2 py-1 text-sm hover:bg-muted rounded-sm"
                              >
                                {machine}
                              </div>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  )}

                  {visibleColumns.readinessStatus && <TableCell>{mould.mouldReadinessCheeckStatus || "-"}</TableCell>}
                {visibleColumns.documents && (
  <TableCell>
    <ArrayDropdownCell items={mould.documents} emptyLabel="No Documents" />
  </TableCell>
)}

                  {visibleColumns.createdBy && <TableCell>{mould.createdBy}</TableCell>}
                  {visibleColumns.lastModifiedDate && <TableCell>{mould.lastModifiedDate}</TableCell>}
                  {visibleColumns.remarks && <TableCell className="max-w-[200px] truncate">{mould.remarks}</TableCell>}

                  {visibleColumns.actions && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(mould)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(mould.id!)}><Trash2 className="h-4 w-4" /></Button>
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