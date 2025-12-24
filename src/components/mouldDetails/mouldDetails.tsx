import { PageHeader } from "../page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { mouldDetailData } from "../../lib/data";

/* -------------------- Types -------------------- */

interface MouldDetail {
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

/* -------------------- Helpers -------------------- */

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

interface DetailItemProps {
  label: string;
  value: unknown;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-4 text-sm">
      <p className="font-medium text-muted-foreground">{label}</p>
      <p className="text-foreground">{formatValue(value)}</p>
    </div>
  );
}

/* -------------------- Component -------------------- */

function MouldDetails() {
  const data: MouldDetail = mouldDetailData;

  const excludedKeys: Array<keyof MouldDetail> = ["_id"];

  const displayableKeys = (
    Object.keys(data) as Array<keyof MouldDetail>
  ).filter((key) => !excludedKeys.includes(key));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.part_name}</CardTitle>
        <CardDescription>Mould ID: {data.mould_id_no}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-y-4 gap-x-8">
          {displayableKeys.map((key) => (
            <DetailItem
              key={String(key)}
              label={formatKey(key)}
              value={data[key]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MouldDetailsPage() {
  return (
    <div className="space-y-8 pb-12 max-md:pb-24 max-sm:pb-30">
      <div className="flex justify-between">
        <PageHeader
          title="Mould Details"
          description="Detailed information for a single mould."
        />
      </div>
      <MouldDetails />
    </div>
  );
}
