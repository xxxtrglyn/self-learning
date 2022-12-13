import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { LogTime } from "../../types/logtime";
import { Color } from "../../lib/color";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const ChartByMonth: React.FC<{ value: LogTime[] }> = ({ value }) => {
  const data = value;
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

  const dataChart = {
    labels: arr.map((item) => item.name),
    datasets: [
      {
        data: arr.map((item) => item.total),
        backgroundColor: Color,
      },
    ],
  };

  return <Pie data={dataChart} />;
};

export default ChartByMonth;
