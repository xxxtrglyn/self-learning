import React, { useState } from "react";
import { createStyles, Text } from "@mantine/core";
import { TimeItem } from "../../../types/timeitem";
import NewSlider from "./newslider";
import { useAppDispatch } from "../../../store";
import { updateSlider } from "../../../store/timecontrol-actions";

const useStyles = createStyles(() => ({
  slidercontainer: {
    position: "relative",
    width: "100%",
    display: "inline-block",
  },
}));

const TimeSlider: React.FC<{ value: TimeItem; color: string }> = ({
  value,
  color,
}) => {
  const [isShowUpdateForm, setIsShowUpdateForm] = useState<boolean>(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const updateSliderHandler = (description: string, amount: number) => {
    dispatch(
      updateSlider({ id: value.id, description: description, amount: amount })
    );
  };

  const MINUTES_IN_HALF_DAY = 12 * 60;
  const percent = (value.amount / MINUTES_IN_HALF_DAY) * 100;
  return (
    <>
      <div
        style={{
          height: "100%",
          width: `${percent - 1}%`,
          backgroundColor: `${color}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsShowUpdateForm(true);
        }}
      >
        <Text weight={500} color="white" size="md" py={10} lineClamp={1}>
          {value.amount}m
        </Text>
      </div>
      <NewSlider
        value={{
          description: value.description,
          amount: value.amount,
          documentId: value.documentId!,
        }}
        opened={isShowUpdateForm}
        onClose={() => {
          setIsShowUpdateForm(false);
        }}
        onAdd={updateSliderHandler}
      />
    </>
  );
};

export default TimeSlider;
