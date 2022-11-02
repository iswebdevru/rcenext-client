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

async function fetchGroups() {
  return fetch('http://localhost:3000/groups').then(res =>
    res.json()
  ) as Promise<Group[]>;
}

export default async function Index() {
  const groups = await fetchGroups();

  return (
    <ul>
      {groups.map(group => {
        return <li key={group.id}>{groupToString(group)}</li>;
      })}
    </ul>
  );
}
