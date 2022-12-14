import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { LogTime } from "../../types/logtime";
import { Select, Stack, Group, MultiSelect } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

function leapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

const ChartByDay: React.FC<{ value: LogTime[] }> = ({ value }) => {
  const valuePerMonth = (month: number) => {
    const data = value.filter(
      (log) => new Date(log.createdAt!).getMonth() === month
    );
    return data;
  };
  const [monthChart2, setMonthChart2] = useState<number>(new Date().getMonth());
  const [filter, setFilter] = useState<string[]>([]);
  let DAY_OF_MONTH = 0;
  switch (monthChart2) {
    case 0:
      DAY_OF_MONTH = 31;
      break;
    case 1:
      DAY_OF_MONTH = 28;
      break;
    case 2:
      DAY_OF_MONTH = 31;
      break;
    case 3:
      DAY_OF_MONTH = 30;
      break;
    case 4:
      DAY_OF_MONTH = 31;
      break;
    case 5:
      DAY_OF_MONTH = 30;
      break;
    case 6:
      DAY_OF_MONTH = 31;
      break;
    case 7:
      DAY_OF_MONTH = 31;
      break;
    case 8:
      DAY_OF_MONTH = 30;
      break;
    case 9:
      DAY_OF_MONTH = 31;
      break;
    case 10:
      DAY_OF_MONTH = 30;
      break;
    case 11:
      DAY_OF_MONTH = 31;
      break;
  }
  if (monthChart2 === 2 && leapYear(new Date().getFullYear())) {
    DAY_OF_MONTH = 29;
  }

  const labels: string[] = [];
  const arr: number[] = [];
  const arrFilter: number[] = [];

  for (let i = 0; i < DAY_OF_MONTH; i++) {
    arr[i] = 0;
    labels[i] = (i + 1).toString();
    arrFilter[i] = 0;
  }

  for (const x of valuePerMonth(monthChart2)) {
    arr[new Date(x.createdAt!).getDate() - 1] += x.learnTime!;
  }

  for (const x of valuePerMonth(monthChart2)) {
    if (filter.find((id) => id === x.documentId)) {
      arrFilter[new Date(x.createdAt!).getDate() - 1] += x.learnTime!;
    }
  }

  const dataSelect = value.map((item) => ({
    label: item.document?.subjectName,
    value: item.documentId,
  }));

  const chartData = {
    labels,
    datasets: [
      {
        label: "minute",
        data: filter.length > 0 ? arrFilter : arr,
        backgroundColor: "#9370DB",
      },
    ],
  };
  return (
    <Group align="flex-start" position="center">
      <Bar options={options} data={chartData} />
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
          value={monthChart2.toString()}
          onChange={(value) => {
            setMonthChart2(+value!);
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

export default ChartByDay;
