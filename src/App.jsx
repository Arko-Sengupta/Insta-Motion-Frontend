import { useState } from "react";
import Header from "./Components/Header";
import FileUpload from "./Components/FileUpload";
import DataTable from "./Components/DataTable";
import PostAnalysis from "./Components/PostAnalysis";
import ProfileInsights from "./Components/ProfileInsights";
import Loader from "./Components/Loader";
import DataTemplate from "./Components/DataTemplate";
import { AnalyzePostsFile } from "./Routes/Routes";
import StaticData from "./Data/StaticData.json";
import "./Styles/App.css";

const { App: AppText } = StaticData;

const App = () => {
  const [File, SetFile] = useState(null);
  const [Results, SetResults] = useState(null);
  const [Insights, SetInsights] = useState(null);
  const [Loading, SetLoading] = useState(false);
  const [Error, SetError] = useState(null);

  const HandleFileAccepted = (AcceptedFile) => {
    SetFile(AcceptedFile);
    SetError(null);
    SetResults(null);
    SetInsights(null);
  };

  const HandleReset = () => {
    SetFile(null);
    SetResults(null);
    SetInsights(null);
    SetError(null);
    SetLoading(false);
  };

  const HandleAnalyze = async () => {
    if (!File) return;

    SetLoading(true);
    SetError(null);
    SetResults(null);
    SetInsights(null);

    try {
      const Data = await AnalyzePostsFile(File);
      SetResults(Data.results);
      SetInsights(Data.insights);
    } catch (Err) {
      let Message = AppText.DefaultError;
      if (Err.response?.data?.detail) {
        Message = Err.response.data.detail;
      } else if (Err.code === "ERR_NETWORK") {
        Message = AppText.NetworkError;
      } else if (Err.code === "ECONNABORTED") {
        Message = AppText.TimeoutError;
      }
      SetError(Message);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="app">
      <Header Title={AppText.Title} />
      <p className="app__subheader">{AppText.SubHeader}</p>

      {!File && !Results && (
        <>
          <FileUpload OnFileAccepted={HandleFileAccepted} Disabled={Loading} />
          <DataTemplate />
        </>
      )}

      {File && !Results && !Loading && (
        <div className="app__file-info">
          <div className="app__file-card">
            <p className="app__file-name">
              {AppText.FileLoaded} <strong>{File.name}</strong>
            </p>
            <button onClick={HandleReset} className="app__reset-btn">
              {AppText.ChangeFile}
            </button>
          </div>
          <button
            onClick={HandleAnalyze}
            className="app__analyze-btn"
          >
            {AppText.AnalyzeButton}
          </button>
        </div>
      )}

      {Loading && <Loader />}

      {Error && (
        <div className="app__error-section">
          <div className="app__error">{Error}</div>
          <button onClick={HandleReset} className="app__reset-btn">
            {AppText.TryAgain}
          </button>
        </div>
      )}

      {Results && Insights && (
        <>
          <div className="app__success">{AppText.SuccessMessage}</div>

          <ProfileInsights Insights={Insights} />

          <div className="app__results-header">
            <Header Title={AppText.ResultsHeader} />
          </div>

          <DataTable Data={Results} />

          {Results.map((Post, Idx) => (
            <PostAnalysis key={Post.Post_ID || Idx} Post={Post} />
          ))}

          <div className="app__new-analysis">
            <button onClick={HandleReset} className="app__analyze-btn">
              {AppText.NewAnalysis}
            </button>
          </div>
        </>
      )}

      {!File && !Results && (
        <p className="app__placeholder">{AppText.Placeholder}</p>
      )}
    </div>
  );
};

export default App;
