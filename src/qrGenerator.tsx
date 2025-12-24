// import { h } from 'preact';
import { useState } from 'preact/hooks';

interface QRCodePDFGeneratorProps {}

const QRCodePDFGenerator: preact.FunctionComponent<QRCodePDFGeneratorProps> = () => {
  const [generating, setGenerating] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const codes: string[] = [
    "MS-03390-YRA-01-003-L-F",
    "MS-03290-YRA-01-006-R-F",
    "MS-02150-YRA-01-007-R-F",
    "MS-00810-YP8-01-008-R-F",
    "MS-01340-YL1-01-009-R-F",
    "MS-02700-YBA-01-012-R-F",
    "MS-09781-YC5-01-014-R-F",
    "MS-02161-YRA-02-015-R-F",
    "MS-07990-YHB-01-016-R-S",
    "MS-07980-YHB-01-017-R-S",
    "MS-06732-YHB-01-019-R-F",
    "MS-00320-YL7-01-022-R-F",
    "MS-00781-YL1-01-023-R-F",
    "MS-001130-YL7-01-024-R-F",
    "MS-06530-YP8-01-025-R-F",
    "MS-05600-YBA-01-027-R-F",
    "MS-08290-YAD-01-028-R-S",
    "MS-08560-YE 3-01-029-R-F",
    "MS-07530-YP8-01-031-R-F",
    "MS-04510-YRA-01-032-R-F",
    "MS-09180-YWD-01-37-R-S",
    "MS-05500-YWD-01-38-R-F",
    "MS-06780-YG8-01-40-L-F",
    "MS-06760-YG8-01-39-R-F",
    "MS-01810-YG8-01-41-L-F",
    "MS-01070-YOM-01-042-R-S",
    "MS-01080-YOM-01-043-R-S",
    "MS-06240-YOM-01-044-R-S",
    "MS-07450-YFGTHS-01-045-R-F",
    "MS-07710-YFGNM-01-046-R-F",
    "TA-0260-AceEdge-01-48-R-S",
    "TA-05960-AceEdge-01-49-R-S",
    "TA-0860-AceEdge-01-50-R-S",
    "TA-03340-C110-01-52-R-S",
    "TA-06460-C110-01-53-R-S",
    "MS-01230-YG8-01-55-R-S",
    "MS-02900-YSDM-01-56-R-F",
    "MS-07360-YG8-01-57-R-S",
    "MS-09070-YWD-01-58-L-S",
    "MS-01390-YE3-01-59-L-F",
    "MS-03720-YWD-01-60-L-F",
    "MS-03784-YWD-01-61-R-S",
    "MS-02161-YRA-03-63-R-F",
    "MS-06732-YED-01-65-R-F",
    "MS-07990-YHB-01-067-R-S",
    "MS-03022-YED-01-64-R-F",
    "MS-08530-YXA-01-034-R-F",
    "MS-05420-YJC-01-004-R-F",
    "MS-06600-YOM-01-036-R-S",
    "MS-01770-YG8-01-47-R-F",
    "MS-01510-YL8-01-68-R-S",
    "MS-01520-YL8-01-69-R-S",
    "MS-01981-YL1-01-70-R-F",
    "MS-03710-YOM-01-035-R-F",
    "MS-09410-Y17-01-71-R-F",
    "MS-07720-Y17-01-72-R-F",
    "MS-00960-YHB-01-018-R-F",
    "MS-09910-YCA-01-021-R-F"
  ];

  const generateQRCode = (text: string): string => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}`;
  };

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async (): Promise<void> => {
    setGenerating(true);
    setStatus('Generating QR codes...');

    try {
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const qrSize = 120;
      const qrX = (pageWidth - qrSize) / 2;
      const qrY = (pageHeight - qrSize) / 2 - 20;

      for (let i = 0; i < codes.length; i++) {
        setStatus(`Processing ${i + 1} of ${codes.length}...`);
        
        if (i > 0) {
          pdf.addPage();
        }

        const qrUrl = generateQRCode(codes[i]);
        
        try {
          const img = await loadImage(qrUrl);
          pdf.addImage(img, 'PNG', qrX, qrY, qrSize, qrSize);
        } catch (error) {
          console.error(`Failed to load QR code for ${codes[i]}:`, error);
        }

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        const textWidth = pdf.getTextWidth(codes[i]);
        const textX = (pageWidth - textWidth) / 2;
        pdf.text(codes[i], textX, qrY + qrSize + 15);
      }

      setStatus('Saving PDF...');
      pdf.save('product-qr-codes.pdf');
      setStatus('PDF generated successfully!');
      
      setTimeout(() => {
        setStatus('');
        setGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setStatus('Error generating PDF. Please try again.');
      setGenerating(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">QR Code PDF Generator</h1>
          <p class="text-gray-600 mb-6">Generate a PDF with {codes.length} QR codes, one per page</p>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 class="font-semibold text-blue-900 mb-2">PDF Details:</h2>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Total codes: {codes.length}</li>
              <li>• Format: A4 portrait</li>
              <li>• Layout: One QR code per page</li>
              <li>• Code label displayed below each QR code</li>
            </ul>
          </div>

          <button
            onClick={generatePDF}
            disabled={generating}
            class={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
              generating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {generating ? 'Generating...' : 'Generate PDF'}
          </button>

          {status && (
            <div class={`mt-4 p-4 rounded-lg ${
              status.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {status}
            </div>
          )}

          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-700 mb-2">Preview of codes:</h3>
            <div class="max-h-48 overflow-y-auto text-xs text-gray-600 font-mono space-y-1">
              {codes.slice(0, 10).map((code, i) => (
                <div key={i}>{code}</div>
              ))}
              {codes.length > 10 && (
                <div class="text-gray-500 italic">... and {codes.length - 10} more</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePDFGenerator;