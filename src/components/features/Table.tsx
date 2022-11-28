import {
  faCheck,
  faPenToSquare,
  faCheckDouble,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import InputCheckbox from '../common/InputCheckbox';
import Search from '../common/Search';

export interface TableProps {
  title: string;
  heads: string[];
  children: ReactElement<TableRowProps>[] | ReactElement<TableRowProps>;
  editableRaw: ReactElement;
  onDelete?: OnDeleteFn;
}

export type OnDeleteFn = (selectedItems: number[]) => void;

export interface TableRowProps {
  id: number;
  children: ReactElement<PropsWithChildren>[] | ReactElement<PropsWithChildren>;
}

export type EntityId = number | 'raw';

export interface TableEditProps extends PropsWithChildren {
  canSave: boolean;
  onSave: () => void;
}

export interface TableContext {
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  editingItemId: null | EntityId;
  setEditingItemId: Dispatch<SetStateAction<null | EntityId>>;
  editableRaw: ReactElement;
}

export const tableContext = createContext<TableContext>(undefined as any);

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
        editableRaw: props.editableRaw,
      }}
    >
      <div className="self-stretch transition-colors grow">
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
            <div className="flex items-center gap-4 ml-auto">
              <button
                className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-accent-500 disabled:opacity-50 dark:bg-accent-700"
                disabled={editingItemId !== null}
                onClick={addRow}
              >
                Добавить
              </button>
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full disabled:opacity-50 dark:bg-red-700"
                disabled={!selectedItems.length}
                onClick={deleteRows}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="transition-colors border-t border-b common-border">
              <th aria-label="Выбрать" className="p-3 text-xs w-11"></th>
              {props.heads.map((head, i) => (
                <th
                  key={i}
                  className="p-3 text-xs font-semibold tracking-wider text-left text-readable-500 dark:text-readable-200"
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
  const {
    editableRaw,
    editingItemId,
    setEditingItemId,
    selectedItems,
    setSelectedItems,
  } = useContext(tableContext);

  if (editingItemId === id) {
    return editableRaw;
  }

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
        <InputCheckbox
          checked={selectedItems.includes(id)}
          onChange={handleSelectItem}
        />
      </TableData>
      <>{children}</>
      <TableData>
        <button onClick={() => setEditingItemId(id)}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="lg"
            className="hover:text-accent-500"
          />
        </button>
      </TableData>
    </tr>
  );
}

export function TableData({ children }: PropsWithChildren) {
  return (
    <td className="px-3 py-2 text-xs text-readable-900 dark:text-readable-200">
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
        <button onClick={cancel} className="group">
          <FontAwesomeIcon
            icon={faEraser}
            size="lg"
            className="text-red-600 transition group-hover:text-red-900"
          />
        </button>
      </TableData>
      {children}
      <TableData>
        <button onClick={save} disabled={!canSave} className="group">
          <FontAwesomeIcon
            icon={canSave ? faCheckDouble : faCheck}
            size="lg"
            className="text-green-500 transition group-disabled:opacity-50 group-hover:group-enabled:text-green-700"
          />
        </button>
      </TableData>
    </tr>
  );
}
