"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Enquiry {
  id: string;
  name: string;
  company: string;
  workEmail: string;
  phone: string | null;
  country: string;
  buyerType: string;
  productCategories: string[];
  enquiryType: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
}

const STATUS_VARIANT: Record<Enquiry["status"], "default" | "secondary" | "outline"> = {
  NEW: "default",
  READ: "secondary",
  ARCHIVED: "outline",
};

const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  CATALOGUE_PRICING: "Catalogue & pricing",
  PRIVATE_LABEL: "Private-label enquiry",
  CUSTOMIZATION: "Customisation",
  EXPORT_DISTRIBUTION: "Export / distribution",
  GENERAL: "General enquiry",
};

export function EnquiriesClient({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  async function updateStatus(id: string, status: Enquiry["status"]) {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast.error("Failed to update status.");
      return;
    }
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  function openEnquiry(enquiry: Enquiry) {
    setSelected(enquiry);
    if (enquiry.status === "NEW") updateStatus(enquiry.id, "READ");
  }

  const columns: DataTableColumn<Enquiry>[] = [
    { key: "buyerType", header: "Buyer type", render: (e) => e.buyerType, hideOnMobile: true },
    { key: "country", header: "Country", render: (e) => e.country, hideOnMobile: true },
    { key: "status", header: "Status", render: (e) => <Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge> },
  ];

  return (
    <div>
      {enquiries.length === 0 ? (
        <EmptyState icon={Inbox} title="No enquiries yet" description="Submissions from the contact form will show up here." />
      ) : (
        <DataTable
          columns={columns}
          rows={enquiries}
          rowKey={(e) => e.id}
          leadingHeader="From"
          leading={(e) => (
            <button onClick={() => openEnquiry(e)} className="text-left">
              <p className="font-medium text-foreground truncate">{e.name}</p>
              <p className="text-xs text-muted-foreground truncate">{e.company}</p>
            </button>
          )}
        />
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <Info label="Company" value={selected.company} />
                  <Info label="Work email" value={selected.workEmail} />
                  <Info label="Phone" value={selected.phone ?? "—"} />
                  <Info label="Country" value={selected.country} />
                  <Info label="Buyer type" value={selected.buyerType} />
                  <Info label="Enquiry type" value={ENQUIRY_TYPE_LABELS[selected.enquiryType] ?? selected.enquiryType} />
                </div>
                <Info label="Product categories" value={selected.productCategories.join(", ")} />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  {(["NEW", "READ", "ARCHIVED"] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selected.status === status ? "default" : "outline"}
                      onClick={() => updateStatus(selected.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );
}
