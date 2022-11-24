import {
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import React from "react";
import LightBulb from "../ui/lightbulb";
import { Color } from "../../lib/color";
import { TimeInput } from "@mantine/dates";
import { Timeline } from "../../types/timeline";
import { IconCheck, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { ActionIcon } from "@mantine/core";
import { useAppDispatch } from "../../store";
import { deleteTimeLine, updateTimeline } from "../../store/timetable-actions";

const TimelineNow: React.FC<{
  order: number;
  isEdited: boolean;
  data: Timeline;
}> = ({ data, isEdited, order }) => {
  const form = useForm({
    initialValues: {
      moreDetail: data.moreDetail ? data.moreDetail : "",
      startAt: data.startAt!,
      endAt: data.endAt!,
    },
  });

  const dispatch = useAppDispatch();

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(
            updateTimeline({
              id: data.id,
              moreDetail: values.moreDetail,
              startAt: values.startAt,
              endAt: values.endAt,
            })
          );
        })}
      >
        <Stack style={{ height: "100%", flex: 0 }}>
          <LightBulb lightColor={Color[order]} />
          <Group position="center" noWrap>
            <TimeInput
              format="24"
              value={new Date(form.values.startAt)}
              onChange={(value) => {
                form.setFieldValue("startAt", value.toISOString());
              }}
              disabled={!isEdited}
            />
            <TimeInput
              value={new Date(form.values.endAt)}
              onChange={(value) => {
                form.setFieldValue("endAt", value.toISOString());
              }}
              disabled={!isEdited}
            />
          </Group>
          {!isEdited ? (
            <Text style={{ height: "30%", overflow: "hidden" }}>
              {form.values.moreDetail}
            </Text>
          ) : (
            <TextInput
              style={{ height: "30%", overflow: "hidden" }}
              value={form.values.moreDetail}
              onChange={(event) => {
                form.setFieldValue("moreDetail", event.currentTarget.value);
              }}
            />
          )}
          {isEdited && (
            <Center style={{ marginTop: "auto", flex: 1 }}>
              <Stack>
                <ActionIcon type="submit">
                  <ThemeIcon
                    color="teal"
                    radius="xl"
                    style={{ cursor: "pointer" }}
                  >
                    <IconCheck />
                  </ThemeIcon>
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    dispatch(deleteTimeLine(data.id));
                  }}
                >
                  <ThemeIcon
                    color="red"
                    radius="xl"
                    style={{ cursor: "pointer" }}
                  >
                    <IconX />
                  </ThemeIcon>
                </ActionIcon>
              </Stack>
            </Center>
          )}
        </Stack>
      </form>
    </>
  );
};

export default TimelineNow;
