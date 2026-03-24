import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TOOLTIP_STYLE = {
  background: "#1c1c1e",
  border: "1px solid #262626",
  borderRadius: 12,
  color: "#f5f5f5",
};

const PieChart = ({
  Data,
  Colors,
  Height = 250,
  OuterRadius = 80,
  ShowLabel = true,
  LabelFormatter,
  TooltipFormatter,
}) => (
  <ResponsiveContainer width="100%" height={Height}>
    <RechartsPieChart>
      <Pie
        data={Data}
        cx="50%"
        cy="50%"
        outerRadius={OuterRadius}
        dataKey="value"
        animationDuration={1000}
        label={ShowLabel ? (LabelFormatter || (({ name, value }) => `${name}: ${value}%`)) : false}
      >
        {Data.map((_, Idx) => (
          <Cell key={Idx} fill={Colors[Idx % Colors.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={TooltipFormatter || ((Value) => `${Value}%`)}
        contentStyle={TOOLTIP_STYLE}
      />
      <Legend wrapperStyle={{ fontSize: 12, color: "#a8a8a8" }} />
    </RechartsPieChart>
  </ResponsiveContainer>
);

export default PieChart;
