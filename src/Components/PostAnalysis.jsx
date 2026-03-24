import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import StaticData from "../Data/StaticData.json";
import "../Styles/PostAnalysis.css";

const { PostAnalysis: PostText } = StaticData;

const CommentsTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const Entry = payload[0]?.payload;
  return (
    <div
      style={{
        background: "#1c1c1e",
        border: "1px solid #262626",
        padding: "10px 14px",
        borderRadius: 12,
        color: "#f5f5f5",
        fontSize: 12,
        maxWidth: 280,
      }}
    >
      <p style={{ marginBottom: 6, fontWeight: 600 }}>{Entry.FullComment}</p>
      {payload.map((P) => (
        <p key={P.dataKey} style={{ color: P.fill }}>
          {P.dataKey}: {P.value}%
        </p>
      ))}
    </div>
  );
};

const PostAnalysis = ({ Post }) => {
  const PostUrl = Post.Post_URL || "#";
  const LikesCount = Post.Likes_Count ?? 0;
  const CommentsCount = Post.Comments_Count ?? 0;
  const TextLabel = Post.Post_Text_Label || [0, 0, 0];
  const CommentsLabel = Post.Comments_Label || {};

  const LikesCommentsData = [
    { name: PostText.Likes, value: LikesCount },
    { name: PostText.Comments, value: CommentsCount },
  ];

  const SentimentData = PostText.SentimentLabels.map((Label, I) => ({
    name: Label,
    value: parseFloat((TextLabel[I] * 100).toFixed(1)),
  }));

  const CommentsData = Object.entries(CommentsLabel)
    .map(([Comment, Scores], Idx) => ({
      name: `C${Idx + 1}`,
      FullComment: Comment,
      Negative: parseFloat((Scores[0] * 100).toFixed(1)),
      Neutral: parseFloat((Scores[1] * 100).toFixed(1)),
      Positive: parseFloat((Scores[2] * 100).toFixed(1)),
    }))
    .sort((A, B) => B.Positive - A.Positive);

  return (
    <div className="post-analysis">
      <h3 className="post-analysis__link">
        {PostText.PostLink}{" "}
        <a href={PostUrl} target="_blank" rel="noopener noreferrer">
          {PostText.ClickHere}
        </a>
      </h3>

      <div className="post-analysis__row">
        <div className="post-analysis__card">
          <h4>{PostText.LikesCommentsTitle}</h4>
          <BarChart
            Data={LikesCommentsData}
            Bars={[{ DataKey: "value", Colors: PostText.BarColors }]}
          />
        </div>

        <div className="post-analysis__card">
          <h4>{PostText.CaptionSentimentTitle}</h4>
          <PieChart
            Data={SentimentData}
            Colors={PostText.SentimentColors}
          />
        </div>
      </div>

      {CommentsData.length > 0 && (
        <div className="post-analysis__card post-analysis__card--full">
          <h4>{PostText.CommentsSentimentTitle}</h4>
          <BarChart
            Data={CommentsData}
            Height={Math.max(300, CommentsData.length * 25 + 100)}
            CategoryGap="20%"
            ShowLegend={true}
            YDomain={[0, 100]}
            YFormatter={(V) => `${V}%`}
            CustomTooltip={<CommentsTooltip />}
            Bars={[
              { DataKey: "Negative", Fill: "#ed4956", Radius: [4, 4, 0, 0] },
              { DataKey: "Neutral", Fill: "#a8a8a8", Radius: [4, 4, 0, 0] },
              { DataKey: "Positive", Fill: "#78e08f", Radius: [4, 4, 0, 0] },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default PostAnalysis;
