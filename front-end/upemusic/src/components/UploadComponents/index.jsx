import './style.css'
import api from "../../services/api";

export const UploadComponents = () => {
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await api.post("/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form method='post' encType='multipart/form-data' onSubmit={handleUpload} className="form">
        <input type="file" name="file" className='Button' />
        <input type="submit" value="upload" className='Button' />
      </form>
    </div>
  );
};
