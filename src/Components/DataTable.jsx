import StaticData from "../Data/StaticData.json";
import "../Styles/DataTable.css";

const { DataTable: DataTableConfig } = StaticData;

const DataTable = ({ Data }) => {
  if (!Data || Data.length === 0) return null;

  const Columns = DataTableConfig.DisplayColumns.filter((Col) => Col in Data[0]);

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {Columns.map((Col) => (
              <th key={Col}>{Col.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Data.map((Row, I) => (
            <tr key={I}>
              {Columns.map((Col) => (
                <td key={Col}>{String(Row[Col] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
