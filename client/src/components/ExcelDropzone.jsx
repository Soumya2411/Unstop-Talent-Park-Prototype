import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import QuestionsList from './QuestionList';

const ExcelFileDropzone = ({socket,room}) => {
  const [excelData, setExcelData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.xlsx, .xls' });

  return (
    <div>
      {!excelData && <div {...getRootProps()} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>}
      {excelData && (
        <div>
          <QuestionsList questions={excelData} socket={socket} room={room}/>
        </div>
      )}
    </div>
  );
};

export default ExcelFileDropzone;
