import React, { useState } from "react";
import "./Upload.css";
import { storage, db } from "../firebase";
import { useStateValue } from "../StateProvider";

function Upload() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [information, setInformation] = useState({
    id: 0,
    title: "",
    price: 0,
    rating: 0,
    image: "",
  });

  console.log("user>>>", user);

  /* const handleChange = (e) => {
    console.log("evento>>>>", e);
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("uploaded file");
    });
  }; */

  const onSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const id = Math.random();
      const title = e.target.title.value;
      const rating = parseFloat(e.target.rating.value);
      const price = parseFloat(e.target.price.value);
      const file = e.target.imagenes.files[0];

      const storageRef = storage.ref();
      const uploadTask = storageRef.child(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              //subir articulo
              db.collection("products")
                .doc(`article ${id}`)
                .set({
                  id: id,
                  title: title,
                  price: price,
                  rating: rating,
                  image: url,
                  user: user.email,
                })
                .then(() => {
                  console.log("document written");
                })
                .catch((error) => {
                  console.log("error>>", error);
                });
            });
        }
      );
    } else {
      alert("Please log-in");
    }
  };

  return (
    <div className="upload">
      <>Subir imagenes</>
      <form onSubmit={onSubmit}>
        <input type="file" name="imagenes" />
        <input type="text" placeholder="title" name="title" />
        <input type="number" placeholder="rating" name="rating" />
        <input type="number" placeholder="price" name="price" step="0.01" />
        <button>submit</button>
        <p>{`titulo: ${information.title}-
        precio: ${information.price}-
        url: ${information.image}
        `}</p>
      </form>
    </div>
  );
}

export default Upload;
