// createChart.js
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const createChart = (chartId, data) => {
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  let chart = am4core.create(chartId, am4charts.XYChart3D);

  // Add data
  chart.data = data;

  // Create axes
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "campus";
  categoryAxis.renderer.labels.template.disabled = true; // Hide x-axis labels
  categoryAxis.renderer.grid.template.disabled = true; // Remove x-axis grid lines

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.labels.template.disabled = true; // Hide y-axis labels
  valueAxis.renderer.grid.template.disabled = true; // Remove y-axis grid lines

  // Create series
  let series = chart.series.push(new am4charts.ColumnSeries3D());
  series.dataFields.valueY = "votes";
  series.dataFields.categoryX = "campus";
  series.name = "votes";
  series.columns.template.fill = am4core.color("#FFFFFF"); // Set bar color to white
  series.columns.template.stroke = am4core.color("#FFFFFF"); // Set stroke to white
  series.columns.template.fillOpacity = 1;
  // series.columns.swap;

  // Adjust 3D depth and angle for diamond-like top
  series.depth = 100; // Adjust depth as needed
  series.angle = 90; // Set angle to 45 for diamond-like top shape

  

  // Add label on top of each column
  // Label untuk campus (di atas)
let campusLabelBullet = series.bullets.push(new am4charts.LabelBullet());
campusLabelBullet.label.text = "{campus}";
campusLabelBullet.label.fontSize = 11;
campusLabelBullet.label.fill = am4core.color("#ffffff");
campusLabelBullet.label.dy = -50; // Mengatur posisi di atas batang
campusLabelBullet.label.horizontalCenter = "middle"; // Agar tetap horizontal di tengah

// Label untuk valueY (di tengah)
let valueLabelBullet = series.bullets.push(new am4charts.LabelBullet());
valueLabelBullet.label.text = "{valueY}";
valueLabelBullet.label.fontSize = 11;
valueLabelBullet.label.fill = am4core.color("#ffffff");
valueLabelBullet.label.dy = -30; // Menyesuaikan posisi ke tengah batang
valueLabelBullet.label.horizontalCenter = "middle"; // Agar berada di tengah batang
valueLabelBullet.label.verticalCenter = "middle"; // Menempatkan nilai di tengah vertikal


  // Hide tooltips and cursor lines
  series.tooltipText = ""; // No tooltip
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.strokeOpacity = 0;
  chart.cursor.lineY.strokeOpacity = 0;

  return chart;
};

export default createChart;
