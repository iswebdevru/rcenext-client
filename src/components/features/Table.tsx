import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Search from '../common/Search';

export interface TableProps {
  title: string;
  heads: string[];
  children: ReactElement<TableRowProps>[];
  editableRaw: ReactElement;
  onDelete?: OnDeleteFn;
}

export type OnDeleteFn = (selectedItems: number[]) => void;

export interface TableRowProps {
  id: number;
  children: ReactElement<PropsWithChildren>[];
}

export type EntityId = number | 'raw';

export interface TableEditProps extends PropsWithChildren {
  canSave: boolean;
  onSave: () => void;
}

interface TableContext {
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  editingItemId: null | EntityId;
  setEditingItemId: Dispatch<SetStateAction<null | EntityId>>;
}

const tableContext = createContext<TableContext>({
  selectedItems: [],
  setSelectedItems: () => 0,
  editingItemId: null,
  setEditingItemId: () => 0,
});

export default function Table(props: TableProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editingItemId, setEditingItemId] = useState<EntityId | null>(null);

  const addRow = () => {
    setEditingItemId('raw');
  };

  const deleteRows = () => {
    props.onDelete && props.onDelete(selectedItems);
    setSelectedItems([]);
  };

  return (
    <tableContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        editingItemId,
        setEditingItemId,
      }}
    >
      <div className="transition-colors grow self-stretch border rounded-md common-border component-bg">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold mb-9 text-readable-700 dark:text-readable-200">
            {props.title}
          </h1>
          <div className="flex items-center">
            <div>
              <Search
                text={''}
                setText={function (text: string): void {
                  throw new Error('Function not implemented.');
                }}
                placeholder="Поиск"
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button
                className="bg-accent-500 px-4 py-2 font-semibold rounded-full text-sm text-white disabled:opacity-50 dark:bg-accent-700"
                disabled={editingItemId !== null}
                onClick={addRow}
              >
                Добавить
              </button>
              <button
                className="bg-red-500 px-4 py-2 font-semibold rounded-full text-sm text-white disabled:opacity-50 dark:bg-red-700"
                disabled={!selectedItems.length}
                onClick={deleteRows}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
        <table className="w-full table-fixed">
          <tbody>
            <tr className="bg-zinc-50 transition-colors border-b border-t common-border dark:bg-zinc-700">
              <th aria-label="Выбрать" className="p-3 text-sm w-11"></th>
              {props.heads.map((head, i) => (
                <th
                  key={i}
                  className="p-3 text-sm text-readable-500 text-left dark:text-readable-300"
                >
                  {head as string}
                </th>
              ))}
              <th aria-label="Изменить" className="p-3 text-sm w-11"></th>
            </tr>
            {editingItemId === 'raw' ? props.editableRaw : undefined}
            {props.children}
          </tbody>
        </table>
      </div>
    </tableContext.Provider>
  );
}

export function TableRow({ id, children }: TableRowProps) {
  const { selectedItems, setSelectedItems } = useContext(tableContext);
  const handleSelectItem = () => {
    if (selectedItems.includes(id)) {
      return setSelectedItems(prev =>
        prev.filter(currentId => currentId !== id)
      );
    }
    return setSelectedItems(prev => [...prev, id]);
  };
  return (
    <tr className="transition-colors border-b common-border h-11">
      <TableData>
        <input
          type="checkbox"
          checked={selectedItems.includes(id)}
          onChange={handleSelectItem}
        />
      </TableData>
      <>{children}</>
      <TableData>
        <button>edit</button>
      </TableData>
    </tr>
  );
}

export function TableData({ children }: PropsWithChildren) {
  return (
    <td className="px-3 py-2 text-sm text-readable-900 dark:text-readable-200">
      {children}
    </td>
  );
}

export function TableEditRaw({ children, onSave, canSave }: TableEditProps) {
  const { setEditingItemId } = useContext(tableContext);
  const cancel = () => setEditingItemId(null);
  const save = () => {
    setEditingItemId(null);
    onSave();
  };
  return (
    <tr className="transition-colors border-b common-border h-11">
      <TableData>
        <button className="w-5 h-5 bg-black" onClick={cancel}></button>
      </TableData>
      {children}
      <TableData>
        <button
          className="w-5 h-5 bg-black"
          onClick={save}
          disabled={!canSave}
        ></button>
      </TableData>
    </tr>
  );
}
