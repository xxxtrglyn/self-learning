import {
  TextInput,
  createStyles,
  Stack,
  Group,
  SimpleGrid,
  Button,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import RoomList from "../../components/studyroom/roomlist";
import MainLayout from "../../components/ui/mainlayout";
import { IconSearch } from "@tabler/icons";
import JoinRoom from "../../components/studyroom/joinroom";
import CreateRoom from "../../components/studyroom/createroom";
import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Room } from "../../types/Room";
import { useAppDispatch } from "../../store";
import { roomActions } from "../../store/room-slice";

const useStyles = createStyles((theme) => ({
  search: {
    transition: "width 0.2s linear",
  },
}));

const StudyRoom: NextPage<{ roomList: Room[] }> = ({ roomList }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isShowJoinForm, setIsShowJoinForm] = useState<boolean>(false);
  const [isShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);
  const { classes } = useStyles();
  console.log(roomList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(roomActions.replaceRoomList(roomList));
  }, [dispatch, roomList]);

  return (
    <>
      <MainLayout order={2}>
        <SimpleGrid
          cols={1}
          style={{ width: "100%", height: "100%", padding: 10 }}
        >
          <Stack>
            <Group position="center">
              <TextInput
                className={classes.search}
                style={searchInput ? { width: "60%" } : { width: "20%" }}
                icon={<IconSearch />}
                radius="md"
                placeholder="Aa"
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.currentTarget.value);
                }}
              />
              <Button
                onClick={() => {
                  setIsShowJoinForm(true);
                }}
                variant="outline"
              >
                Join Room
              </Button>
              <Button
                onClick={() => {
                  setIsShowCreateForm(true);
                }}
                variant="outline"
              >
                Create Room
              </Button>
            </Group>
            <RoomList />
          </Stack>
        </SimpleGrid>
      </MainLayout>
      <JoinRoom
        opened={isShowJoinForm}
        onClose={() => {
          setIsShowJoinForm(false);
        }}
      />
      <CreateRoom
        opened={isShowCreateForm}
        onClose={() => {
          setIsShowCreateForm(false);
        }}
      />
    </>
  );
};

export default StudyRoom;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const rooms = await prisma.room.findMany({
    include: {
      joinsRoom: { where: { userId: token.sub } },
    },
  });

  const transformRooms: Room[] = rooms.map((room) => {
    return {
      id: room.id,
      roomName: room.roomName,
      admin: room.admin,
      totalUser: room.totalUser,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt.toISOString(),
      coverImage: room.coverImage,
    };
  });
  return {
    props: { roomList: transformRooms },
  };
};
