import { Teacher } from '../rce/contracts';

export function shortTeacherName({ firstName, lastName, patronymic }: Teacher) {
  return `${firstName[0]}. ${patronymic[0]}. ${lastName}`;
}
