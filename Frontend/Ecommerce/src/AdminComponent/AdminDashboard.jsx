import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminDashboard() {
  const [listedProducts, setListedProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setListedProducts(response.data);
      console.log(listedProducts);
    } catch (e) {
      console.log(e);
    }
  };

  async function deleteProduct(id) {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          token,
        },
      });
      if (res.status == 200) {
        alert("Product Deleted Successfully");
      }
      getProducts();
    } catch (e) {
      console.log(e);
      console.log("error while deleting product");
    }
  }

  async function editProduct(id) {
    const productTobeEdit = await axios.get(
      `http://localhost:3000/products/${id}`
    );
    const previosProduct = productTobeEdit.data;

    const name = prompt("Enter Updated Name ", previosProduct.name);
    const price = prompt("Enter Updated Price ", previosProduct.price);
    const description = prompt(
      "Enter Updated description ",
      previosProduct.description
    );
    const image = prompt("Enter Updated image URL ", previosProduct.ImageURL);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(
        `http://localhost:3000/products/${id}`,
        {
          name,
          price,
          description,
          image,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (res.status == 200) {
        alert("Product Updated Successfully");
        getProducts();
      }
    } catch (e) {
      alert("error while updating Product");
      console.log("error while editing product");
      console.log(e);
    }
  }

  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div>
        <button
          className="fixed right-2 top-2 cursor-pointer bg-black text-white p-2"
          onClick={() => navigate("/addproduct")}
        >
          ADD PRODUCT
        </button>
      </div>
      {listedProducts.length > 0 ? (
        listedProducts.map((product) => (
          <div
            key={product._id}
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
          >
            <Card
              id={product._id}
              image={product.ImageURL}
              name={product.name}
              price={product.price}
              description={product.description}
              onDelete={deleteProduct}
              onEdit={editProduct}
            />
          </div>
        ))
      ) : (
        <div>No Listing has been done yet</div>
      )}
    </>
  );
}

function Card(props) {
  return (
    <div
      key={props.id}
      className="flex flex-col m-2 p-2 border-2 border-black rounded-md h-min-20"
    >
      <img className="w-60" src={props.image} />
      <hr />
      <h1 className="uppercase font-bold text-2xl">{props.name}</h1>
      <h1 className="font-semibold">₹{props.price}</h1>
      <p className="break-words">{props.description}</p>
      <div className="flex">
        <button
          className="bg-green-700 text-white p-2 w-1/6 cursor-pointer mt-2 m-3 rounded-md"
          onClick={() => {
            props.onEdit(props.id);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-700 text-white p-2 w-1/6 cursor-pointer mt-2 m-3 rounded-md"
          onClick={() => {
            props.onDelete(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
