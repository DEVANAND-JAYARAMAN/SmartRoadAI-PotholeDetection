import { useState, useRef } from 'react';
import { predictImage } from '../services/api';
import PredictionCard from './PredictionCard';
import './UploadSection.css';

export default function UploadSection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return setError('Please upload a valid image.');
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError('');
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onSubmit = async () => {
    if (!image) return setError('Please select an image first.');
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', image);
      const { data } = await predictImage(fd);
      setResult(data);
    } catch {
      setError('Failed to connect to backend. Make sure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2 className="section-title">Road Image Analysis</h2>
      <div
        className={`dropzone ${dragging ? 'active' : ''}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {preview ? (
          <img src={preview} alt="preview" className="preview-img" />
        ) : (
          <>
            <span className="drop-icon">📁</span>
            <p>Drag & drop a road image here</p>
            <span className="drop-sub">or click to browse</span>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} hidden />
      </div>

      {preview && (
        <button className="analyze-btn" onClick={onSubmit} disabled={loading}>
          {loading ? <span className="spinner" /> : '🔍 Analyze Road'}
        </button>
      )}

      {error && <p className="error-msg">{error}</p>}
      {result && <PredictionCard prediction={result.prediction} confidence={result.confidence} />}
    </div>
  );
}
