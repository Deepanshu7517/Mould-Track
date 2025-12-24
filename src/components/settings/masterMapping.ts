interface thresHold {
  pmScheduleDate?: string;
  pmScheduleTime?: number;
}

export interface MouldFormValues {
  id?: string;
  url?: string; // ✅ NEW
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

export interface MouldDetailBackend {
  _id: { $oid: string };
  part_code: string[];
  part_name: string;
  model: string;
  mould_no: string;
  mould_id_no: string;
  thms_id: string;
  asset_number: string;
  customer_name: string;
  mould_commissioning_date: string;
  mould_steel_core_cavity: string;
  mould_weight_core: string;
  mould_weight_cavity: string;
  mould_size: string;
  number_of_cavities: string;
  tool_maker: string;
  job_id: number;
  mould_clamping_tonnage: string;
  plastic_raw_material: string;
  drawing_2d_available: string;
  cad_3d_available: string;
  cad_data_location: string;
  cad_data_revision: string;
  regulatory_marking_applicable: string;
  regulatory_marking_spec_available: string;
  regulatory_marking_type: string;
  number_of_gates: number;
  gate_type: string;
  hot_runner_id: string;
  hot_runner_make: string;
  hot_runner_zones: number;
  ejector_system_type: string;
  cooling_line_lpm_core: number;
  cooling_line_lpm_cavity: number;
  mould_location: string;
}

const formatMachineId = (index: number) =>
  `Machine ${String(index + 1).padStart(3, "0")}`;

export const mapBackendToMouldForm = (
  data: MouldDetailBackend
): MouldFormValues => {
  return {
    id: data._id.$oid,

  
    url: data._id.$oid,

    mouldCode: data.mould_id_no,
    mouldName: data.part_name,
    partNumber: data.part_code.join(", "),
    supplierName: data.customer_name,
    dateRecieved: data.mould_commissioning_date,
    currentStatus: "OK",
    totalShotsCompleted: 0,
    shotLifeLimit: 0,
    pmThreshold: {
      pmScheduleDate: "",
      pmScheduleTime: 0,
    },
    currentLocation: `Location ${data.mould_location}`,
    compatibleMachines: Array.from({ length: 3 }).map((_, i) =>
      formatMachineId(i)
    ),
    mouldReadinessCheeckStatus:
      data.drawing_2d_available === "Available" ? "Approved" : "Pending",
    documents: [
      "2D Drawing",
      "3D CAD",
      "Tool Specification",
    ],
    remarks: `Model: ${data.model}, Cavities: ${data.number_of_cavities}`,
    createdBy: data.tool_maker,
    lastModifiedDate: new Date().toISOString().split("T")[0],
  };
};
