import {
  Children,
  cloneElement,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

export type EditableRaw = (props: { id: number | null }) => JSX.Element;

export interface TableProps {
  title: string;
  heads: string[];
  children: ReactElement<TableRowProps>[];
  EditableRaw: EditableRaw;
}

export interface TableRowProps {
  id: number;
  children: ReactElement<TableDataProps>[];
  _selectedItems?: number[];
  _setSelectedItems?: Dispatch<SetStateAction<number[]>>;
}

export interface TableDataProps extends PropsWithChildren {}

export default function Table(props: TableProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editingItemId, setEditingItemId] = useState<
    number | null | undefined
  >();

  const addRow = () => {
    setEditingItemId(null);
  };

  return (
    <div className="transition-colors grow self-stretch border rounded-md common-border component-bg">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
        <div className="flex items-center">
          <input
            type="search"
            className="outline outline-1 px-4 py-1 rounded-md"
          />
          <div className="ml-auto flex items-center gap-4">
            <button
              className="bg-violet-500 px-4 py-2 font-semibold rounded-full text-sm text-white"
              onClick={addRow}
            >
              Добавить
            </button>
            <button className="bg-red-500 px-4 py-2 font-semibold rounded-full text-sm text-white">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <table className="w-full">
        <tbody>
          <tr className="transition-colors border-b common-border">
            <th aria-label="Выбрать" className="p-3 text-sm w-11"></th>
            {props.heads.map((head, i) => (
              <th key={i} className="px-6 py-3 text-sm text-left">
                {head as string}
              </th>
            ))}
            <th aria-label="Изменить" className="p-3 text-sm w-11"></th>
          </tr>
          {editingItemId === null ? <props.EditableRaw id={null} /> : undefined}
          <>
            {Children.map(props.children, row =>
              cloneElement(row, {
                _selectedItems: selectedItems,
                _setSelectedItems: setSelectedItems,
              })
            )}
          </>
        </tbody>
      </table>
    </div>
  );
}

export function TableRow({
  id,
  children,
  _selectedItems,
  _setSelectedItems,
}: TableRowProps) {
  const handleSelectItem = () => {
    if (_selectedItems!.includes(id)) {
      return _setSelectedItems!(prev =>
        prev.filter(currentId => currentId !== id)
      );
    }
    return _setSelectedItems!(prev => [...prev, id]);
  };
  return (
    <tr className="transition-colors border-b common-border">
      <TableDataSmall>
        <input
          type="checkbox"
          checked={_selectedItems!.includes(id)}
          onChange={handleSelectItem}
        />
      </TableDataSmall>
      <>{children}</>
      <TableDataSmall>
        <button>edit</button>
      </TableDataSmall>
    </tr>
  );
}

export function TableData({ children }: TableDataProps) {
  return <td className="px-6 py-3 text-sm">{children}</td>;
}

export function TableDataSmall({ children }: TableDataProps) {
  return <td className="p-3 text-sm">{children}</td>;
}
