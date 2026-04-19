import { useState } from "react";
import StaticData from "../Data/StaticData.json";
import "../Styles/DataTemplate.css";

const { DataTemplate: TemplateText } = StaticData;

const DataTemplate = () => {
  const [IsOpen, SetIsOpen] = useState(false);

  return (
    <div className="data-template">
      <button
        className="data-template__toggle"
        onClick={() => SetIsOpen(!IsOpen)}
      >
        {IsOpen ? TemplateText.HideGuide : TemplateText.ShowGuide}
      </button>

      {IsOpen && (
        <div className="data-template__content">
          <h3 className="data-template__title">{TemplateText.Title}</h3>
          <p className="data-template__desc">{TemplateText.Description}</p>

          <div className="data-template__section">
            <h4>{TemplateText.RequiredColumnsTitle}</h4>
            <div className="data-template__table-wrapper">
              <table className="data-template__table">
                <thead>
                  <tr>
                    <th>{TemplateText.ColumnHeader}</th>
                    <th>{TemplateText.TypeHeader}</th>
                    <th>{TemplateText.DescriptionHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {TemplateText.Columns.map((Col) => (
                    <tr key={Col.Name}>
                      <td className="data-template__col-name">{Col.Name}</td>
                      <td className="data-template__col-type">{Col.Type}</td>
                      <td>{Col.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="data-template__section">
            <h4>{TemplateText.SampleTitle}</h4>
            <div className="data-template__table-wrapper">
              <table className="data-template__table">
                <thead>
                  <tr>
                    {TemplateText.SampleHeaders.map((Header) => (
                      <th key={Header}>{Header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TemplateText.SampleRows.map((Row, Idx) => (
                    <tr key={Idx}>
                      {Row.map((Cell, CIdx) => (
                        <td key={CIdx}>{Cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="data-template__notes">
            <h4>{TemplateText.NotesTitle}</h4>
            <ul>
              {TemplateText.Notes.map((Note, Idx) => (
                <li key={Idx}>{Note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTemplate;