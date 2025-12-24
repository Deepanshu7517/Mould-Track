import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "../../components/ui/form";
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
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  PlusCircle,
  Edit,
  Trash2,
  ChevronDown,
  Settings2,
} from "lucide-preact";
import { useToast } from "../../hooks/use-toast";
import { ArrayDropdownCell } from "../dropdown/arrayDropDownCell";
import { useNavigate } from "react-router-dom";

/* -------------------- Master backend object (unchanged) -------------------- */
const mouldDetailData = {
  _id: {
    $oid: "6944b914445ade15c38fb678",
  },
  part_code: ["3390", "3400"],
  part_name: "Blower Case LH",
  model: "YRA",
  mould_no: "361",
  mould_id_no: "MS-03390-YRA-01-003-L-F",
  thms_id: "S831PM339010D0R0",
  asset_number: "1022833401",
  customer_name: "MSIL",
  mould_commissioning_date: "2015-09-01",
  mould_steel_core_cavity: "NIMAX",
  mould_weight_core: "5.25",
  mould_weight_cavity: "3.75 ",
  mould_size: "1240 x 1720 x 1171",
  number_of_cavities: "1+1",
  tool_maker: "STEC/361",
  job_id: 361,
  mould_clamping_tonnage: "910 T",
  plastic_raw_material: "PP 20% TF",
  drawing_2d_available: "Available",
  cad_3d_available: "Available",
  cad_data_location: "STEC",
  cad_data_revision: "STEC",
  regulatory_marking_applicable: "N",
  regulatory_marking_spec_available: "NA",
  regulatory_marking_type: "NA",
  number_of_gates: 6,
  gate_type: "Sequential",
  hot_runner_id: "S2014051586",
  hot_runner_make: "YUDO",
  hot_runner_zones: 18,
  ejector_system_type: "Knock out Rod",
  cooling_line_lpm_core: 7,
  cooling_line_lpm_cavity: 8,
  mould_location: "3",
};

/* -------------------- Enhanced Types (form model from new component) -------------------- */
export interface DetailedMouldFormValues {
  // Basic / table display
  id: string;
  // mouldCode: string;
  mouldName: string;
  partNumber: string[];
  currentStatus: string;
  totalShotsCompleted: number;
  shotLifeLimit: number;
  currentLocation: string;

  // Detailed Fields (new form)
  partName: string;
  model: string;
  mouldNo: string;
  mouldIdNo: string;
  thmsId: string;
  assetNumber: string;
  customerName: string;
  mouldCommissioningDate: string;
  mouldSteelCoreCavity: string;
  mouldWeightCore: string;
  mouldWeightCavity: string;
  mouldSize: string; // LxBxH
  numberOfCavities: string;
  toolMaker: string;
  jobIdNo: string;
  mouldClampingTonnage: string;
  plasticRawMaterial: string;
  drawing2dAvailable: "Yes" | "No";
  cad3dAvailable: "Yes" | "No";
  cadDataLocation: string;
  cadDataRevision: string;
  regulatoryMarkingApplicable: "Yes" | "No";
  regulatoryMarkingSpecAvailable: "Yes" | "No";
  regulatoryMarkingStorageLocation?: string;
  regulatoryMarkingType: "Insert" | "Engraved" | "NA";
  numberOfGates: number;
  gateType: "Normal" | "Sequential";
  hotRunnerId: string;
  hotRunnerMake: string;
  hotRunnerZones: number;
  ejectorSystemType: string;
  coolingLineLpmCore: number;
  coolingLineLpmCavity: number;

  // Original / old component fields (added per request)
  supplierName: string;
  dateRecieved: string;
  // pmThreshold: { pmScheduleDate: string; pmScheduleTime: number };
  pmThreshold: {
    pmScheduleFrequency: ("Yearly" | "Monthly" | "Quarterly")[];
    pmScheduleTime: number;
  };

  // compatibleMachines: string[];
  mouldReadinessCheckStatus: "Approved" | "Not Approved";
  documents: string[];
  uploadedDocuments: File[];
  createdBy: string;
  remarks: string;
  lastModifiedDate: string;
}

