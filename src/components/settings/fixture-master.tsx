'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Edit, Trash2, Settings2, ChevronDown, PlusCircle } from "lucide-preact";
import { useToast } from "../../hooks/use-toast";

/* -------------------- TYPES -------------------- */

interface fixtureMasterType {
  id?: string;
  fixtureCode: string;
  fixtureName: string;
  model: string;
  supplierName: string;
  dateReceived: string;
  validationCycle: string;
  lastValidationDate: string;
  nextValidationDate: string;
  currentStatus: string;
  currentLocation: string;
  documents: string;
  remarks: string;
  createdBy: string;
  lastModifiedDate: string;
}

/* -------------------- MOCK DATA -------------------- */

const mockFixtures: fixtureMasterType[] = [
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
  {
    id: "FX-001",
    fixtureCode: "FIX-1001",
    fixtureName: "Front Panel Fixture",
    model: "FP-XL",
    supplierName: "Accurate Tools Pvt Ltd",
    dateReceived: "2024-02-10",
    validationCycle: "6 Months",
    lastValidationDate: "2024-08-10",
    nextValidationDate: "2025-02-10",
    currentStatus: "Active",
    currentLocation: "Tool Room A",
    documents: "front-panel-fixture.pdf",
    remarks: "Working fine",
    createdBy: "Admin",
    lastModifiedDate: "2024-12-01",
  },
];

/* -------------------- COMPONENT -------------------- */

export function FixtureMaster() {
  const [fixtures, setFixtures] = useState(mockFixtures);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFixture, setEditingFixture] =
    useState<fixtureMasterType | null>(null);

  const { toast } = useToast();

  /* -------- COLUMN VISIBILITY -------- */

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    fixtureCode: true,
    fixtureName: true,
    model: true,
    supplierName: true,
    dateReceived: true,
    validationCycle: true,
    lastValidationDate: true,
    nextValidationDate: true,
    currentStatus: true,
    currentLocation: true,
    documents: true,
    remarks: true,
    createdBy: true,
    lastModifiedDate: true,
    actions: true,
  });

  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  /* -------- FORM -------- */

  const form = useForm<fixtureMasterType>({
    defaultValues: {
      fixtureCode: "",
      fixtureName: "",
      model: "",
      supplierName: "",
      dateReceived: "",
      validationCycle: "",
      lastValidationDate: "",
      nextValidationDate: "",
      currentStatus: "",
      currentLocation: "",
      documents: "",
      remarks: "",
      createdBy: "",
      lastModifiedDate: "",
    },
  });

  const onSubmit = (data: fixtureMasterType) => {
    if (editingFixture) {
      setFixtures(prev =>
        prev.map(f =>
          f.id === editingFixture.id ? { ...data, id: f.id } : f
        )
      );
      toast({ title: "Fixture Updated" });
    } else {
      setFixtures(prev => [
        ...prev,
        { ...data, id: `FX-${Date.now()}` },
      ]);
      toast({ title: "Fixture Added" });
    }

    setIsDialogOpen(false);
    setEditingFixture(null);
    form.reset();
  };

  const handleEdit = (fixture: fixtureMasterType) => {
    setEditingFixture(fixture);
    form.reset(fixture);
    setIsDialogOpen(true);
  };

  const handleDelete = (id?: string) => {
    setFixtures(prev => prev.filter(f => f.id !== id));
    toast({ title: "Fixture Deleted" });
  };

  /* -------------------- UI -------------------- */

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Fixture Master</CardTitle>
            <CardDescription>
              Manage all fixtures and validation details.
            </CardDescription>
          </div>

          <div className="flex gap-2 max-sm:flex-col">
            {/* COLUMN VISIBILITY */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings2 className="mr-2 h-4 w-4" />
                  View Columns
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="h-64 overflow-y-auto">
                {Object.keys(visibleColumns).map(key => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={visibleColumns[key as keyof typeof visibleColumns]}
                    onCheckedChange={() =>
                      toggleColumn(key as keyof typeof visibleColumns)
                    }
                    className="capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* ADD / EDIT DIALOG */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Fixture
                </Button>
              </DialogTrigger>

              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingFixture ? "Edit Fixture" : "Add Fixture"}
                  </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-4"
                  >
                    {Object.keys(form.getValues()).map(key => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as any}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{key}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

                    <DialogFooter className="col-span-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">
                        {editingFixture ? "Save Changes" : "Add Fixture"}
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
        <div className="w-full overflow-x-auto h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.id && <TableHead>ID</TableHead>}
                {visibleColumns.fixtureCode && <TableHead>Fixture Code</TableHead>}
                {visibleColumns.fixtureName && <TableHead>Name</TableHead>}
                {visibleColumns.model && <TableHead>Model</TableHead>}
                {visibleColumns.supplierName && <TableHead>Supplier</TableHead>}
                {visibleColumns.dateReceived && <TableHead>Date Received</TableHead>}
                {visibleColumns.validationCycle && <TableHead>Validation Cycle</TableHead>}
                {visibleColumns.lastValidationDate && <TableHead>Last Validation</TableHead>}
                {visibleColumns.nextValidationDate && <TableHead>Next Validation</TableHead>}
                {visibleColumns.currentStatus && <TableHead>Status</TableHead>}
                {visibleColumns.currentLocation && <TableHead>Location</TableHead>}
                {visibleColumns.documents && <TableHead>Documents</TableHead>}
                {visibleColumns.createdBy && <TableHead>Created By</TableHead>}
                {visibleColumns.lastModifiedDate && <TableHead>Modified</TableHead>}
                {visibleColumns.remarks && <TableHead>Remarks</TableHead>}
                {visibleColumns.actions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {fixtures.map(fixture => (
                <TableRow key={fixture.id}>
                  {visibleColumns.id && <TableCell>{fixture.id}</TableCell>}
                  {Object.entries(fixture)
                    .filter(([k]) => k !== "id")
                    .map(([_, v], i) => (
                      <TableCell key={i}>{v}</TableCell>
                    ))}

                  {visibleColumns.actions && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(fixture)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(fixture.id)}>
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
