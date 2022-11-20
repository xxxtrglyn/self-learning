import React from "react";
import { Dialog, Text, Center, Stack, Group, Button } from "@mantine/core";

const ConfirmDialog: React.FC<{
  isOpened: boolean;
  title: string;
  message: string;
}> = ({ isOpened, title, message }) => {
  return (
    <Dialog opened={isOpened}>
      <Stack>
        <Center>
          <Text>{title}</Text>
        </Center>
        <Text>{message}</Text>
        <Group>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </Group>
      </Stack>
    </Dialog>
  );
};

export default ConfirmDialog;
