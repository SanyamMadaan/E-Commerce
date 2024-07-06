import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function  AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  //this function will convert our local image file to cloudinary link so that we can save it in database
  const UploadFile = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", 'images_preset');

    try {
      let cloudName = "dv3vxqkwd";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data; // Change source_url to secure_url
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  }

  const saveProduct = async (e) => {
    e.preventDefault();
    const ImageUrl = await UploadFile(); // Get Cloudinary image link
    console.log(ImageUrl);
    const token = localStorage.getItem("adminToken");
    try {
      const res=await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/`,
        {
          name,
          price,
          description,
          ImageURL:ImageUrl
        },
        {
          headers: {
            token: token,
          },
        }
      );
      const ProductId=res.data._id;
      alert("Congratulations!! Product ADDED Successfully");
      navigate("/admindashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error while adding Product");
    }
  };

  return (
    <div className="flex flex-col items-center bg-black h-screen">
      <h1 className="text-3xl font-semibold mb-5 text-white">Add New Product</h1>
      <form
        onSubmit={saveProduct}
        className="bg-white border border-gray-300 rounded-lg p-6 w-96"
      >
        <div className="mb-4">
          <label
            htmlFor="Product Name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Image
          </label>
          <input
            id="file-upload"
            name="file"
            type="file"
            accept=".jpeg,.png,.jpg"
            className="border border-gray-300 rounded-lg p-3 w-full"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            Add PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}
