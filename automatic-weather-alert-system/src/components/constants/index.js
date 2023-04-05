export const TableColumn = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Temp",
    dataIndex: "temp",
    key: "temp",
  },
  {
    title: "Pressure",
    dataIndex: "pressure",
    key: "pressure",
  },
  {
    title: "Wind",
    dataIndex: "wind",
    key: "wind",
  },
  {
    title: "Rain",
    dataIndex: "rain",
    key: "rain",
  },
  {
    title: "Clouds",
    dataIndex: "clouds",
    key: "clouds",
  },
];

export const items = [
  {
    key: "temperature",
    path: "/temperature",
  },
];
