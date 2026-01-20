export function formatDateToDDMMYYYY(dateStr: string): string {
  if (!dateStr) return '';

  const parts = dateStr.split('-'); // yyyy-mm-dd
  if (parts.length !== 3) return dateStr;

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}-${month}-${year}`;
}
