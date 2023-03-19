import './style.css'
import api from "../../services/api";

export const UploadComponents = () => {
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const user = JSON.parse(localStorage.getItem("@Auth:user"))
      const response = await api.post(`/upload?userId=${user.id}`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Fazer verificação do arquivop .mp3
  return (
    <div className="container">
      <form method='post' encType='multipart/form-data' onSubmit={handleUpload} className="form">
        <input type="file" name="file" className='Button' accept="audio/mpeg" />
        <input type="submit" value="upload" className='Button' />
      </form>
    </div>
  );
};
