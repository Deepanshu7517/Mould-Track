import { PageHeader } from "../../../components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";

export default function CheckSheetPage() {
  return (
    <div className="space-y-4 md:space-y-6 pb-12 max-md:pb-24 max-sm:pb-30">
      <PageHeader
        title="Check Sheet Management"
        description="Create, manage, and track digital check sheets for various maintenance and operational tasks."
      />
      <Card>
        <CardHeader>
          <CardTitle>Check Sheets</CardTitle>
          <CardDescription>
            Select a category to view or create a check sheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="max-w-sm space-y-2">
                <Label htmlFor="category-select">Category</Label>
                <Select>
                  <SelectTrigger id="category-select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecm">ECM</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="fixture">Fixture</SelectItem>
                    <SelectItem value="both-moulds">Both Moulds</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <p className="text-sm text-muted-foreground">Check sheet content for the selected category will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
