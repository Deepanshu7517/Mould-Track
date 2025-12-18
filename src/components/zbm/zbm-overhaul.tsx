
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Award,
  CheckCircle,
  ClipboardList,
  Cog,
  FileText,
  Search,
  Settings2,
  Wrench,
  Upload,
} from 'lucide-preact';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { machineData } from '../../lib/data';

const zbmPhases = [
  {
    value: 'phase-1',
    title: '1. Planning',
    icon: <ClipboardList className="h-5 w-5" />,
    description: 'Define scope, spares, and resources for the overhaul.',
  },
  {
    value: 'phase-2',
    title: '2. Total Disassembly',
    icon: <Wrench className="h-5 w-5" />,
    description: 'Document and upload inspection photos during disassembly.',
  },
  {
    value: 'phase-3',
    title: '3. Inspection',
    icon: <Search className="h-5 w-5" />,
    description: 'Record wear, fatigue, misalignment, and other findings.',
  },
  {
    value: 'phase-4',
    title: '4. Repair/Rebuild',
    icon: <Cog className="h-5 w-5" />,
    description: 'Enter replaced parts and their OEM references.',
  },
  {
    value: 'phase-5',
    title: '5. Reassembly & Alignment',
    icon: <Settings2 className="h-5 w-5" />,
    description: 'Record torque, lubrication, and alignment data.',
  },
  {
    value: 'phase-6',
    title: '6. Validation Test',
    icon: <FileText className="h-5 w-5" />,
    description: 'Record post-rebuild vibration, energy, and temperature data.',
  },
  {
    value: 'phase-7',
    title: '7. Final Approval',
    icon: <Award className="h-5 w-5" />,
    description:
      'Generate ZBM certificate and reset the mould’s health score.',
  },
];

export function ZbmOverhaul() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Accordion type="single" collapsible className="w-full" defaultValue="phase-1">
          {zbmPhases.map((phase) => (
            <AccordionItem key={phase.value} value={phase.value}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  {phase.icon}
                  <div>
                    {phase.title}
                    <p className="text-sm font-normal text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {phase.value === 'phase-1' && (
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label htmlFor="scope">Overhaul Scope</Label>
                       <Textarea id="scope" placeholder="Define the scope of this ZBM..."/>
                     </div>
                      <div className="space-y-2">
                       <Label htmlFor="spares">Required Spares</Label>
                       <Textarea id="spares" placeholder="List required spare parts, e.g., 'Part #123, OEM-Ref-XYZ'..."/>
                     </div>
                      <div className="space-y-2">
                       <Label htmlFor="resources">Resources</Label>
                       <Input id="resources" placeholder="e.g., Lead Engineer, 2 Technicians"/>
                     </div>
                   </div>
                )}
                {phase.value === 'phase-2' && (
                    <div className="space-y-4">
                        <Label>Upload Disassembly Photos</Label>
                        <div className="relative">
                            <Upload className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input type="file" className="pl-10" multiple/>
                        </div>
                    </div>
                )}
                 {phase.value === 'phase-3' && (
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label htmlFor="wear">Wear & Fatigue Notes</Label>
                       <Textarea id="wear" placeholder="Record observations on component wear and fatigue..."/>
                     </div>
                      <div className="space-y-2">
                       <Label htmlFor="misalignment">Misalignment Findings</Label>
                       <Textarea id="misalignment" placeholder="Record observations on component misalignment..."/>
                     </div>
                   </div>
                )}
                 {phase.value === 'phase-4' && (
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label htmlFor="replaced-parts">Replaced Parts & OEM References</Label>
                       <Textarea id="replaced-parts" placeholder="Part #5678, OEM-ABC-123..."/>
                     </div>
                   </div>
                )}
                 {phase.value === 'phase-5' && (
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <Label htmlFor="torque">Torque & Lubrication Data</Label>
                       <Textarea id="torque" placeholder="Enter torque values, lubricant types, and quantities..."/>
                     </div>
                   </div>
                )}
                 {phase.value === 'phase-6' && (
                   <div className="grid grid-cols-3 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="vibration">Vibration (mm/s)</Label>
                       <Input id="vibration" type="number" placeholder="e.g., 0.5"/>
                     </div>
                      <div className="space-y-2">
                       <Label htmlFor="energy">Energy (kWh)</Label>
                       <Input id="energy" type="number" placeholder="e.g., 25.3"/>
                     </div>
                      <div className="space-y-2">
                       <Label htmlFor="temp">Temperature (°C)</Label>
                       <Input id="temp" type="number" placeholder="e.g., 65"/>
                     </div>
                   </div>
                )}
                {phase.value === 'phase-7' && (
                   <div className="text-center space-y-4">
                     <p>All phases are complete. Ready for final approval?</p>
                     <Button size="lg">
                        <Award className="mr-2 h-4 w-4" />
                        Generate ZBM Certificate & Reset Health Score
                     </Button>
                   </div>
                )}
                <Button className="mt-4">
                    <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>ZBM Overhaul Details</CardTitle>
            <CardDescription>
              Select the mould to begin the ZBM process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="mouldId">Mould ID</Label>
                  <Select defaultValue="mld-45b-01">
                    <SelectTrigger id="mouldId">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {machineData.map((machine) => (
                        <SelectItem key={machine.id} value={machine.id}>
                          {machine.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Start ZBM</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
