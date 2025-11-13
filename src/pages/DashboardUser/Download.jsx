export function downloadTemplate() {
  const csv = "nomer\n081234567890\n089876543210\n";
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "template_customers.csv";
  a.click();
  URL.revokeObjectURL(url);
}
