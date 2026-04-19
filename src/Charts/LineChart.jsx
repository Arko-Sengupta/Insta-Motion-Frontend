import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "#1c1c1e",
  border: "1px solid #262626",
  borderRadius: 12,
  color: "#f5f5f5",
};

const LineChart = ({
  Data,
  Lines,
  Height = 300,
  XKey = "name",
  XFormatter,
  YDomain,
  YFormatter,
  TooltipFormatter,
}) => (
  <ResponsiveContainer width="100%" height={Height}>
    <RechartsLineChart data={Data}>
      <XAxis
        dataKey={XKey}
        tick={{ fill: "#a8a8a8", fontSize: 11 }}
        tickFormatter={XFormatter}
      />
      <YAxis
        tick={{ fill: "#a8a8a8", fontSize: 11 }}
        domain={YDomain}
        tickFormatter={YFormatter}
      />
      <Tooltip
        contentStyle={TOOLTIP_STYLE}
        formatter={TooltipFormatter}
      />
      <Legend wrapperStyle={{ fontSize: 12, color: "#a8a8a8" }} />
      {Lines.map((LineConfig) => (
        <Line
          key={LineConfig.DataKey}
          type="monotone"
          dataKey={LineConfig.DataKey}
          stroke={LineConfig.Stroke}
          strokeWidth={LineConfig.StrokeWidth || 2}
          dot={{ r: LineConfig.DotRadius || 4 }}
          animationDuration={1000}
        />
      ))}
    </RechartsLineChart>
  </ResponsiveContainer>
);

export default LineChart;