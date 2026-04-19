import LineChart from "../Charts/LineChart";
import ScatterChart from "../Charts/ScatterChart";
import StaticData from "../Data/StaticData.json";
import "../Styles/ProfileInsights.css";

const { ProfileInsights: PIText } = StaticData;

const StatCard = ({ Label, Value, Sub }) => (
  <div className="stat-card">
    <span className="stat-card__value">{Value}</span>
    <span className="stat-card__label">{Label}</span>
    {Sub && <span className="stat-card__sub">{Sub}</span>}
  </div>
);

const TopPostCard = ({ Title, Post }) => {
  if (!Post) return null;
  const Scores = Post.SentimentScores || [0, 0, 0];
  return (
    <div className="top-post-card">
      <h5 className="top-post-card__title">{Title}</h5>
      <p className="top-post-card__text">{Post.PostText || PIText.NotAvailable}</p>
      <div className="top-post-card__stats">
        <span>{PIText.TopPostLabels.Likes} {Post.Likes}</span>
        <span>{PIText.TopPostLabels.Comments} {Post.Comments}</span>
      </div>
      <div className="top-post-card__scores">
        <span className="score score--neg">{PIText.TopPostLabels.Neg} {(Scores[0] * 100).toFixed(1)}%</span>
        <span className="score score--neu">{PIText.TopPostLabels.Neu} {(Scores[1] * 100).toFixed(1)}%</span>
        <span className="score score--pos">{PIText.TopPostLabels.Pos} {(Scores[2] * 100).toFixed(1)}%</span>
      </div>
      {Post.PostUrl && Post.PostUrl !== "" && (
        <a href={Post.PostUrl} target="_blank" rel="noopener noreferrer" className="top-post-card__link">
          {PIText.ViewPost}
        </a>
      )}
    </div>
  );
};

const ScatterTooltip = ({ active, payload }) => {
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
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{PIText.ScatterTooltip.Post} {Entry.PostId}</p>
      <p>{PIText.ScatterTooltip.Positive} {Entry.PositivePercent}%</p>
      <p>{PIText.ScatterTooltip.Likes} {Entry.Likes}</p>
      <p>{PIText.ScatterTooltip.Comments} {Entry.Comments}</p>
      <p>{PIText.ScatterTooltip.TotalEngagement} {Entry.TotalEngagement}</p>
    </div>
  );
};

const ProfileInsights = ({ Insights }) => {
  const { OverallSentiment, EngagementMetrics, SentimentTrend, EngagementSentimentCorrelation, CommentsSentimentSummary, TopPosts } = Insights;

  const TrendData = SentimentTrend.map((D) => ({
    ...D,
    Negative: parseFloat((D.Negative * 100).toFixed(1)),
    Neutral: parseFloat((D.Neutral * 100).toFixed(1)),
    Positive: parseFloat((D.Positive * 100).toFixed(1)),
  }));

  const ScatterData = EngagementSentimentCorrelation.map((D) => ({
    ...D,
    PositivePercent: parseFloat((D.PositiveScore * 100).toFixed(1)),
  }));

  return (
    <div className="profile-insights">
      <h2 className="profile-insights__title">{PIText.Title}</h2>

      <div className="profile-insights__section">
        <h3>{PIText.EngagementOverview}</h3>
        <div className="stat-grid">
          <StatCard Label={PIText.TotalPosts} Value={EngagementMetrics.TotalPosts} />
          <StatCard Label={PIText.TotalLikes} Value={EngagementMetrics.TotalLikes.toLocaleString()} />
          <StatCard Label={PIText.TotalComments} Value={EngagementMetrics.TotalComments.toLocaleString()} />
          <StatCard Label={PIText.AvgEngagement} Value={EngagementMetrics.AverageEngagement} />
          <StatCard Label={PIText.AvgLikes} Value={EngagementMetrics.AverageLikes} />
          <StatCard Label={PIText.AvgComments} Value={EngagementMetrics.AverageComments} />
        </div>
      </div>

      <div className="profile-insights__section">
        <h3>{PIText.OverallCaptionSentiment}</h3>
        <div className="stat-grid">
          <StatCard
            Label={PIText.DominantSentiment}
            Value={OverallSentiment.DominantSentiment}
          />
          <StatCard Label={PIText.AvgNegative} Value={`${(OverallSentiment.AverageNegative * 100).toFixed(1)}%`} />
          <StatCard Label={PIText.AvgNeutral} Value={`${(OverallSentiment.AverageNeutral * 100).toFixed(1)}%`} />
          <StatCard Label={PIText.AvgPositive} Value={`${(OverallSentiment.AveragePositive * 100).toFixed(1)}%`} />
        </div>
      </div>

      <div className="profile-insights__section">
        <h3>{PIText.CommentsSentimentSummary}</h3>
        <div className="stat-grid">
          <StatCard Label={PIText.TotalCommentsAnalyzed} Value={CommentsSentimentSummary.TotalComments} />
          <StatCard
            Label={PIText.DominantCommentSentiment}
            Value={CommentsSentimentSummary.DominantSentiment}
          />
          <StatCard Label={PIText.AvgNegative} Value={`${(CommentsSentimentSummary.AverageNegative * 100).toFixed(1)}%`} />
          <StatCard Label={PIText.AvgPositive} Value={`${(CommentsSentimentSummary.AveragePositive * 100).toFixed(1)}%`} />
        </div>
      </div>

      {TrendData.length > 1 && (
        <div className="profile-insights__section">
          <h3>{PIText.SentimentTrendTitle}</h3>
          <div className="profile-insights__chart-card">
            <LineChart
              Data={TrendData}
              Lines={PIText.TrendLines}
              XKey="PostDate"
              XFormatter={(V) => V.slice(0, 10)}
              YDomain={[0, 100]}
              YFormatter={(V) => `${V}%`}
              TooltipFormatter={(Value) => `${Value}%`}
            />
          </div>
        </div>
      )}

      {ScatterData.length > 0 && (
        <div className="profile-insights__section">
          <h3>{PIText.EngagementVsSentimentTitle}</h3>
          <div className="profile-insights__chart-card">
            <ScatterChart
              Data={ScatterData}
              XKey="PositivePercent"
              XName={PIText.PositiveSentimentLabel}
              XDomain={[0, 100]}
              XFormatter={(V) => `${V}%`}
              XLabel={{
                value: PIText.PositiveSentimentLabel,
                position: "insideBottom",
                offset: -5,
                fill: "#666",
                fontSize: 11,
              }}
              YKey="TotalEngagement"
              YName={PIText.TotalEngagementLabel}
              YLabel={{
                value: PIText.TotalEngagementLabel,
                angle: -90,
                position: "insideLeft",
                fill: "#666",
                fontSize: 11,
              }}
              CustomTooltip={<ScatterTooltip />}
            />
          </div>
        </div>
      )}

      <div className="profile-insights__section">
        <h3>{PIText.NotablePosts}</h3>
        <div className="top-posts-grid">
          <TopPostCard Title={PIText.MostPositive} Post={TopPosts.MostPositive} />
          <TopPostCard Title={PIText.MostNegative} Post={TopPosts.MostNegative} />
          <TopPostCard Title={PIText.MostEngaged} Post={TopPosts.MostEngaged} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInsights;