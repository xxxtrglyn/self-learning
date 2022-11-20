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
import { IconCheck } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { ActionIcon } from "@mantine/core";
import { useAppDispatch } from "../../store";
import { updateTimeline } from "../../store/timetable-actions";

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
        <Stack style={{ height: "100%" }}>
          <LightBulb lightColor={Color[order]} />
          <Group position="center">
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
              <ActionIcon type="submit">
                <ThemeIcon
                  color="teal"
                  radius="xl"
                  style={{ cursor: "pointer" }}
                >
                  <IconCheck />
                </ThemeIcon>
              </ActionIcon>
            </Center>
          )}
        </Stack>
      </form>
    </>
  );
};

export default TimelineNow;
