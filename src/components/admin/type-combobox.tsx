"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TypeOption {
  category: "FACE_CARE" | "BODY_CARE";
  name: string;
}

interface TypeComboboxProps {
  category: "FACE_CARE" | "BODY_CARE";
  types: TypeOption[];
  value: string;
  onChange: (name: string) => void;
}

// Not an open text field: lets the admin pick an existing product type for
// the selected category, or type a new one and add it (the actual
// ProductType row is created server-side on product save via
// ensureProductType, so this stays a plain string setter).
export function TypeCombobox({ category, types, value, onChange }: TypeComboboxProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categoryTypes = useMemo(() => types.filter((t) => t.category === category), [types, category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categoryTypes;
    return categoryTypes.filter((t) => t.name.toLowerCase().includes(q));
  }, [categoryTypes, query]);

  const exactMatch = categoryTypes.some((t) => t.name.toLowerCase() === query.trim().toLowerCase());

  function select(name: string) {
    onChange(name);
    setQuery(name);
    setOpen(false);
  }

  function handleBlur() {
    // Delay so a click on a dropdown option registers before the list unmounts.
    blurTimeout.current = setTimeout(() => {
      setOpen(false);
      if (query.trim()) onChange(query.trim());
    }, 150);
  }

  function handleFocus() {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setOpen(true);
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Select or add a type"
        autoComplete="off"
      />

      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-md border border-border bg-popover shadow-md">
          {filtered.length === 0 && !query.trim() && (
            <p className="px-3 py-2 text-sm text-muted-foreground">No types yet for this category.</p>
          )}
          {filtered.map((t) => (
            <button
              key={t.name}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(t.name)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted",
                t.name === value && "text-primary font-medium"
              )}
            >
              {t.name === value && <Check className="h-3.5 w-3.5 shrink-0" />}
              <span className={t.name === value ? "" : "pl-[1.375rem]"}>{t.name}</span>
            </button>
          ))}
          {query.trim() && !exactMatch && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(query.trim())}
              className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-left text-sm text-primary hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5 shrink-0" />
              Add &ldquo;{query.trim()}&rdquo; as a new type
            </button>
          )}
        </div>
      )}
    </div>
  );
}
