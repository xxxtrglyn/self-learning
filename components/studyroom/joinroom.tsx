import React, { useState } from "react";
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
import { BaseURL } from "../../lib/axiosinstance";
import { Room } from "../../types/Room";
import { useAppDispatch } from "../../store";
import { joinRoom } from "../../store/room-actions";

const JoinRoom: React.FC<{ opened: boolean; onClose: () => void }> = ({
  opened,
  onClose,
}) => {
  const [id, setId] = useState<string>("");
  const [findRoom, setFindRoom] = useState<Room>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const findRoomById = async () => {
    try {
      const response = await BaseURL.get(`/api/rooms?id=${id}`);
      setIsLoading(false);
      setFindRoom(response.data);
    } catch {
      setIsLoading(false);
      console.log("?");
    }
  };
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
          <TextInput
            label="Room ID"
            placeholder="Aa"
            value={id}
            onChange={(event) => {
              setId(event.currentTarget.value);
            }}
          />
          <Button
            loading={isLoading}
            onClick={() => {
              if (id) {
                setIsLoading(true);
                findRoomById();
              }
            }}
          >
            Find Room
          </Button>
          <Card shadow="xl">
            <Text>ID: {findRoom?.id ? findRoom.id : "Example ID"}</Text>
            <Text>
              Name: {findRoom?.roomName ? findRoom.roomName : "Example Name"}
            </Text>
            <Text>
              Member: {findRoom?.totalUser ? findRoom.totalUser : "87"}
            </Text>
          </Card>
          <Button
            disabled={findRoom ? false : true}
            onClick={() => {
              dispatch(joinRoom(findRoom!));
            }}
          >
            Join Room
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default JoinRoom;
