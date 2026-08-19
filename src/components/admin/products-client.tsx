"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/image-upload";
import { TypeCombobox } from "@/components/admin/type-combobox";

interface ProductTypeOption {
  category: "FACE_CARE" | "BODY_CARE";
  name: string;
}

interface Product {
  id: string;
  category: "FACE_CARE" | "BODY_CARE";
  type: string;
  name: string;
  variant: string | null;
  description: string;
  ingredients: string | null;
  otherDetails: string | null;
  referenceLink: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

const CATEGORY_LABELS: Record<Product["category"], string> = {
  FACE_CARE: "Face Care",
  BODY_CARE: "Body Care",
};

const EMPTY_FORM: Omit<Product, "id"> = {
  category: "FACE_CARE",
  type: "",
  name: "",
  variant: null,
  description: "",
  ingredients: null,
  otherDetails: null,
  referenceLink: null,
  imageUrl: null,
  isActive: true,
};

export function ProductsClient({
  initialProducts,
  productTypes,
}: {
  initialProducts: Product[];
  productTypes: ProductTypeOption[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [types, setTypes] = useState(productTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      category: product.category,
      type: product.type,
      name: product.name,
      variant: product.variant,
      description: product.description,
      ingredients: product.ingredients,
      otherDetails: product.otherDetails,
      referenceLink: product.referenceLink,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
    });
    setDialogOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This can't be undone.")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete product.");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted.");
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        variant: form.variant || null,
        ingredients: form.ingredients || null,
        otherDetails: form.otherDetails || null,
        referenceLink: form.referenceLink || null,
      };

      const res = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const saved: Product = await res.json();

      setProducts((prev) => (editingId ? prev.map((p) => (p.id === editingId ? saved : p)) : [...prev, saved]));
      setTypes((prev) =>
        prev.some((t) => t.category === saved.category && t.name === saved.type)
          ? prev
          : [...prev, { category: saved.category, name: saved.type }]
      );
      toast.success(editingId ? "Product updated." : "Product added.");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  const columns: DataTableColumn<Product>[] = [
    { key: "category", header: "Category", render: (p) => <Badge variant="secondary">{CATEGORY_LABELS[p.category]}</Badge> },
    { key: "type", header: "Type", render: (p) => <span className="text-muted-foreground">{p.type}</span>, hideOnMobile: true },
    { key: "active", header: "Active", render: (p) => (p.isActive ? "Yes" : "No"), hideOnMobile: true },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4" />
          Add product
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyState icon={Sparkles} title="No products yet" description="Add your first product to populate the catalogue." />
      ) : (
        <DataTable
          columns={columns}
          rows={products}
          rowKey={(p) => p.id}
          leadingHeader="Product"
          leading={(p) => (
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-secondary">
                {p.imageUrl && <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />}
              </div>
              <span className="truncate font-medium text-foreground">{p.name}</span>
            </div>
          )}
          trailing={(p) => (
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit product" : "Add product"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <ImageUpload value={form.imageUrl} onChange={(imageUrl) => setForm((f) => ({ ...f, imageUrl }))} label="photo" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => {
                    const category = value as Product["category"];
                    setForm((f) => (f.category === category ? f : { ...f, category, type: "" }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FACE_CARE">Face Care</SelectItem>
                    <SelectItem value="BODY_CARE">Body Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Type</Label>
                <TypeCombobox
                  category={form.category}
                  types={types}
                  value={form.type}
                  onChange={(type) => setForm((f) => ({ ...f, type }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Variant (optional)</Label>
                <Input value={form.variant ?? ""} onChange={(e) => setForm((f) => ({ ...f, variant: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>

            <div className="space-y-1.5">
              <Label>Ingredients (optional)</Label>
              <Textarea rows={2} value={form.ingredients ?? ""} onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))} />
            </div>

            <div className="space-y-1.5">
              <Label>Other details (optional)</Label>
              <Textarea rows={2} value={form.otherDetails ?? ""} onChange={(e) => setForm((f) => ({ ...f, otherDetails: e.target.value }))} />
            </div>

            <div className="space-y-1.5">
              <Label>Reference link (optional)</Label>
              <Input value={form.referenceLink ?? ""} onChange={(e) => setForm((f) => ({ ...f, referenceLink: e.target.value }))} />
            </div>

            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
              <Label className="cursor-pointer">Active (visible on the public site)</Label>
              <Switch checked={form.isActive} onCheckedChange={(isActive) => setForm((f) => ({ ...f, isActive }))} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
