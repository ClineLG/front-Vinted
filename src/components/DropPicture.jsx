import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const DropPicture = ({ setState, state, str }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setState({ ...state, picture: acceptedFiles[0] });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="list">
      {file.path}
    </li>
  ));
  return (
    <div {...getRootProps()} className="dropDiv">
      <input {...getInputProps()} />
      <p className="pictureName">{str}</p>
      <ul className="pictureName">{files}</ul>
    </div>
  );
};

export default DropPicture;