/* -------------------- Mapper: backend -> DetailedMouldFormValues -------------------- */
function mapBackendToDetailedForm(backend: any): DetailedMouldFormValues {
  return {
    id: backend._id?.$oid ?? backend.mould_id_no ?? "",
    // mouldCode: Array.isArray(backend.part_code) ? backend.part_code[0] : (backend.part_code ?? ""),
    mouldName: backend.part_name ?? "",
    partNumber: Array.isArray(backend.part_code)
      ? backend.part_code
      : backend.part_code
        ? [backend.part_code]
        : [],

    currentStatus: "OK",
    totalShotsCompleted: 0,
    shotLifeLimit: 0,
    currentLocation: backend.mould_location ?? "",

    partName: backend.part_name ?? "",
    model: backend.model ?? "",
    mouldNo: backend.mould_no ?? "",
    mouldIdNo: backend.mould_id_no ?? "",
    thmsId: backend.thms_id ?? "",
    assetNumber: backend.asset_number ?? "",
    customerName: backend.customer_name ?? "",
    mouldCommissioningDate: backend.mould_commissioning_date ?? "",
    mouldSteelCoreCavity: backend.mould_steel_core_cavity ?? "",
    mouldWeightCore: backend.mould_weight_core ?? "",
    mouldWeightCavity: backend.mould_weight_cavity ?? "",
    mouldSize: backend.mould_size ?? "",
    numberOfCavities: backend.number_of_cavities ?? "",
    toolMaker: backend.tool_maker ?? "",
    jobIdNo: backend.job_id?.toString() ?? "",
    mouldClampingTonnage: backend.mould_clamping_tonnage ?? "",
    plasticRawMaterial: backend.plastic_raw_material ?? "",
    drawing2dAvailable: backend.drawing_2d_available && backend.drawing_2d_available.toLowerCase().startsWith("a") ? "Yes" : "No",
    cad3dAvailable: backend.cad_3d_available && backend.cad_3d_available.toLowerCase().startsWith("a") ? "Yes" : "No",
    cadDataLocation: backend.cad_data_location ?? "",
    cadDataRevision: backend.cad_data_revision ?? "",
    regulatoryMarkingApplicable: (backend.regulatory_marking_applicable === "Y" || backend.regulatory_marking_applicable === "Yes") ? "Yes" : "No",
    regulatoryMarkingSpecAvailable: (backend.regulatory_marking_spec_available === "Y" || backend.regulatory_marking_spec_available === "Yes") ? "Yes" : "No",
    regulatoryMarkingStorageLocation: "",
    regulatoryMarkingType: backend.regulatory_marking_type === "NA" ? "NA" : (backend.regulatory_marking_type ?? "NA") as any,
    numberOfGates: backend.number_of_gates ?? 0,
    gateType: backend.gate_type === "Sequential" ? "Sequential" : "Normal",
    hotRunnerId: backend.hot_runner_id ?? "",
    hotRunnerMake: backend.hot_runner_make ?? "",
    hotRunnerZones: backend.hot_runner_zones ?? 0,
    ejectorSystemType: backend.ejector_system_type ?? "",
    coolingLineLpmCore: backend.cooling_line_lpm_core ?? 0,
    coolingLineLpmCavity: backend.cooling_line_lpm_cavity ?? 0,

    // old/original fields defaults
    supplierName: "",
    dateRecieved: "",
    pmThreshold: { pmScheduleFrequency: [], pmScheduleTime: 0 },
    // compatibleMachines: [],
    mouldReadinessCheckStatus: "Not Approved",
    documents: [],
    uploadedDocuments: [],

    createdBy: "",
    remarks: "",
    lastModifiedDate: "",
  };
}

