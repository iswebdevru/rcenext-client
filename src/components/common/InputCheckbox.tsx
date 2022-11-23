import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';

export default function InputCheckbox(
  props: ComponentPropsWithoutRef<'input'>
) {
  const [checked, setChecked] = useState(props.checked || false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(p => !p);
    props.onChange && props.onChange(e);
  };

  return (
    <label className="cursor-pointer">
      <input
        {...props}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={checked ? faCheckSquare : faSquare}
        size="lg"
        className="transition"
      />
    </label>
  );
}
