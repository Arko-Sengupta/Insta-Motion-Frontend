import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Negative: "#ed4956",
  Neutral:  "#a8a8a8",
  Positive: "#78e08f",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const Entry = payload[0]?.payload;
  return (
    <div
      style={{
        background: "#1c1c1e",
        border: "1px solid #333",
        padding: "10px 14px",
        borderRadius: 10,
        color: "#f5f5f5",
        fontSize: 12,
        maxWidth: 300,
      }}
    >
      <p style={{ marginBottom: 6, fontWeight: 600, wordBreak: "break-word" }}>
        {Entry.FullComment}
      </p>
      {payload.map((P) => (
        <p key={P.dataKey} style={{ color: P.fill, margin: "2px 0" }}>
          {P.dataKey}: {P.value}%
        </p>
      ))}
    </div>
  );
};

const CustomYAxisTick = ({ x, y, payload }) => {
  const label = payload.value;
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#a8a8a8" fontSize={12}>
      {label}
    </text>
  );
};

const CommentsBarChart = ({ Data }) => {
  const RowHeight = 36;
  const Height = Math.max(200, Data.length * RowHeight + 60);

  return (
    <ResponsiveContainer width="100%" height={Height}>
      <BarChart
        data={Data}
        layout="vertical"
        margin={{ top: 8, right: 20, left: 40, bottom: 8 }}
        barCategoryGap="25%"
        barGap={2}
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(V) => `${V}%`}
          tick={{ fill: "#a8a8a8", fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={<CustomYAxisTick />}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#a8a8a8", paddingTop: 8 }} />
        <Bar dataKey="Negative" fill={COLORS.Negative} radius={[0, 4, 4, 0]} animationDuration={800} />
        <Bar dataKey="Neutral"  fill={COLORS.Neutral}  radius={[0, 4, 4, 0]} animationDuration={800} />
        <Bar dataKey="Positive" fill={COLORS.Positive} radius={[0, 4, 4, 0]} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CommentsBarChart;