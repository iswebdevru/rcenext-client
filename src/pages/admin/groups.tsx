import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { z } from 'zod';
import InputText from '../../components/common/InputText';
import Select, { Option } from '../../components/common/Select';
import Table, {
  tableContext,
  TableData,
  TableEditRaw,
  TableRow,
} from '../../components/features/Table';
import AdminNav from '../../components/layout/AdminNav';
import Layout from '../../components/layout/Layout';
import { groupFromString } from '../../lib/parsers';
import { groupToString } from '../../lib/text-formatters';
import { createGroup, getGroup, getGroups, updateGroup } from '../../rce/api';
import { Group } from '../../rce/contracts';
import { BLOCKS } from '../../rce/data';
import { GroupSchema } from '../../rce/schemas';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ssrGroups: await getGroups(),
    },
  };
};

interface GroupProps {
  ssrGroups: Group[];
}

export default function Groups({ ssrGroups }: GroupProps) {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
    initialData: ssrGroups,
  });

  return (
    <Layout>
      <Head>
        <title>Админ - группы</title>
      </Head>
      <AdminNav />
      <Table
        title="Группы"
        heads={['Группа', 'Корпус']}
        editableRaw={<EditGroup />}
      >
        {groups.map(group => {
          return (
            <TableRow key={group.id} id={group.id}>
              <TableData>{groupToString(group)}</TableData>
              <TableData>{group.block}</TableData>
            </TableRow>
          );
        })}
      </Table>
    </Layout>
  );
}

function EditGroup() {
  const { editingItemId: id } = useContext(tableContext);
  const [fullGroupName, setFullGroupName] = useState('');
  const [block, setBlock] = useState(1);

  const groupObj = groupFromString(fullGroupName);

  const canSave =
    !!groupObj && GroupSchema.safeParse({ block, ...groupObj }).success;

  const mutationFn = async (data: z.infer<typeof GroupSchema>) => {
    return id === 'raw' ? createGroup(data) : updateGroup(id as number, data);
  };

  const queryClient = useQueryClient();

  const { mutate: saveGroup } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });

  useQuery({
    queryKey: ['groups', id],
    enabled: typeof id === 'number',
    queryFn: () => getGroup(id as number),
    onSuccess: data => {
      setFullGroupName(groupToString(data));
      setBlock(data.block);
    },
  });

  const onSave = async () => {
    if (canSave) {
      saveGroup({ ...groupObj, block });
    }
  };
  return (
    <TableEditRaw canSave={canSave} onSave={onSave}>
      <TableData>
        <InputText
          onChange={e => setFullGroupName(e.target.value)}
          value={fullGroupName}
        />
      </TableData>
      <TableData>
        <Select active={block} setActive={setBlock}>
          {BLOCKS.map(block => (
            <Option id={block} value={block.toString()} key={block} />
          ))}
        </Select>
      </TableData>
    </TableEditRaw>
  );
}
