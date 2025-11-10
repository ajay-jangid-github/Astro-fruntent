import React, { useState } from "react";
import { photoService } from "../../services/photoService";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      image: files ? files[0] : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formData.image) {
        alert('Please select an image to upload');
        return;
      }
      
      await photoService.uploadPhoto(formData.image);
      
      alert('✅ Photo uploaded successfully!');
      
      // Reset form
      setFormData({
        image: null,
      });
      
      // Reset file input
      document.querySelector('input[type="file"]').value = '';
      
      // Redirect to gallery page
      navigate('/dashboard/gallery');
    } catch (error) {
      console.error('Error uploading photo:', error);
      if (error.response?.status === 401) {
        alert('❌ Please login as admin to upload photos');
        navigate('/login');
      } else {
        alert('❌ Error uploading photo: ' + (error.response?.data?.msg || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
          📸 Add New Photo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Photo
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF (Max size: 5MB)
            </p>
          </div>
          
          {/* Preview */}
          {formData.image && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preview
              </label>
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Uploading Photo...' : 'Upload Photo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhoto;