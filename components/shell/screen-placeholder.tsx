import { Card } from "@/components/ui/card";

/** Temporary body for screens that haven't been built yet. */
export function ScreenPlaceholder({ name }: { name: string }) {
  return (
    <Card className="flex min-h-64 items-center justify-center border-dashed text-sm text-muted">
      {name} is built in a later step.
    </Card>
  );
}
