/**
 * Note: The Image component has been replaced with a standard <img> tag.
 * The Next.js specific imports ('use client', Image) and external dependencies 
 * for utilities (cn, PlaceHolderImages, component imports) have been removed 
 * or mocked for a self-contained Preact/TS/Tailwind example.
 */

import { useState, type FunctionComponent } from "preact/compat";

// --- MOCK UTILITIES AND COMPONENTS (For demonstration purposes) ---

// Simple utility function equivalent to 'cn' for Tailwind class merging
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

// Mock Components (representing the ShadCN-like components)
const PageHeader: FunctionComponent<{ title: string; description: string }> = ({ title, description }) => (
    <header className="pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
    </header>
);
const Card: FunctionComponent<{ className?: string, children: any }> = ({ className, children }) => (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-4", className)}>
        {children}
    </div>
);
const CardHeader: FunctionComponent<{ children: any }> = ({ children }) => (
    <div className="flex flex-col space-y-1.5 p-0">{children}</div>
);
const CardTitle: FunctionComponent<{ className?: string, children: any }> = ({ className, children }) => (
    <h3 className={cn("font-semibold leading-none tracking-tight", className)}>{children}</h3>
);
const CardDescription: FunctionComponent<{ children: any }> = ({ children }) => (
    <p className="text-sm text-muted-foreground">{children}</p>
);
const CardContent: FunctionComponent<{ className?: string, children: any }> = ({ className, children }) => (
    <div className={cn("p-0 pt-6", className)}>{children}</div>
);
const Button: FunctionComponent<{ className?: string, onClick?: () => void, disabled?: boolean, size?: 'sm' | 'md' | 'lg', children: any }> = ({ className, onClick, disabled, size = 'md', children }) => {
    const sizeClasses = size === 'lg' ? 'h-11 px-8' : size === 'sm' ? 'h-9 px-3' : 'h-10 px-4';
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90", sizeClasses, className)}
        >
            {children}
        </button>
    );
};
const Badge: FunctionComponent<{ variant?: 'default' | 'secondary' | 'destructive', className?: string, children: any }> = ({ variant = 'default', className, children }) => {
    let baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    const variantClasses = {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    };
    return (
        <div className={cn(baseClasses, variantClasses[variant] || variantClasses.default, className)}>
            {children}
        </div>
    );
};

// --- REAL IMPORTS ---
import { QrCode, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-preact";

// --- MOCK IMAGE DATA ---
const MOCK_IMAGE_URL = 'https://via.placeholder.com/200/000000/FFFFFF?text=QR+Code+Placeholder';

// --- COMPONENT LOGIC ---

type ValidationStatus = "success" | "fail" | "pending";

const ValidationPage: FunctionComponent = () => {
    const [validationStatus, setValidationStatus] = useState<ValidationStatus>("pending");

    const handleScan = () => {
        // Cycling logic is preserved
        setValidationStatus(currentStatus => {
            if (currentStatus === 'pending') return 'success';
            if (currentStatus === 'success') return 'fail';
            return 'pending';
        });
    };

    const getStatusContent = () => {
        switch (validationStatus) {
            case 'success':
                return {
                    icon: <ThumbsUp className="h-12 w-12 text-green-500" />,
                    title: "OK",
                    description: "Mould and machine mapping is correct.",
                    badge: <Badge className="bg-green-500 hover:bg-green-600">Matched</Badge>,
                    cardClass: "bg-green-500/10 border-green-500/50"
                };
            case 'fail':
                return {
                    icon: <ThumbsDown className="h-12 w-12 text-red-500" />,
                    title: "NG (No Go)",
                    description: "Incorrect mould-machine pairing.",
                    badge: <Badge variant="destructive">Mismatch</Badge>,
                    cardClass: "bg-red-500/10 border-red-500/50"
                };
            default: // 'pending'
                return {
                    icon: <QrCode className="h-12 w-12 text-gray-400" />,
                    title: "Pending",
                    description: "Scan QR codes to verify.",
                    badge: <Badge variant="secondary">Pending</Badge>,
                    cardClass: ""
                };
        }
    };

    const statusContent = getStatusContent();

    return (
        <div className="space-y-4 md:space-y-6 max-md:pb-24 max-sm:pb-30 pb-12">
            <PageHeader
                title="Mould–Machine Validation"
                description="Verify correct mould–machine mapping before production starts."
            />
            <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
                {/* Scan Mould */}
                <Card className="border-gray-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" /> 1. Scan Mould
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {/* REPLACED Image with <img> */}
                        <img
                            src={MOCK_IMAGE_URL} // Using a simple placeholder image URL
                            alt="Mould QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg object-contain"
                        />
                        <Button className="w-full" onClick={handleScan}>Scan Mould QR</Button>
                        <CardDescription>Mould ID: MLD-45B-01</CardDescription>
                    </CardContent>
                </Card>

                {/* Scan Machine */}
                <Card className="border-gray-100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" /> 2. Scan Machine
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {/* REPLACED Image with <img> */}
                        <img
                            src={MOCK_IMAGE_URL} // Using a simple placeholder image URL
                            alt="Machine QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg object-contain"
                        />
                        <Button className="w-full" onClick={handleScan}>Scan Machine QR</Button>
                        <CardDescription>Machine ID: MC-002</CardDescription>
                    </CardContent>
                </Card>

                {/* Validation Result */}
                <Card className={cn("flex flex-col text-center border-gray-100", statusContent.cardClass)}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 mx-auto">
                            3. Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center flex-1 p-6">
                        <div className="mb-4">
                            {statusContent.icon}
                        </div>
                        <h3 className="text-xl font-semibold font-headline mb-1">{statusContent.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{statusContent.description}</p>
                        {statusContent.badge}
                    </CardContent>
                </Card>

            </div>
            <div className="flex justify-center pt-4">
                <Button size="lg" disabled={validationStatus !== 'success'}>
                    Start Production <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default ValidationPage;