/* -------------------- Component: Combined (form from new + rest from old) -------------------- */
export function MouldMaster() {
  // use the mapper to create an initial mould item (preserves old master data)
  const initialMoulds: DetailedMouldFormValues[] = [mapBackendToDetailedForm(mouldDetailData)];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMould, setEditingMould] = useState<DetailedMouldFormValues | null>(null);
  const [moulds, setMoulds] = useState<DetailedMouldFormValues[]>(initialMoulds);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Column visibility (keeps the complete set from the old component)
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    // mouldCode: true,
    mouldName: true,
    partNumber: true,
    supplierName: true,
    dateRecieved: true,
    currentStatus: true,
    totalShotsCompleted: true,
    shotLifeLimit: true,
    pmScheduleFrequency: true,
    pmScheduleTime: true,
    currentLocation: true,
    // compatibleMachines: true,
    readinessStatus: true,
    documents: true,
    createdBy: true,
    lastModifiedDate: true,
    remarks: true,
    url: true,
    actions: true,
  });

  const form = useForm<DetailedMouldFormValues>({
    defaultValues: {
      id: "",
      // mouldCode: "",
      mouldName: "",
      partNumber: [],
      supplierName: "",
      dateRecieved: "",
      currentStatus: "OK",
      totalShotsCompleted: 0,
      shotLifeLimit: 0,
      pmThreshold: { pmScheduleFrequency: [], pmScheduleTime: 0 },
      currentLocation: "",
      // compatibleMachines: [],
      mouldReadinessCheckStatus: "Not Approved",
      documents: [],
      uploadedDocuments: [],

      createdBy: "",
      remarks: "",
      lastModifiedDate: "",

      // the rest of new fields with sensible defaults
      partName: "",
      model: "",
      mouldNo: "",
      mouldIdNo: "",
      thmsId: "",
      assetNumber: "",
      customerName: "",
      mouldCommissioningDate: "",
      mouldSteelCoreCavity: "",
      mouldWeightCore: "",
      mouldWeightCavity: "",
      mouldSize: "",
      numberOfCavities: "",
      toolMaker: "",
      jobIdNo: "",
      mouldClampingTonnage: "",
      plasticRawMaterial: "",
      drawing2dAvailable: "No",
      cad3dAvailable: "No",
      cadDataLocation: "",
      cadDataRevision: "",
      regulatoryMarkingApplicable: "No",
      regulatoryMarkingSpecAvailable: "No",
      regulatoryMarkingStorageLocation: "",
      regulatoryMarkingType: "NA",
      numberOfGates: 0,
      gateType: "Normal",
      hotRunnerId: "",
      hotRunnerMake: "",
      hotRunnerZones: 0,
      ejectorSystemType: "",
      coolingLineLpmCore: 0,
      coolingLineLpmCavity: 0,
    },
  });

  const onSubmit = (data: DetailedMouldFormValues) => {
    const documentNames = data.uploadedDocuments.map((f) => f.name);

    const finalData = {
      ...data,
      documents: documentNames,
    };

    if (editingMould) {
      setMoulds(moulds.map((m) =>
        (m.mouldIdNo || m.id) === (editingMould.mouldIdNo || editingMould.id)
          ? finalData
          : m
      ));
    } else {
      setMoulds([...moulds, finalData]);
    }

    setIsDialogOpen(false);
    setEditingMould(null);
    form.reset();
  };

  const handleEdit = (mould: DetailedMouldFormValues) => {
    setEditingMould(mould);
    form.reset(mould);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMoulds(moulds.filter((m) => (m.mouldIdNo || m.id) !== id));
    toast({ title: "Mould Deleted", description: `Mould ${id} has been deleted.` });
  };

  const openNewMouldDialog = () => {
    setEditingMould(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleViewDetails = (mould: DetailedMouldFormValues) => {
    localStorage.setItem("selectedMouldDetails", JSON.stringify(mould));
    navigate("/master-list-checksheet");
  };
  const ReadinessButton = ({ status }: { status: "Approved" | "Not Approved" }) => {
    const isApproved = status === "Approved";

    return (
      <Button
        size="sm"
        disabled={!isApproved}
        className={`cursor-default ${isApproved
            ? "bg-green-600 hover:bg-green-600 text-white"
            : "bg-red-600 hover:bg-red-600 text-white opacity-70"
          }`}
      >
        {isApproved ? "Ready" : "Not Ready"}
      </Button>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Mould Master</CardTitle>
            <CardDescription>Manage all moulds in the system. (Form upgraded; data/UI preserved)</CardDescription>
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
                    {key.replace(/([A-Z])/g, " $1").trim()}
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

              <DialogContent className="sm:max-w-[90vw] bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMould ? "Edit Mould" : "Register New Mould"}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white">
                    {/* SECTION 1: Basic Information */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Added mouldCode & mouldName inputs so they are captured at registration */}
                        {/* <FormField control={form.control} name="mouldCode" render={({ field }) => (
                          <FormItem><FormLabel>Mould Code</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} /> */}
                        <FormField control={form.control} name="mouldName" render={({ field }) => (
                          <FormItem><FormLabel>Mould Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField
                          control={form.control}
                          name="partNumber"
                          rules={{ required: "At least one part number is required" }}
                          render={({ field }) => (
                            <FormItem >
                              <FormLabel>Part No. * (comma separated)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter part numbers separated by comma"
                                  value={field.value?.join(", ") || ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.currentTarget.value
                                        .split(",")
                                        .map((p) => p.trim())
                                        .filter(Boolean)
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField control={form.control} name="partName" rules={{ required: "Required" }} render={({ field }) => (
                          <FormItem><FormLabel>Part Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="model" rules={{ required: "Required" }} render={({ field }) => (
                          <FormItem><FormLabel>Model *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldNo" rules={{ required: "Required" }} render={({ field }) => (
                          <FormItem><FormLabel>Mould No. *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldIdNo" rules={{ required: "Required" }} render={({ field }) => (
                          <FormItem><FormLabel>Mould ID No. *</FormLabel><FormControl><Input {...field} disabled={!!editingMould} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="thmsId" render={({ field }) => (
                          <FormItem><FormLabel>THMS ID</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="assetNumber" render={({ field }) => (
                          <FormItem><FormLabel>Asset Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="customerName" render={({ field }) => (
                          <FormItem><FormLabel>Customer Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldCommissioningDate" render={({ field }) => (
                          <FormItem><FormLabel>Commissioning Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                        )} />
                        {/* Added fields from old component */}
                        <FormField control={form.control} name="supplierName" render={({ field }) => (
                          <FormItem><FormLabel>Supplier Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="dateRecieved" render={({ field }) => (
                          <FormItem><FormLabel>Date Received</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 2: Mould Specifications */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Mould Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="mouldSteelCoreCavity" render={({ field }) => (
                          <FormItem><FormLabel>Mould Steel (Core/Cavity)</FormLabel><FormControl><Input {...field} placeholder="e.g., NIMAX" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldWeightCore" render={({ field }) => (
                          <FormItem><FormLabel>Mould Wt. Core (Ton)</FormLabel><FormControl><Input {...field} placeholder="e.g., 5.25" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldWeightCavity" render={({ field }) => (
                          <FormItem><FormLabel>Mould Wt. Cavity (Ton)</FormLabel><FormControl><Input {...field} placeholder="e.g., 3.75" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldSize" render={({ field }) => (
                          <FormItem><FormLabel>Mould Size (LxBxH)</FormLabel><FormControl><Input {...field} placeholder="e.g., 1240x1720x1171" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="numberOfCavities" render={({ field }) => (
                          <FormItem><FormLabel>Number of Cavities</FormLabel><FormControl><Input {...field} placeholder="e.g., 1+1" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="mouldClampingTonnage" render={({ field }) => (
                          <FormItem><FormLabel>Clamping Tonnage</FormLabel><FormControl><Input {...field} placeholder="e.g., 910 T" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="plasticRawMaterial" render={({ field }) => (
                          <FormItem><FormLabel>Plastic Raw Material</FormLabel><FormControl><Input {...field} placeholder="e.g., PP 20% TF" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="toolMaker" render={({ field }) => (
                          <FormItem><FormLabel>Tool Maker</FormLabel><FormControl><Input {...field} placeholder="e.g., STEC" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="jobIdNo" render={({ field }) => (
                          <FormItem><FormLabel>Job ID No.</FormLabel><FormControl><Input {...field} placeholder="e.g., 361" /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 3: Documentation & CAD Data */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Documentation & CAD Data</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="drawing2dAvailable" render={({ field }) => (
                          <FormItem><FormLabel>2D Drawing Available</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                          </Select></FormItem>
                        )} />
                        <FormField control={form.control} name="cad3dAvailable" render={({ field }) => (
                          <FormItem><FormLabel>3D CAD Available</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                          </Select></FormItem>
                        )} />
                        <FormField control={form.control} name="cadDataLocation" render={({ field }) => (
                          <FormItem><FormLabel>CAD Data Location</FormLabel><FormControl><Input {...field} placeholder="e.g., STEC" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="cadDataRevision" render={({ field }) => (
                          <FormItem><FormLabel>CAD Data Revision</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 4: Regulatory Marking */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Regulatory Marking</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="regulatoryMarkingApplicable" render={({ field }) => (
                          <FormItem><FormLabel>Marking Applicable</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                          </Select></FormItem>
                        )} />
                        <FormField control={form.control} name="regulatoryMarkingSpecAvailable" render={({ field }) => (
                          <FormItem><FormLabel>Spec Available</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                          </Select></FormItem>
                        )} />
                        <FormField control={form.control} name="regulatoryMarkingStorageLocation" render={({ field }) => (
                          <FormItem><FormLabel>Storage Location</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="regulatoryMarkingType" render={({ field }) => (
                          <FormItem><FormLabel>Marking Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="Insert">Insert</SelectItem>
                              <SelectItem value="Engraved">Engraved</SelectItem>
                              <SelectItem value="NA">NA</SelectItem>
                            </SelectContent>
                          </Select></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 5: Gate & Hot Runner */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Gate & Hot Runner System</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="numberOfGates" render={({ field }) => (
                          <FormItem><FormLabel>Number of Gates</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="gateType" render={({ field }) => (
                          <FormItem><FormLabel>Gate Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Normal">Normal</SelectItem><SelectItem value="Sequential">Sequential</SelectItem></SelectContent>
                          </Select></FormItem>
                        )} />
                        <FormField control={form.control} name="hotRunnerId" render={({ field }) => (
                          <FormItem><FormLabel>Hot Runner ID</FormLabel><FormControl><Input {...field} placeholder="e.g., S2014051586" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="hotRunnerMake" render={({ field }) => (
                          <FormItem><FormLabel>Hot Runner Make</FormLabel><FormControl><Input {...field} placeholder="e.g., YUDO" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="hotRunnerZones" render={({ field }) => (
                          <FormItem><FormLabel>Hot Runner Zones</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="ejectorSystemType" render={({ field }) => (
                          <FormItem><FormLabel>Ejector System Type</FormLabel><FormControl><Input {...field} placeholder="e.g., Knock out Rod" /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 6: Cooling System */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4">Cooling System</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="coolingLineLpmCore" render={({ field }) => (
                          <FormItem><FormLabel>Cooling LPM Core (@ 5 bar)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} placeholder="e.g., 7" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="coolingLineLpmCavity" render={({ field }) => (
                          <FormItem><FormLabel>Cooling LPM Cavity (@ 5 bar)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} placeholder="e.g., 8" /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="currentLocation" render={({ field }) => (
                          <FormItem><FormLabel>Mould Location</FormLabel><FormControl><Input {...field} placeholder="e.g., ,003" /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* SECTION 7: Additional Information (blend of new + old fields, includes requested fields) */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="currentStatus" render={({ field }) => (
                          <FormItem><FormLabel>Current Status</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="totalShotsCompleted" render={({ field }) => (
                          <FormItem><FormLabel>Total Shots Completed</FormLabel><FormControl><Input type="number" disabled {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                        )} />
                        <FormField control={form.control} name="shotLifeLimit" render={({ field }) => (
                          <FormItem><FormLabel>Shot Life Limit</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                        )} />

                        {/* PM Threshold fields (so table can show PM Date / PM Threshold) */}
                        <FormField
                          control={form.control}
                          name="pmThreshold.pmScheduleFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PM Frequency</FormLabel>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                  >
                                    {field.value.length
                                      ? field.value.join(", ")
                                      : "Select frequency"}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-full">
                                  {["Yearly", "Monthly", "Quarterly"].map(
                                    (option) => (
                                      <DropdownMenuCheckboxItem
                                        key={option}
                                        checked={field.value.includes(option as any)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...field.value,
                                              option,
                                            ]);
                                          } else {
                                            field.onChange(
                                              field.value.filter(
                                                (v) => v !== option
                                              )
                                            );
                                          }
                                        }}
                                      >
                                        {option}
                                      </DropdownMenuCheckboxItem>
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </FormItem>
                          )}
                        />

                        <FormField control={form.control} name="pmThreshold.pmScheduleTime" render={({ field }) => (
                          <FormItem><FormLabel>PM Threshold</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
                        )} />

                        <FormField control={form.control} name="createdBy" render={({ field }) => (
                          <FormItem><FormLabel>Created By</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                        )} />

                        {/* <FormField control={form.control} name="compatibleMachines" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Compatible Machines (comma separated)</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(",").map((s) => s.trim()))} /></FormControl></FormItem>
                        )} /> */}
``
                        <FormField
                          control={form.control}
                          name="mouldReadinessCheckStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Readiness Status</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled
                                  className="bg-muted cursor-not-allowed"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />


                        <FormField control={form.control} name="lastModifiedDate" render={({ field }) => (
                          <FormItem><FormLabel>Last Modified</FormLabel><FormControl><Input type="date" disabled {...field} /></FormControl></FormItem>
                        )} />

                        <FormField control={form.control} name="documents" render={({ field }) => (
                          <FormItem><FormLabel>Documents (comma separated)</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(",").map((s) => s.trim()))} /></FormControl></FormItem>
                        )} />
                        <FormField
                          control={form.control}
                          name="uploadedDocuments"
                          render={({ field }) => (
                            <FormItem className="md:col-span-3">
                              <FormLabel>Upload Documents</FormLabel>

                              <FormControl>
                                <Input
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    const files = e.currentTarget.files
                                      ? Array.from(e.currentTarget.files)
                                      : [];
                                    field.onChange(files);
                                  }}
                                />
                              </FormControl>

                              {/* Preview uploaded files */}
                              {field.value?.length > 0 && (
                                <div className="mt-2 space-y-1 text-sm">
                                  {field.value.map((file, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between rounded border px-2 py-1"
                                    >
                                      <span className="truncate">{file.name}</span>
                                      <span className="text-muted-foreground text-xs">
                                        {(file.size / 1024).toFixed(1)} KB
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FormItem>
                          )}
                        />


                        <FormField control={form.control} name="remarks" render={({ field }) => (
                          <FormItem className="md:col-span-3"><FormLabel>Remarks</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">{editingMould ? "Save Changes" : "Register Mould"}</Button>
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
                {/* EXACT same headers and order as requested */}
                {visibleColumns.id && <TableHead>ID</TableHead>}
                {/* {visibleColumns.mouldCode && <TableHead>Mould Code</TableHead>} */}
                {visibleColumns.mouldName && <TableHead>Name</TableHead>}
                {visibleColumns.partNumber && <TableHead>Part</TableHead>}
                {visibleColumns.supplierName && <TableHead>Supplier</TableHead>}
                {visibleColumns.dateRecieved && <TableHead>Date Received</TableHead>}
                {visibleColumns.currentStatus && <TableHead>Current Status</TableHead>}
                {visibleColumns.totalShotsCompleted && <TableHead>Total Shots</TableHead>}
                {visibleColumns.shotLifeLimit && <TableHead>Life Limit</TableHead>}
                {visibleColumns.pmScheduleFrequency && <TableHead>PM Date</TableHead>}
                {visibleColumns.pmScheduleTime && <TableHead>PM Threshold</TableHead>}
                {visibleColumns.currentLocation && <TableHead>Location</TableHead>}
                {/* {visibleColumns.compatibleMachines && <TableHead>Machines</TableHead>} */}
                {visibleColumns.readinessStatus && <TableHead>Readiness</TableHead>}
                {visibleColumns.documents && <TableHead>Documents</TableHead>}
                {visibleColumns.createdBy && <TableHead>Created By</TableHead>}
                {visibleColumns.lastModifiedDate && <TableHead>Modified</TableHead>}
                {visibleColumns.remarks && <TableHead>Remarks</TableHead>}
                {visibleColumns.url && <TableHead>Details</TableHead>}
                {visibleColumns.actions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {moulds.map((mould) => (
                <TableRow key={mould.mouldIdNo || mould.id}>
                  {visibleColumns.id && <TableCell className="font-medium">{mould.id || mould.mouldIdNo}</TableCell>}
                  {/* {visibleColumns.mouldCode && <TableCell>{mould.mouldCode}</TableCell>} */}
                  {visibleColumns.mouldName && <TableCell>{mould.mouldName}</TableCell>}
                  {visibleColumns.partNumber && (
                    <TableCell>
                      {mould.partNumber && mould.partNumber.length > 0 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              {mould.partNumber.length} Part
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="start" className="min-w-[160px]">
                            {mould.partNumber.map((machine) => (
                              <div key={machine} className="px-2 py-1 text-sm hover:bg-muted rounded-sm">
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
                  {visibleColumns.supplierName && <TableCell>{mould.supplierName || "-"}</TableCell>}
                  {visibleColumns.dateRecieved && <TableCell>{mould.dateRecieved || "-"}</TableCell>}
                  {visibleColumns.currentStatus && <TableCell>{mould.currentStatus}</TableCell>}
                  {visibleColumns.totalShotsCompleted && <TableCell>{mould.totalShotsCompleted?.toLocaleString()}</TableCell>}
                  {visibleColumns.shotLifeLimit && <TableCell>{mould.shotLifeLimit?.toLocaleString?.() ?? mould.shotLifeLimit}</TableCell>}
                  {visibleColumns.pmScheduleFrequency && <TableCell>{mould.pmThreshold?.pmScheduleFrequency || "-"}</TableCell>}
                  {visibleColumns.pmScheduleTime && <TableCell>{mould.pmThreshold?.pmScheduleTime ?? "-"}</TableCell>}
                  {visibleColumns.currentLocation && <TableCell>{mould.currentLocation || "-"}</TableCell>}
                  {/* {visibleColumns.compatibleMachines && (
                    <TableCell>
                      {mould.compatibleMachines && mould.compatibleMachines.length > 0 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              {mould.compatibleMachines.length} Machines
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="start" className="min-w-[160px]">
                            {mould.compatibleMachines.map((machine) => (
                              <div key={machine} className="px-2 py-1 text-sm hover:bg-muted rounded-sm">
                                {machine}
                              </div>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  )} */}

                  {visibleColumns.readinessStatus && (
                    <TableCell>
                      <ReadinessButton status={mould.mouldReadinessCheckStatus} />
                    </TableCell>
                  )}


                  {visibleColumns.documents && (
                    <TableCell>
                      <ArrayDropdownCell items={mould.documents} emptyLabel="No Documents" />
                    </TableCell>
                  )}

                  {visibleColumns.createdBy && <TableCell>{mould.createdBy || "-"}</TableCell>}
                  {visibleColumns.lastModifiedDate && <TableCell>{mould.lastModifiedDate || "-"}</TableCell>}
                  {visibleColumns.remarks && <TableCell className="max-w-[200px] truncate">{mould.remarks || "-"}</TableCell>}

                  {visibleColumns.url && (
                    <TableCell className="max-w-[200px] truncate">
                      <Button onClick={() => handleViewDetails(mould)}>Details</Button>
                    </TableCell>
                  )}

                  {visibleColumns.actions && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(mould)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(mould.mouldIdNo || mould.id)}><Trash2 className="h-4 w-4" /></Button>
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

// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from "../../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogClose,
// } from "../../components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../../components/ui/form';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../../components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../../components/ui/dropdown-menu";
// import { Input } from '../../components/ui/input';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "../../components/ui/card";
// import { PlusCircle, Edit, Trash2, ChevronDown, Settings2 } from "lucide-preact";
// import { useToast } from '../../hooks/use-toast';
// import { ArrayDropdownCell } from '../dropdown/arrayDropDownCell';
// import { mouldDetailData } from "../../lib/data";
// import { mapBackendToMouldForm } from './masterMapping';
// import { type MouldFormValues } from './masterMapping';
// import { useNavigate } from 'react-router-dom';

// /* -------------------- Types -------------------- */

// export interface MouldDetailBackend {
//   _id: { $oid: string };
//   part_code: string[];
//   part_name: string;
//   model: string;
//   mould_no: string;
//   mould_id_no: string;
//   thms_id: string;
//   asset_number: string;
//   customer_name: string;
//   mould_commissioning_date: string;
//   mould_steel_core_cavity: string;
//   mould_weight_core: string;
//   mould_weight_cavity: string;
//   mould_size: string;
//   number_of_cavities: string;
//   tool_maker: string;
//   job_id: number;
//   mould_clamping_tonnage: string;
//   plastic_raw_material: string;
//   drawing_2d_available: string;
//   cad_3d_available: string;
//   cad_data_location: string;
//   cad_data_revision: string;
//   regulatory_marking_applicable: string;
//   regulatory_marking_spec_available: string;
//   regulatory_marking_type: string;
//   number_of_gates: number;
//   gate_type: string;
//   hot_runner_id: string;
//   hot_runner_make: string;
//   hot_runner_zones: number;
//   ejector_system_type: string;
//   cooling_line_lpm_core: number;
//   cooling_line_lpm_cavity: number;
//   mould_location: string;
// }



// /* -------------------- Mock Data -------------------- */


// export function MouldMaster() {
//   const initialMoulds: MouldFormValues[] = [
//     mapBackendToMouldForm(mouldDetailData),
//   ];
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingMould, setEditingMould] = useState<MouldFormValues | null>(null);
//   const [moulds, setMoulds] = useState<MouldFormValues[]>(initialMoulds);
// const navigate = useNavigate()
//   const { toast } = useToast();

//   // --- Column Visibility State ---
//   const [visibleColumns, setVisibleColumns] = useState({
//     id: true,
//     url: true,
//     mouldCode: true,
//     mouldName: true,
//     partNumber: true,
//     supplierName: true,
//     dateRecieved: true,
//     currentStatus: true,
//     totalShotsCompleted: true,
//     shotLifeLimit: true,
//     pmScheduleDate: true,
//     pmScheduleTime: true,
//     currentLocation: true,
//     compatibleMachines: true,
//     readinessStatus: true,
//     documents: true,
//     createdBy: true,
//     lastModifiedDate: true,
//     remarks: true,
//     actions: true,
//   });

//   const form = useForm<MouldFormValues>({
//     defaultValues: {
//       id: "",
//       mouldCode: "",
//       mouldName: "",
//       partNumber: "",
//       supplierName: "",
//       dateRecieved: "",
//       currentStatus: "OK",
//       totalShotsCompleted: 0,
//       shotLifeLimit: 0,
//       pmThreshold: { pmScheduleDate: "", pmScheduleTime: 0 },
//       currentLocation: "",
//       compatibleMachines: [],
//       mouldReadinessCheeckStatus: "",
//       documents: [],
//       createdBy: "",
//       remarks: "",
//       lastModifiedDate: ""
//     },
//   });

//   const onSubmit = (data: MouldFormValues) => {
//     if (editingMould) {
//       setMoulds(moulds.map(m => (m.id === editingMould.id ? data : m)));
//       toast({ title: "Mould Updated", description: `${data.id} updated.` });
//     } else {
//       setMoulds([...moulds, data]);
//       toast({ title: "Mould Added", description: `${data.id} added.` });
//     }
//     setIsDialogOpen(false);
//     setEditingMould(null);
//     form.reset();
//   };

//   const handleEdit = (mould: MouldFormValues) => {
//     setEditingMould(mould);
//     form.reset(mould);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setMoulds(moulds.filter(m => m.id !== id));
//     toast({ title: "Mould Deleted", description: `Mould ${id} has been deleted.` });
//   };

//   const openNewMouldDialog = () => {
//     setEditingMould(null);
//     form.reset({
//       id: "",
//       mouldCode: "",
//       mouldName: "",
//       partNumber: "",
//       supplierName: "",
//       dateRecieved: "",
//       currentStatus: "OK",
//       totalShotsCompleted: 0,
//       shotLifeLimit: 0,
//       pmThreshold: { pmScheduleDate: "", pmScheduleTime: 0 },
//       currentLocation: "",
//       compatibleMachines: [],
//       mouldReadinessCheeckStatus: "",
//       documents: [],
//       createdBy: "",
//       remarks: "",
//       lastModifiedDate: ""
//     });
//     setIsDialogOpen(true);
//   };

//   // Helper to toggle columns
//   const toggleColumn = (key: keyof typeof visibleColumns) => {
//     setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <CardTitle>Mould Master</CardTitle>
//             <CardDescription>Manage all moulds in the system.</CardDescription>
//           </div>
//           <div className="flex gap-2 max-sm:flex-col">
//             {/* COLUMN VISIBILITY DROPDOWN */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="">
//                   <Settings2 className="mr-2 h-4 w-4" />
//                   View Columns
//                   <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="h-64 overflow-y-auto">
//                 {Object.keys(visibleColumns).map((key) => (
//                   <DropdownMenuCheckboxItem
//                     key={key}
//                     className="capitalize"
//                     checked={visibleColumns[key as keyof typeof visibleColumns]}
//                     onCheckedChange={() => toggleColumn(key as keyof typeof visibleColumns)}
//                   >
//                     {key.replace(/([A-Z])/g, ' $1').trim()}
//                   </DropdownMenuCheckboxItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button onClick={openNewMouldDialog}>
//                   <PlusCircle className="mr-2 h-4 w-4" /> Add New Mould
//                 </Button>
//               </DialogTrigger>

//               <DialogContent className="sm:max-w-[800px] bg-white">
//                 <DialogHeader>
//                   <DialogTitle>{editingMould ? 'Edit Mould' : 'Add New Mould'}</DialogTitle>
//                 </DialogHeader>

//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white">
//                     {/* SCROLLABLE GRID CONTAINER */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-[60vh] overflow-y-auto px-1 py-2">
//                       {/* --- FORM FIELDS (unchanged from previous version) --- */}
//                       <FormField control={form.control} name="id" rules={{ required: "Required" }} render={({ field }) => (
//                         <FormItem><FormLabel>Mould ID</FormLabel><FormControl><Input {...field} disabled={!!editingMould} /></FormControl><FormMessage /></FormItem>
//                       )} />
//                       <FormField control={form.control} name="mouldCode" render={({ field }) => (
//                         <FormItem><FormLabel>Mould Code</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="mouldName" render={({ field }) => (
//                         <FormItem><FormLabel>Mould Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="partNumber" render={({ field }) => (
//                         <FormItem><FormLabel>Part Number</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="supplierName" render={({ field }) => (
//                         <FormItem><FormLabel>Supplier Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="dateRecieved" render={({ field }) => (
//                         <FormItem><FormLabel>Date Received</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="totalShotsCompleted" render={({ field }) => (
//                         <FormItem><FormLabel>Total Shots</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="shotLifeLimit" render={({ field }) => (
//                         <FormItem><FormLabel>Shot Life Limit</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="pmThreshold.pmScheduleDate" render={({ field }) => (
//                         <FormItem><FormLabel>PM Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="pmThreshold.pmScheduleTime" render={({ field }) => (
//                         <FormItem><FormLabel>PM Threshold</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.currentTarget.value))} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="currentLocation" render={({ field }) => (
//                         <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="createdBy" render={({ field }) => (
//                         <FormItem><FormLabel>Created By</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="compatibleMachines" render={({ field }) => (
//                         <FormItem><FormLabel>Machines (comma sep)</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(","))} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="lastModifiedDate" render={({ field }) => (
//                         <FormItem><FormLabel>Last Modified</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="documents" render={({ field }) => (
//                         <FormItem><FormLabel>Documents</FormLabel><FormControl><Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.currentTarget.value.split(","))} /></FormControl></FormItem>
//                       )} />
//                       <FormField control={form.control} name="remarks" render={({ field }) => (
//                         <FormItem><FormLabel>Remarks</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
//                       )} />
//                     </div>

//                     <DialogFooter>
//                       <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
//                       <Button type="submit">{editingMould ? "Save Changes" : "Add Mould"}</Button>
//                     </DialogFooter>
//                   </form>
//                 </Form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div className="w-full overflow-x-auto h-96 overflow-y-scroll">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {/* CONDITIONAL HEADERS */}
//                 {visibleColumns.id && <TableHead>ID</TableHead>}
//                 {visibleColumns.mouldCode && <TableHead>Mould Code</TableHead>}
//                 {visibleColumns.mouldName && <TableHead>Name</TableHead>}
//                 {visibleColumns.partNumber && <TableHead>Part</TableHead>}
//                 {visibleColumns.supplierName && <TableHead>Supplier</TableHead>}
//                 {visibleColumns.dateRecieved && <TableHead>Date Received</TableHead>}
//                 {visibleColumns.currentStatus && <TableHead>Current Status</TableHead>}
//                 {visibleColumns.totalShotsCompleted && <TableHead>Total Shots</TableHead>}
//                 {visibleColumns.shotLifeLimit && <TableHead>Life Limit</TableHead>}
//                 {visibleColumns.pmScheduleDate && <TableHead>PM Date</TableHead>}
//                 {visibleColumns.pmScheduleTime && <TableHead>PM Threshold</TableHead>}
//                 {visibleColumns.currentLocation && <TableHead>Location</TableHead>}
//                 {visibleColumns.compatibleMachines && <TableHead>Machines</TableHead>}
//                 {visibleColumns.readinessStatus && <TableHead>Readiness</TableHead>}
//                 {visibleColumns.documents && <TableHead>Documents</TableHead>}
//                 {visibleColumns.createdBy && <TableHead>Created By</TableHead>}
//                 {visibleColumns.lastModifiedDate && <TableHead>Modified</TableHead>}
//                 {visibleColumns.remarks && <TableHead>Remarks</TableHead>}
//                 {visibleColumns.url && <TableHead>Details</TableHead>}
//                 {visibleColumns.actions && <TableHead className="text-right">Actions</TableHead>}
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {moulds.map((mould) => (
//                 <TableRow key={mould.id}>
//                   {/* CONDITIONAL CELLS - Must match Header order exactly */}
//                   {visibleColumns.id && <TableCell className="font-medium">{mould.id}</TableCell>}
//                   {visibleColumns.mouldCode && <TableCell>{mould.mouldCode}</TableCell>}
//                   {visibleColumns.mouldName && <TableCell>{mould.mouldName}</TableCell>}
//                   {visibleColumns.partNumber && <TableCell>{mould.partNumber}</TableCell>}
//                   {visibleColumns.supplierName && <TableCell>{mould.supplierName}</TableCell>}
//                   {visibleColumns.dateRecieved && <TableCell>{mould.dateRecieved}</TableCell>}
//                   {visibleColumns.currentStatus && <TableCell>{mould.currentStatus}</TableCell>}
//                   {visibleColumns.totalShotsCompleted && <TableCell>{mould.totalShotsCompleted?.toLocaleString()}</TableCell>}
//                   {visibleColumns.shotLifeLimit && <TableCell>{mould.shotLifeLimit?.toLocaleString()}</TableCell>}
//                   {visibleColumns.pmScheduleDate && <TableCell>{mould.pmThreshold?.pmScheduleDate}</TableCell>}
//                   {visibleColumns.pmScheduleTime && <TableCell>{mould.pmThreshold?.pmScheduleTime}</TableCell>}
//                   {visibleColumns.currentLocation && <TableCell>{mould.currentLocation}</TableCell>}
//                   {visibleColumns.compatibleMachines && (
//                     <TableCell>
//                       {mould.compatibleMachines && mould.compatibleMachines.length > 0 ? (
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="flex items-center gap-1"
//                             >
//                               {mould.compatibleMachines.length} Machines
//                               <ChevronDown className="h-3 w-3" />
//                             </Button>
//                           </DropdownMenuTrigger>

//                           <DropdownMenuContent align="start" className="min-w-[160px]">
//                             {mould.compatibleMachines.map((machine) => (
//                               <div
//                                 key={machine}
//                                 className="px-2 py-1 text-sm hover:bg-muted rounded-sm"
//                               >
//                                 {machine}
//                               </div>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         "-"
//                       )}
//                     </TableCell>
//                   )}

//                   {visibleColumns.readinessStatus && <TableCell>{mould.mouldReadinessCheeckStatus || "-"}</TableCell>}
//                   {visibleColumns.documents && (
//                     <TableCell>
//                       <ArrayDropdownCell items={mould.documents} emptyLabel="No Documents" />
//                     </TableCell>
//                   )}

//                   {visibleColumns.createdBy && <TableCell>{mould.createdBy}</TableCell>}
//                   {visibleColumns.lastModifiedDate && <TableCell>{mould.lastModifiedDate}</TableCell>}
//                   {visibleColumns.remarks && <TableCell className="max-w-[200px] truncate">{mould.remarks}</TableCell>}
//                   {visibleColumns.url && <TableCell className="max-w-[200px] truncate"><Button onClick={() => {
//                     navigate("/master-list-checksheet")
//                   }} >Details</Button></TableCell>}

//                   {visibleColumns.actions && (
//                     <TableCell className="text-right">
//                       <Button variant="ghost" size="icon" onClick={() => handleEdit(mould)}><Edit className="h-4 w-4" /></Button>
//                       <Button variant="ghost" size="icon" onClick={() => handleDelete(mould.id!)}><Trash2 className="h-4 w-4" /></Button>
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }