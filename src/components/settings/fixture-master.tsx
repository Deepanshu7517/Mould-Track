'use client';

import { useState } from "react";
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
import { Button } from "../../components/ui/button";
import { Edit, Trash2, Settings2, ChevronDown } from "lucide-preact";

/* -------------------- TYPES -------------------- */

interface fixtureMasterType {
  id: string;
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
    id: "FX-002",
    fixtureCode: "FIX-1002",
    fixtureName: "Rear Bracket Fixture",
    model: "RB-MD",
    supplierName: "MechWorks India",
    dateReceived: "2023-11-05",
    validationCycle: "12 Months",
    lastValidationDate: "2023-11-05",
    nextValidationDate: "2024-11-05",
    currentStatus: "Validation Due",
    currentLocation: "Production Line 2",
    documents: "rear-bracket-drawing.pdf",
    remarks: "Validation pending",
    createdBy: "Quality Team",
    lastModifiedDate: "2024-10-20",
  },
];

/* -------------------- COMPONENT -------------------- */

export function FixtureMaster() {
  const [fixtures] = useState<fixtureMasterType[]>(mockFixtures);

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

          {/* COLUMN VISIBILITY */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings2 className="mr-2 h-4 w-4" />
                View Columns
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="h-64 overflow-y-auto">
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
                  {visibleColumns.fixtureCode && <TableCell>{fixture.fixtureCode}</TableCell>}
                  {visibleColumns.fixtureName && <TableCell>{fixture.fixtureName}</TableCell>}
                  {visibleColumns.model && <TableCell>{fixture.model}</TableCell>}
                  {visibleColumns.supplierName && <TableCell>{fixture.supplierName}</TableCell>}
                  {visibleColumns.dateReceived && <TableCell>{fixture.dateReceived}</TableCell>}
                  {visibleColumns.validationCycle && <TableCell>{fixture.validationCycle}</TableCell>}
                  {visibleColumns.lastValidationDate && <TableCell>{fixture.lastValidationDate}</TableCell>}
                  {visibleColumns.nextValidationDate && <TableCell>{fixture.nextValidationDate}</TableCell>}
                  {visibleColumns.currentStatus && <TableCell>{fixture.currentStatus}</TableCell>}
                  {visibleColumns.currentLocation && <TableCell>{fixture.currentLocation}</TableCell>}
                  {visibleColumns.documents && <TableCell>{fixture.documents}</TableCell>}
                  {visibleColumns.createdBy && <TableCell>{fixture.createdBy}</TableCell>}
                  {visibleColumns.lastModifiedDate && <TableCell>{fixture.lastModifiedDate}</TableCell>}
                  {visibleColumns.remarks && (
                    <TableCell className="max-w-[200px] truncate">
                      {fixture.remarks}
                    </TableCell>
                  )}

                  {visibleColumns.actions && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
