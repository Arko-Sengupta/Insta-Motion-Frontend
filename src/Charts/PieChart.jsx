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

const TOOLTIP_ITEM_STYLE  = { color: "#f5f5f5" };
const TOOLTIP_LABEL_STYLE = { color: "#a8a8a8" };

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  if (value < 5) return null;
  const RADIAN = Math.PI / 180;
  const Radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const X = cx + Radius * Math.cos(-midAngle * RADIAN);
  const Y = cy + Radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={X}
      y={Y}
      fill="#f5f5f5"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${value}%`}
    </text>
  );
};

const PieChart = ({
  Data,
  Colors,
  Height = 260,
  OuterRadius = 90,
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
        labelLine={false}
        label={renderLabel}
      >
        {Data.map((_, Idx) => (
          <Cell key={Idx} fill={Colors[Idx % Colors.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={TooltipFormatter || ((Value) => `${Value}%`)}
        contentStyle={TOOLTIP_STYLE}
        itemStyle={TOOLTIP_ITEM_STYLE}
        labelStyle={TOOLTIP_LABEL_STYLE}
      />
      <Legend wrapperStyle={{ fontSize: 12, color: "#a8a8a8" }} />
    </RechartsPieChart>
  </ResponsiveContainer>
);

export default PieChart;