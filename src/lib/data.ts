
export type Machine = {
  id: string;
  name: string;
  model: string;
  status: 'Running' | 'Breakdown' | 'Maintenance' | 'Idle';
  strokeCount: number;
  utilizationLimit: number;
  healthScore: number;
  oilLevel: number;
  lastServiced: string;
};

export type RealTimeMachineData = Machine & {
  cycleTime: number;
  partCount: number;
  liveStatus: 'Running' | 'Breakdown' | 'Maintenance' | 'Idle';
};

export const machineData: Machine[] = [
  { id: 'MC-001', name: 'Moulding Machine 1', model: 'M-100A', status: 'Running', strokeCount: 85000, utilizationLimit: 100000, healthScore: 92, oilLevel: 80, lastServiced: '2023-10-15' },
  { id: 'MC-002', name: 'Moulding Machine 2', model: 'M-100B', status: 'Running', strokeCount: 98500, utilizationLimit: 100000, healthScore: 78, oilLevel: 65, lastServiced: '2023-09-20' },
  { id: 'MC-003', name: 'Moulding Machine 3', model: 'M-200X', status: 'Breakdown', strokeCount: 150200, utilizationLimit: 200000, healthScore: 45, oilLevel: 20, lastServiced: '2023-08-01' },
  { id: 'MC-004', name: 'Moulding Machine 4', model: 'M-100A', status: 'Maintenance', strokeCount: 45000, utilizationLimit: 100000, healthScore: 88, oilLevel: 95, lastServiced: '2023-11-01' },
  { id: 'MC-005', name: 'Moulding Machine 5', model: 'M-300P', status: 'Idle', strokeCount: 10500, utilizationLimit: 150000, healthScore: 99, oilLevel: 75, lastServiced: '2023-10-25' },
  { id: 'MC-006', name: 'Moulding Machine 6', model: 'M-200X', status: 'Running', strokeCount: 195000, utilizationLimit: 200000, healthScore: 62, oilLevel: 40, lastServiced: '2023-09-10' },
];

export type Asset = {
  serialNo: string;
  name: string;
  category: 'Machinery' | 'Tooling' | 'Electronics' | 'Facility';
  status: 'In Use' | 'In Repair' | 'In Storage' | 'Decommissioned';
  location: string;
  purchaseDate: string;
  value: number;
  serviceInterval?: number;
  nextServiceDate?: string;
  attachmentsCount?: number;
  expiryDate?: string;
};

export const assetData: Asset[] = [
  { serialNo: 'ASSET-001', name: 'CNC Mill', category: 'Machinery', status: 'In Use', location: 'Shop Floor A', purchaseDate: '2021-06-10', value: 120000, serviceInterval: 6, nextServiceDate: '2024-08-10', attachmentsCount: 2, expiryDate: '2026-06-10' },
  { serialNo: 'ASSET-002', name: 'Laser Scanner', category: 'Electronics', status: 'In Use', location: 'Quality Lab', purchaseDate: '2022-03-15', value: 35000, serviceInterval: 12, nextServiceDate: '2025-03-15', attachmentsCount: 1, expiryDate: '2025-03-15' },
  { serialNo: 'ASSET-003', name: 'Forklift', category: 'Facility', status: 'In Repair', location: 'Warehouse', purchaseDate: '2019-01-20', value: 25000, serviceInterval: 4, nextServiceDate: '2024-05-20', expiryDate: '2023-01-20' },
  { serialNo: 'ASSET-004', name: 'Torque Wrench Calibration Kit', category: 'Tooling', status: 'In Storage', location: 'Tool Crib', purchaseDate: '2023-08-01', value: 5000, expiryDate: '2028-08-01' },
  { serialNo: 'ASSET-005', name: 'Air Compressor', category: 'Facility', status: 'Decommissioned', location: 'Storage Yard', purchaseDate: '2015-05-30', value: 8000 },
];


export type TeamMember = {
  id: string;
  name: string;
  role: 'Operator' | 'Maintenance Engineer' | 'Supervisor' | 'QA';
  department: string;
};

export const teamData: TeamMember[] = [
    { id: 'EMP-001', name: 'John Doe', role: 'Maintenance Engineer', department: 'Maintenance' },
    { id: 'EMP-002', name: 'Jane Smith', role: 'Operator', department: 'Production' },
    { id: 'EMP-003', name: 'Mike Brown', role: 'Supervisor', department: 'Production' },
    { id: 'EMP-004', name: 'Sara Wilson', role: 'QA', department: 'Quality' },
    { id: 'EMP-005', name: 'Chris Green', role: 'Maintenance Engineer', department: 'Maintenance' },
];


export type MachineStats = {
  running: number;
  breakdown: number;
  maintenance: number;
  idle: number;
  pendingPM: number;
  activeBreakdowns: number;
  qualityAlerts: number;
}

export const machineStats: MachineStats = {
  running: machineData.filter(m => m.status === 'Running').length,
  breakdown: machineData.filter(m => m.status === 'Breakdown').length,
  maintenance: machineData.filter(m => m.status === 'Maintenance').length,
  idle: machineData.filter(m => m.status === 'Idle').length,
  pendingPM: 3,
  activeBreakdowns: 1,
  qualityAlerts: 2,
};

