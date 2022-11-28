import { Group, Teacher } from '../rce/contracts';

export function shortTeacherName({ firstName, lastName, patronymic }: Teacher) {
  return `${firstName[0]}. ${patronymic[0]}. ${lastName}`;
}

export function groupToString(group: Group) {
  return `${group.name}-${group.course}${
    group.index > 9 ? group.index : `0${group.index}`
  }`;
}
