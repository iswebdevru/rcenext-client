export function groupFromString(group: string) {
  const regexp = group.match(/^([а-я]+)-(\d)(\d+)$/i);
  if (!regexp) {
    return regexp;
  }
  let [, name, course, index] = regexp;
  return { name, course: +course, index: +index };
}
