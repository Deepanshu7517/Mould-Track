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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { PlusCircle, Edit, Trash2, CalendarIcon, Upload, Paperclip } from "lucide-preact";
import { useToast } from '../../hooks/use-toast';
import { assetData, type Asset } from '../../lib/data';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '../../lib/utils';
import { format, isBefore } from 'date-fns';
import { Calendar } from '../ui/calendar';

type AssetFormValues = {
  serialNo: string
  name: string
  category: "Machinery" | "Tooling" | "Electronics" | "Facility"
  status: "In Use" | "In Repair" | "In Storage" | "Decommissioned"
  location: string
  purchaseDate: Date
  value: number
  serviceInterval?: number
  nextServiceDate?: Date
  expiryDate?: Date
  attachments?: FileList | null
}


export function AssetMaster() {
  const [assets, setAssets] = useState<Asset[]>(assetData.map(a => ({
    ...a,
    purchaseDate: new Date(a.purchaseDate).toISOString(),
    nextServiceDate: a.nextServiceDate ? new Date(a.nextServiceDate).toISOString() : undefined,
    expiryDate: a.expiryDate ? new Date(a.expiryDate).toISOString() : undefined,
  })));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const form = useForm<AssetFormValues>({
    defaultValues: {
      serialNo: "",
      name: "",
      category: "Machinery",
      status: "In Use",
      location: "",
      value: 0,
    },
  })

  const onSubmit = (data: AssetFormValues) => {
    const hasAttachments = data.attachments && data.attachments.length > 0
    const { attachments, ...rest } = data

    const submissionData = {
      ...rest,
      purchaseDate: data.purchaseDate.toISOString(),
      nextServiceDate: data.nextServiceDate?.toISOString(),
      expiryDate: data.expiryDate?.toISOString(),
      attachmentsCount: hasAttachments
        ? (editingAsset?.attachmentsCount || 0) + data.attachments!.length
        : editingAsset?.attachmentsCount,
    }

    if (editingAsset) {
      setAssets(
        assets.map(a =>
          a.serialNo === editingAsset.serialNo
            ? { ...editingAsset, ...submissionData }
            : a
        )
      )
      toast({ title: "Asset Updated", description: `${data.name} updated.` })
    } else {
      setAssets([...assets, { ...submissionData, attachmentsCount: hasAttachments ? data.attachments!.length : 0 }])
      toast({ title: "Asset Added", description: `${data.name} added.` })
    }

    setIsDialogOpen(false)
    setEditingAsset(null)
  }


  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    form.reset({
      ...asset,
      purchaseDate: new Date(asset.purchaseDate),
      nextServiceDate: asset.nextServiceDate ? new Date(asset.nextServiceDate) : undefined,
      expiryDate: asset.expiryDate ? new Date(asset.expiryDate) : undefined,
      attachments: null,
    });
    setIsDialogOpen(true);
  }

  const handleDelete = (serialNo: string) => {
    setAssets(assets.filter(a => a.serialNo !== serialNo));
    toast({ title: "Asset Deleted", description: `Asset ${serialNo} has been deleted.` });
  }

  const openNewAssetDialog = () => {
    setEditingAsset(null);
    form.reset({
      serialNo: `ASSET-00${assets.length + 1}`,
      name: '',
      category: 'Machinery',
      status: 'In Use',
      location: '',
      value: 0,
      purchaseDate: new Date(),
      serviceInterval: 6,
      attachments: null,
    });
    setIsDialogOpen(true);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Asset Inventory</CardTitle>
            <CardDescription>Manage all company assets in one place.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);
            if (!isOpen) {
              setEditingAsset(null);
              form.reset();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={openNewAssetDialog}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="serialNo"
                    rules={{ required: "Serial No. is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial No.</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!!editingAsset} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asset Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Machinery">Machinery</SelectItem>
                          <SelectItem value="Tooling">Tooling</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Facility">Facility</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="In Use">In Use</SelectItem>
                          <SelectItem value="In Repair">In Repair</SelectItem>
                          <SelectItem value="In Storage">In Storage</SelectItem>
                          <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField
                    control={form.control}
                    name="location"
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purchaseDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Purchase Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    rules={{
                      required: "Value is required",
                      min: { value: 1, message: "Value must be positive" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="serviceInterval" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interval (Months)</FormLabel>
                      <FormControl><Input type="number" {...field} placeholder="e.g., 6" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField
                    control={form.control}
                    name="nextServiceDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Next Service Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange}  />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange}  />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Attachments (Manuals, Warranty){' '}
                          {editingAsset && editingAsset.attachmentsCount && (
                            <span className='text-sm text-muted-foreground'>({editingAsset.attachmentsCount} files attached)</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Upload className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="file"
                              className="pl-10"
                              multiple
                              onChange={(e) => field.onChange(e.currentTarget.files)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="md:col-span-2">
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit">{editingAsset ? 'Save Changes' : 'Add Asset'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map(asset => (
                <TableRow key={asset.serialNo}>
                  <TableCell className="font-medium">{asset.serialNo}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {asset.name}
                    {asset.attachmentsCount && asset.attachmentsCount > 0 && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                  </TableCell>
                  <TableCell><Badge variant="outline">{asset.category}</Badge></TableCell>
                  <TableCell>
                    <Badge
                      variant={asset.status === 'In Use' ? 'default' : asset.status === 'In Repair' ? 'destructive' : 'secondary'}
                      className={cn(asset.status === 'In Use' && 'bg-green-600')}
                    >
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{format(new Date(asset.purchaseDate), "PPP")}</TableCell>
                  <TableCell className={cn(
                    asset.nextServiceDate && isBefore(new Date(asset.nextServiceDate), new Date()) && 'text-destructive font-bold'
                  )}>
                    {asset.nextServiceDate ? format(new Date(asset.nextServiceDate), "PPP") : 'N/A'}
                  </TableCell>
                  <TableCell className={cn(
                    asset.expiryDate && isBefore(new Date(asset.expiryDate), new Date()) && 'text-destructive font-bold'
                  )}>
                    {asset.expiryDate ? format(new Date(asset.expiryDate), "PPP") : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(asset)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(asset.serialNo)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}


