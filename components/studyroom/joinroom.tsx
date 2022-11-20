import React from "react";
import {
  Modal,
  Stack,
  Center,
  Title,
  Text,
  Card,
  Button,
  TextInput,
} from "@mantine/core";

const JoinRoom: React.FC<{ opened: boolean; onClose: () => void }> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal
      padding={20}
      opened={opened}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={false}
      onClose={onClose}
    >
      <Stack>
        <Stack>
          <Center>
            <Title order={2} weight={300}>
              Join new room
            </Title>
          </Center>
          <TextInput label="Room ID" placeholder="Aa" />
          <Button>Find Room</Button>
          <Card>
            <Text>ID: Example ID</Text>
            <Text>Name: Example Room</Text>
            <Text>Member: 69</Text>
          </Card>
          <Button>Join Room</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default JoinRoom;
