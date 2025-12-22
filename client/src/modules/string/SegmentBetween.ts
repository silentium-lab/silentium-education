export function SegmentBetween(url: string, from: string, to: string): string {
  const fromIndex = url.indexOf(from);
  if (fromIndex === -1) {
    throw new Error(`Segment 'from' '${from}' not found in URL`);
  }

  const startIndex = fromIndex + from.length;
  const toIndex = url.indexOf(to, startIndex);
  if (toIndex === -1) {
    throw new Error(`Segment 'to' '${to}' not found after 'from' in URL`);
  }

  return url.substring(startIndex, toIndex);
}
