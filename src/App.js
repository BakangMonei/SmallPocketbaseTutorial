import React from 'react';
import logo from './logo.svg';
import './App.css';
import PocketBase from 'pocketbase';

function App() {
  // Move the PocketBase instance creation to the async function
  const pb = new PocketBase('http://127.0.0.1:8090');

  const handleUpload = async () => {
    const fileInput = document.getElementById('file');
    const formData = new FormData();

    for (let file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('title', 'Hello world!');

    try {
      const createdRecord = await pb.collection('testfile').create(formData);
      console.log('Record created successfully:', createdRecord);
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
    </div>
  );
}

export default App;