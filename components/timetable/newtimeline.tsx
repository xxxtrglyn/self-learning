import {
  Group,
  Modal,
  Stack,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useRef } from "react";
import {
  IconCheck,
  IconX,
  IconClockHour3,
  IconClockHour6,
} from "@tabler/icons";
import { useAppDispatch } from "../../store";
import { TimeInput } from "@mantine/dates";
import { createNewTimeLine } from "../../store/timetable-actions";
import { useRouter } from "next/router";
import { useState } from "react";
//   import { createNewTimeLine } from "../../store/timeLine-actions";

const NewTimeLine: React.FC<{ opened: boolean; onClose: () => void }> = (
  props
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query["timeTableId"] as string;
  const textInputRef = useRef<HTMLInputElement>(null);
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());

  const addNewTimeLineHandler = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    const enteredTitle = textInputRef.current?.value;
    if (enteredTitle != null) {
      dispatch(
        createNewTimeLine({
          id: id,
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
          moreDetail: textInputRef.current?.value!,
        })
      );
    }
    props.onClose();
  };

  return (
    <Modal
      padding={20}
      opened={props.opened}
      withCloseButton={false}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      closeOnClickOutside={true}
      onClose={props.onClose}
    >
      <Stack>
        <Title order={2} weight={100} align="center">
          Add new TimeLine
        </Title>
        <TextInput
          label="Detail"
          placeholder="Enter more detail"
          ref={textInputRef}
        />
        <Group position="center">
          <TimeInput
            icon={<IconClockHour3 />}
            style={{ flex: 1 }}
            format="24"
            label="Start At"
            value={startAt}
            onChange={(value) => {
              setStartAt(value);
            }}
          />
          <TimeInput
            icon={<IconClockHour6 />}
            style={{ flex: 1 }}
            format="24"
            label="End At"
            value={endAt}
            onChange={(value) => {
              setEndAt(value);
            }}
          />
        </Group>
        <Group position="center">
          <ThemeIcon
            color="lime"
            size={30}
            radius="xl"
            style={{ cursor: "pointer" }}
            onClick={addNewTimeLineHandler}
          >
            <IconCheck size={20} />
          </ThemeIcon>
          <ThemeIcon
            color="red"
            size={30}
            radius="xl"
            style={{ cursor: "pointer" }}
            onClick={props.onClose}
          >
            <IconX size={20} />
          </ThemeIcon>
        </Group>
      </Stack>
    </Modal>
  );
};

export default NewTimeLine;
