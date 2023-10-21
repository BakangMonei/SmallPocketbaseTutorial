import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PocketBase from 'pocketbase';

function App() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [uploadedFileLink, setUploadedFileLink] = useState('');

  const handleUpload = async () => {
    const fileInput = document.getElementById('file');
    const formData = new FormData();

    for (let file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('title', 'Hello world!');

    try {
      const createdRecord = await pb.collection('testfile').create(formData);
      const fileId = createdRecord.id; // Assuming the ID is used in the URL

      // Generate the link to the uploaded file
      const fileLink = `http://127.0.0.1:8090/${fileId}`;
      setUploadedFileLink(fileLink); // Update the state to display in the UI
      console.log('Record created successfully:', createdRecord);
      console.log('Uploaded file link:', fileLink);

      // Update the record with the fileUrl
      const updatedRecord = await pb.collection('testfile').update(createdRecord.id, {
        fileUrl: fileLink,
      });

      console.log('Record updated with fileUrl:', updatedRecord);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <div className=''>
      <input type='file' id='file' className='input-file' />
      <button className='bg-red-500 border rounded-md text-black' onClick={handleUpload}>
        Upload
      </button>
      {uploadedFileLink && (
        <div>
          <p>Uploaded File Link:</p>
          <a href={uploadedFileLink} target="_blank" rel="noopener noreferrer">
            {uploadedFileLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
