interface Group {
  id: number;
  name: string;
  index: number;
  course: number;
  block: number;
}

function groupToString({ name, index, course }: Group) {
  return `${name}-${course}${index < 10 ? `0${index}` : index}`;
}

export default function Index() {
  return <div>home</div>;
}
