export function formatTime(timeString: string) {
  const dateTimeObject = new Date(timeString);

  const hours = dateTimeObject.getHours().toString().padStart(2, '0');
  const minutes = dateTimeObject.getMinutes().toString().padStart(2, '0');
  const day = dateTimeObject.getDate().toString().padStart(2, '0');
  const month = (dateTimeObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTimeObject.getFullYear();

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedTime;
}

export function currentTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, '0');
  // const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}.${month}.${year} ${hours}:00`;
}

export function findDivider(data: string[]) {
  const now = currentTime();
  const formattedTimeArr = data.map(str => formatTime(str));
  const nowIndex = formattedTimeArr.findIndex(dateStr => dateStr === now);

  return nowIndex;
}

export function transformData(data: any) {
  const temp = [];

  const dataValues: any[][] = Object.values(data);
  const formattedTimeArr = dataValues[0].map(str => formatTime(str));
  dataValues.splice(0, 1, formattedTimeArr);

  for (let i = 0; i < dataValues[0].length; i++) {
    const tableRow = [];
    for (const [index, _] of dataValues.entries()) {
      tableRow.push(dataValues[index][i])
    }
    temp.push(tableRow);
  }
  return temp;
}

export function chartRenderInfo(cityName: string, xAxisData: string[], yAxisData: number[]) {
  return {
    title: {
      text: `High temperatures (°C) for ${cityName}`,
      left: "center",
      top: "top",
      padding: [20, 0, 0, 0],
      textStyle: {
        fontSize: 20
      },
    },
    xAxis: {
      name: 'time [x]',
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 20,
        padding: [20, 0, 0, 0],
      },
      type: 'category',
      data: [...xAxisData],
    },
    yAxis: {
      name: '°C [y]',
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 20,
        padding: [0, 0, 20, 0],
      },
      type: 'value',
    },
    series: [
      {
        data: [...yAxisData],
        type: 'line',
      },
    ],
  }
}