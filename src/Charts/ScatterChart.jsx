import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

const ScatterChart = ({
  Data,
  Height = 300,
  XKey,
  XName,
  XDomain,
  XFormatter,
  XLabel,
  YKey,
  YName,
  YLabel,
  Fill = "#dd2a7b",
  ZRange = [60, 200],
  CustomTooltip,
}) => (
  <ResponsiveContainer width="100%" height={Height}>
    <RechartsScatterChart>
      <XAxis
        dataKey={XKey}
        name={XName}
        tick={{ fill: "#a8a8a8", fontSize: 11 }}
        domain={XDomain}
        tickFormatter={XFormatter}
        label={XLabel}
      />
      <YAxis
        dataKey={YKey}
        name={YName}
        tick={{ fill: "#a8a8a8", fontSize: 11 }}
        label={YLabel}
      />
      <ZAxis range={ZRange} />
      <Tooltip content={CustomTooltip} />
      <Scatter
        data={Data}
        fill={Fill}
        animationDuration={1000}
      />
    </RechartsScatterChart>
  </ResponsiveContainer>
);

export default ScatterChart;
