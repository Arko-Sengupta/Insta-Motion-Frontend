import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "#1c1c1e",
  border: "1px solid #262626",
  borderRadius: 12,
  color: "#f5f5f5",
};

const BarChart = ({
  Data,
  Bars,
  Height = 250,
  XKey = "name",
  ShowLegend = false,
  CategoryGap = "30%",
  YDomain,
  YFormatter,
  CustomTooltip,
}) => (
  <ResponsiveContainer width="100%" height={Height}>
    <RechartsBarChart data={Data} barCategoryGap={CategoryGap}>
      <XAxis dataKey={XKey} tick={{ fill: "#a8a8a8", fontSize: 12 }} />
      <YAxis
        tick={{ fill: "#a8a8a8", fontSize: 12 }}
        domain={YDomain}
        tickFormatter={YFormatter}
      />
      <Tooltip
        content={CustomTooltip}
        contentStyle={!CustomTooltip ? TOOLTIP_STYLE : undefined}
      />
      {ShowLegend && <Legend wrapperStyle={{ fontSize: 12, color: "#a8a8a8" }} />}
      {Bars.map((BarConfig, Idx) => (
        <Bar
          key={BarConfig.DataKey || Idx}
          dataKey={BarConfig.DataKey || "value"}
          fill={BarConfig.Fill}
          radius={BarConfig.Radius || [6, 6, 0, 0]}
          animationDuration={1000}
        >
          {BarConfig.Colors &&
            Data.map((_, I) => (
              <Cell key={I} fill={BarConfig.Colors[I % BarConfig.Colors.length]} />
            ))}
        </Bar>
      ))}
    </RechartsBarChart>
  </ResponsiveContainer>
);

export default BarChart;