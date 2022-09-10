export default function splitWord(w: string): string[] {
  let result: Array<string> = [];
  for (var i = 0; i < w.length; i++) {
    result.push(w.charAt(i));
  }
  return result;
}
