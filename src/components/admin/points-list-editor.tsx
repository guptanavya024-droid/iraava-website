"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface EditablePoint {
  title: string;
  body: string;
}

interface PointsListEditorProps {
  items: EditablePoint[];
  onChange: (items: EditablePoint[]) => void;
  itemLabel: string;
}

// Shared by the Home ("Why buyers work with us") and About ("Our Approach")
// content forms — both are just an ordered list of title+body cards, saved
// as part of the parent page's single submit rather than independently.
export function PointsListEditor({ items, onChange, itemLabel }: PointsListEditorProps) {
  function update(index: number, patch: Partial<EditablePoint>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...items, { title: "", body: "" }]);
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-border p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              {itemLabel} {i + 1}
            </Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Input
            placeholder="Title"
            value={item.title}
            onChange={(e) => update(i, { title: e.target.value })}
          />
          <Textarea
            placeholder="Body"
            rows={3}
            value={item.body}
            onChange={(e) => update(i, { body: e.target.value })}
          />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus className="h-3.5 w-3.5" />
        Add {itemLabel.toLowerCase()}
      </Button>
    </div>
  );
}
