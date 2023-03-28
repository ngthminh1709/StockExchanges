import { Series } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import React, { useLayoutEffect, useState } from "react";
import "./PercentageAreaChart.styles.scss";

const PercentageAreaChart = () => {
  var Highcharts = require("highcharts");
  const [hoveredValue, setHoveredValue] = useState(null);

  // axis title , tick mark ( tickInterval , tickPixel ) , alignThresholds
  // tooltip : cái show ra khi hover vào 1 điểm bao gồm name và data ( splir chia tất cả các point và hiển thị )
  // crosshair : điểm gióng xuống trục x và y
  // tất cả text trong chart có thể được điều chỉnh với formatters và format option bắt đầu bằng dấu {  }
  // 2 số phần thập phân: "{point.y:.2f}"
  const data = [...Array(345)].map((item, index) => index + 1);
  const data1 = [...Array(345)].map((item, index) => index + 100);
  const data2 = [...Array(345)].map((item, index) => index + 200);
  const options = {
    // chart: {
    //   type: "area",
    // },
    // title: {
    //   useHTML: true,
    //   text: "Countries/regions with highest Gt CO<sub>2</sub>-emissions",
    //   align: "left",
    // },
    // subtitle: {
    //   text:
    //     "Source: " +
    //     '<a href="https://energiogklima.no/klimavakten/land-med-hoyest-utslipp/"' +
    //     'target="_blank">Energi og Klima</a>',
    //   align: "left",
    // },
    // accessibility: {
    //   // point: {
    //   //   valueDescriptionFormat:
    //   //     "{index}. {point.category}, {point.y:,.1f} billions, {point.percentage:.1f}%.",
    //   // },
    // },
    // legend: {
    //   enabled: true,
    //   labelFormatter: function () {
    //     const hoveredPoint = hoveredValue?.find(
    //       (point) => point.name === this.name
    //     );
    //     const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
    //     return `${this.name}${valueString}`;
    //   },
    // },
    // yAxis: {
    //   labels: {
    //     format: "{value}%",
    //   },
    //   title: {
    //     enabled: false,
    //   },
    // },
    // xAxis: {
    //   crosshair: {
    //     color: "red",
    //   },
    //   type: "datetime",
    //   tickInterval: 114e4,
    // },
    // tooltip: {
    //   pointFormat:
    //     '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f} billion Gt)<br/>',
    //   xDateFormat: "%H:%M",
    //   split: true,
    // },
    // plotOptions: {
    //   series: {
    //     pointStart: Date.UTC(2020, 0, 1, 9, 15),
    //     pointInterval: 6e4, // phút
    //   },
    //   area: {
    //     stacking: "percent",
    //     marker: {
    //       enabled: false,
    //     },
    //   },
    //   point: {
    //     events: {
    //       mouseOver: function () {
    //         console.log(this);
    //         const hoveredValues = [];
    //         const xValue = this.x;
    //         this.series.chart.series.forEach((series) => {
    //           const point = series.data.find((point) => point.x === xValue);
    //           if (point) {
    //             hoveredValues.push({
    //               name: series.name,
    //               color: series.color,
    //               value: point.y,
    //             });
    //           }
    //         });
    //         setHoveredValue(hoveredValues);
    //       },
    //       mouseOut: function () {
    //         setHoveredValue(null);
    //       },
    //     },
    //   },
    // },
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "area",
      zoomType: "x",
      //backgroundColor: "black",
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "",
      style: {
        // color: "#F1950C",
      },
    },
    xAxis: {
      //categories: timeLine,
      tickmarkPlacement: "on",
      title: {
        enabled: true,
      },
      labels: {
        style: {
          //color: "#fff",
        },
      },
      crosshair: {
        color: "red",
        width: 2,
      },
      type: "datetime",
      tickInterval: 114e4,
    },
    yAxis: {
      title: {
        text: "Tỉ lệ %",
        style: {
          // color: "#fff",
        },
      },
      labels: {
        style: {
          //color: "#fff",
        },
        formatter: function () {
          return this.value;
        },
      },
    },
    legend: {
      itemStyle: {
        //color: "#fff",
      },
      enabled: true,
      labelFormatter: function () {
        const hoveredPoint = hoveredValue?.find(
          (point) => point.name === this.name
        );
        const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
        return `${this.name}${valueString}`;
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormat:
        '<span style="backgroundColor:{series.color}">{series.name}</span><b>{point.percentage:.1f}%</b> ({point.y:,.1f} billion Gt)<br/>',
      xDateFormat: "%H:%M",
      split: true,
      borderRadius: 10,
      borderWidth: 2,
      color: "white",
    },
    plotOptions: {
      area: {
        stacking: "percent",
        //lineColor: "#ffffff",
        lineWidth: 1,
        tooltip: {
          valueSuffix: " ",
        },
      },
      series: {
        pointStart: Date.UTC(2020, 0, 1, 9, 15),
        pointInterval: 6e4, // phút
        tooltip: {
          headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
          pointFormat:
            "<span style='color:{point.color}'>{series.name}: <b>{point.y}</b></span><br/>",
          valueDecimals: 2,
        },
        point: {
          events: {
            mouseOver: function () {
              const hoveredValues = [];
              const xValue = this.x;
              this.series.chart.series.forEach((series) => {
                const point = series.data.find((point) => point.x === xValue);
                if (point) {
                  hoveredValues.push({
                    name: series.name,
                    color: series.color,
                    value: point.y,
                  });
                }
              });
              setHoveredValue(hoveredValues);
            },
            mouseOut: function () {
              setHoveredValue(null);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Tăng giá",
        data: data,
        color: "#5ab55c",
        // [
        //   2.5, 2.6, 2.7, 2.9, 3.1, 3.4, 3.5, 3.5, 3.4, 3.4, 3.4, 3.5, 3.9, 4.5,
        //   5.2, 5.9, 6.5, 7, 7.5, 7.9, 8.6, 9.5, 9.8, 10, 10, 9.8, 9.7, 9.9,
        //   10.3, 10.5, 10.7, 10.9,
        // ],
      },
      {
        name: "Đứng giá",
        data: data1,
        color: "#fcda50",
      },
      {
        name: "Giảm giá",
        data: data2,
        color: "#bc3a36",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PercentageAreaChart;
