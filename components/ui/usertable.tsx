import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { User } from "../../types/user";
import ProfileDetail from "./profiledetail";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

const UserTable: React.FC<{ data: User[] }> = ({ data }) => {
  const { classes, cx } = useStyles();
  const [isShowDetailForm, setIsShowDetailForm] = useState<string>("");
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text
              size="sm"
              weight={500}
              onClick={() => {
                setIsShowDetailForm(item.id);
              }}
            >
              {item.fullname}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.job}</td>
        <td>{item.city}</td>
        <td>{item.phone}</td>
      </tr>
    );
  });

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 1000 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                  transitionDuration={0}
                />
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Job</th>
              <th>City</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {isShowDetailForm.length > 0 && (
        <ProfileDetail
          opened={isShowDetailForm.length > 0}
          value={
            isShowDetailForm.length > 0
              ? data.find((user) => user.id === isShowDetailForm)!
              : null
          }
          onClose={() => {
            setIsShowDetailForm("");
          }}
        />
      )}
    </>
  );
};

export default UserTable;
