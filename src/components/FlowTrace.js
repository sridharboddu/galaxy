import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
function FlowTrace() {
  const [file, setFile] = useState(null);
  const [uploadFileData, setUploadFileData] = useState([]);
  console.log(uploadFileData, "uploadFileData....");
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // for (var x = 0; x < file.length; x++) {
      data.append("file", file);
    // }
    console.log(data, "data......");
    await axios
      .post("http://localhost:8000/upload", data)
      .then((res) => {
        console.log(res.data, "post data....");
        setUploadFileData(res.data);
      })

      .catch((err) => {
        console.log(err, "Error....");
      });
  };

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    await axios.get("http://localhost:8000/upload").then((res) => {
      console.log(res, "fetch data....");
    });
  };

  return (
    <div>
      <Header />
      <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 text-white">Flow Trace</span>
        </div>
      </nav>
      <div class="d-flex flex-row bd-highlight mb-3">
        <div class=" flex-row  p-2 bd-highlight justify-content-start">
          <label for="validationCustom02" class="form-label">
            Select File :
          </label>
          <input
            type="file"
            class="form-control"
            id="validationCustom02"
            // name="file"
            multiple
            onChange={onFileChange}
          />
          <button
            class="btn btn-primary"
            //   type="submit"
            onClick={onSubmit}
          >
            Submit form
          </button>
        </div>
        <div class="p-2 bd-highlight"></div>
        <div class="p-2 bd-highlight justify-content-end">
        <button
            class="btn btn-primary"
            //   type="submit"
            // onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </div>
      <div class="p-2 bd-highlight">
        {/* <img src={item.filepath} class="img-fluid" alt="..." /> */}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlowTrace;
