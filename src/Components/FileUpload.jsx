import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import StaticData from "../Data/StaticData.json";
import "../Styles/FileUpload.css";

const { FileUpload: FileUploadText } = StaticData;

const FileUpload = ({ OnFileAccepted, Disabled }) => {
  const OnDrop = useCallback(
    (AcceptedFiles) => {
      if (AcceptedFiles.length > 0) {
        OnFileAccepted(AcceptedFiles[0]);
      }
    },
    [OnFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: OnDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    disabled: Disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`file-upload ${isDragActive ? "file-upload--active" : ""} ${Disabled ? "file-upload--disabled" : ""}`}
    >
      <input {...getInputProps()} />
      <FaCloudUploadAlt className="file-upload__icon" />
      {isDragActive ? (
        <p>{FileUploadText.DropMessage}</p>
      ) : (
        <p>{FileUploadText.DragMessage}</p>
      )}
      <span className="file-upload__hint">{FileUploadText.Hint}</span>
    </div>
  );
};

export default FileUpload;
