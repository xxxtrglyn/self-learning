import React, { useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { LogTime } from "../../types/logtime";
import { Color } from "../../lib/color";
import { Group, MultiSelect, Select, Stack } from "@mantine/core";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartByMonth: React.FC<{ value: LogTime[] }> = ({ value }) => {
  const [filter, setFilter] = useState<string[]>([]);
  const [monthChart1, setMonthChart1] = useState<number>(new Date().getMonth());

  const valuePerMonth = (month: number) => {
    const data = value.filter(
      (log) => new Date(log.createdAt!).getMonth() === month
    );
    return data;
  };

  const data = valuePerMonth(monthChart1);
  let arr: { id: string; name: string; total: number }[] = [];
  arr = data.map((log) => {
    const index = arr.findIndex((value) => value.id === log.documentId);
    if (index === -1) {
      return {
        id: log.documentId,
        name: log.document?.subjectName!,
        total: log.learnTime!,
      };
    } else {
      return { ...arr[index], total: arr[index].total + log.learnTime! };
    }
  });

  const dataSelect = value.map((item) => ({
    label: item.document?.subjectName,
    value: item.documentId,
  }));
  const arrFilter = arr.filter((item) => filter.find((id) => id === item.id));

  const dataChart = {
    labels: arr.map((item) => item.name),
    datasets: [
      {
        data: arr.map((item) => item.total),
        backgroundColor: Color,
      },
    ],
  };
  const dataChartFilter = {
    labels: arrFilter.map((item) => item.name),
    datasets: [
      {
        data: arrFilter.map((item) => item.total),
        backgroundColor: Color,
      },
    ],
  };

  return (
    <Group style={{ height: "40vh" }} align="flex-start">
      <Pie data={filter.length > 0 ? dataChartFilter : dataChart} />
      <Stack>
        <Select
          style={{ width: "65px" }}
          label="Month"
          data={[
            { value: "0", label: "1" },
            { value: "1", label: "2" },
            { value: "2", label: "3" },
            { value: "3", label: "4" },
            { value: "4", label: "5" },
            { value: "5", label: "6" },
            { value: "6", label: "7" },
            { value: "7", label: "8" },
            { value: "8", label: "9" },
            { value: "9", label: "10" },
            { value: "10", label: "11" },
            { value: "11", label: "12" },
          ]}
          value={monthChart1.toString()}
          onChange={(value) => {
            setMonthChart1(+value!);
          }}
        />
        <MultiSelect
          data={dataSelect}
          value={filter}
          onChange={setFilter}
          style={{ width: "15vw" }}
          maxDropdownHeight={160}
          placeholder="Select your subject"
        />
      </Stack>
    </Group>
  );
};

export default ChartByMonth;