export type HealthHistory = {
  month: string;
  avgHealthScore: number;
};

export const healthHistory: HealthHistory[] = [
  { month: 'Jan', avgHealthScore: 88 },
  { month: 'Feb', avgHealthScore: 85 },
  { month: 'Mar', avgHealthScore: 86 },
  { month: 'Apr', avgHealthScore: 82 },
  { month: 'May', avgHealthScore: 78 },
  { month: 'Jun', avgHealthScore: 75 },
  { month: 'Jul', avgHealthScore: 79 },
  { month: 'Aug', avgHealthScore: 81 },
];

export type BreakdownLog = {
    id: string;
    machineId: string;
    downtimeStart: string;
    downtimeEnd: string | null;
    rootCause: string;
    status: "Open" | "Closed";
    recurrence: number;
};

export const breakdownLogs: BreakdownLog[] = [
    { id: "BD-001", machineId: "MC-003", downtimeStart: "2023-10-26T10:00:00Z", downtimeEnd: "2023-10-26T14:30:00Z", rootCause: "Hydraulic pump failure", status: "Closed", recurrence: 3 },
    { id: "BD-002", machineId: "MC-006", downtimeStart: "2023-10-27T08:15:00Z", downtimeEnd: null, rootCause: "Cooling system leak", status: "Open", recurrence: 1 },
    { id: "BD-003", machineId: "MC-001", downtimeStart: "2023-09-15T14:00:00Z", downtimeEnd: "2023-09-15T15:00:00Z", rootCause: "Sensor malfunction", status: "Closed", recurrence: 1 },
];

export type PMTask = {
  ticketId: string;
  machineId: string;
  machineName: string;
  location: string;
  activity: string;
  frequency: string;
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Scheduled';
  assignee: string;
  dueDate: string;
  checklist?: string[];
};

export const pmSchedule: PMTask[] = [
  {
    ticketId: 'PM-001',
    machineId: 'MC-001',
    machineName: 'Moulding Machine 1',
    location: 'Shop Floor A',
    activity: 'Monthly Lubrication',
    frequency: 'Monthly',
    status: 'Completed',
    assignee: 'John Doe',
    dueDate: '2024-07-15',
    checklist: ['Check lubrication levels', 'Grease all fittings', 'Inspect for leaks'],
  },
  {
    ticketId: 'PM-002',
    machineId: 'MC-002',
    machineName: 'Moulding Machine 2',
    location: 'Shop Floor A',
    activity: 'Quarterly Hydraulic Check',
    frequency: 'Quarterly',
    status: 'In Progress',
    assignee: 'Jane Smith',
    dueDate: '2024-07-20',
  },
  {
    ticketId: 'PM-003',
    machineId: 'MC-004',
    machineName: 'Moulding Machine 4',
    location: 'Shop Floor B',
    activity: 'Weekly Electrical Check',
    frequency: 'Weekly',
    status: 'Overdue',
    assignee: 'Mike Brown',
    dueDate: '2024-07-10',
  },
  {
    ticketId: 'PM-004',
    machineId: 'MC-005',
    machineName: 'Moulding Machine 5',
    location: 'Shop Floor C',
    activity: 'Annual Calibration',
    frequency: 'Annually',
    status: 'Scheduled',
    assignee: 'Sara Wilson',
    dueDate: '2024-07-25',
  },
  {
    ticketId: 'PM-005',
    machineId: 'MC-006',
    machineName: 'Moulding Machine 6',
    location: 'Shop Floor C',
    activity: 'Monthly Filter Replacement',
    frequency: 'Monthly',
    status: 'Scheduled',
    assignee: 'Chris Green',
    dueDate: '2024-07-18',
  },
   {
    ticketId: 'PM-006',
    machineId: 'MC-001',
    machineName: 'Moulding Machine 1',
    location: 'Shop Floor A',
    activity: 'Weekly Cleaning',
    frequency: 'Weekly',
    status: 'Completed',
    assignee: 'John Doe',
    dueDate: '2024-07-25',
  },
];

    

export type Checksheet = {
  id: string;
  name: string;
  category: 'ECM' | 'HVAC' | 'Fixture' | 'Mould';
  tasks: string[];
};

export const checksheetData: Checksheet[] = [
    { 
        id: 'CS-001', 
        name: 'ECM Daily Inspection',
        category: 'ECM',
        tasks: ['Check for error codes', 'Inspect wiring harness', 'Listen for unusual noises'] 
    },
    { 
        id: 'CS-002', 
        name: 'HVAC Monthly Service',
        category: 'HVAC',
        tasks: ['Clean filters', 'Check refrigerant levels', 'Inspect blower motor'] 
    },
    { 
        id: 'CS-003', 
        name: 'Fixture Pre-Production Setup',
        category: 'Fixture',
        tasks: ['Verify clamp pressure', 'Check alignment pins', 'Confirm sensor functionality'] 
    },
    { 
        id: 'CS-004', 
        name: 'Mould General PM',
        category: 'Mould',
        tasks: ['Clean mould face', 'Inspect for flashing', 'Lubricate ejector pins', 'Check cooling channels'] 
    },
];
