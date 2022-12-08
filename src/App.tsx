import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NewResource from "./components/NewResource";
import ResourceDetail from "./components/ResourceDetail";
import ResourceList from "./components/ResourceList";
import { useSelector } from "react-redux";
import { Resource } from "./interfaces";

const API = "https://crudcrud.com/api/238591fc687a47daba8db7cec1ce5eff/";

interface ResourceState {
  resources: Resource[];
}

const getResources = () => {
  return axios
    .get(API + "resource")
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

const postResource = (value: string) => {
  const resource = {
    value: value,
  };

  return axios.post(API + "resource", resource).then(function (response) {
    console.log(response);
  });
};

const deleteResource = (resource_id: string) => {
  return axios
    .delete(API + "resource/" + resource_id)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const App: React.FC = () => {
  const [resourceData, setResourceData] = useState([]);
  const [addedNewResource, setAddedNewResource] = useState(false);

  useEffect(() => {
    getResources().then((newData) => {
      setResourceData(newData);
      setAddedNewResource(false);
    });
  }, [addedNewResource]);

  const onAddResourceHandler = (value: string) => {
    postResource(value);
    setAddedNewResource(true);
  };

  const onResourceDeleteHandler = (_id: string) => {
    deleteResource(_id);
    setAddedNewResource(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/resources" />} />
        <Route
          path="/resources"
          element={
            <ResourceList
              resources={resourceData}
              onResourceDelete={onResourceDeleteHandler}
            />
          }
        />

        <Route
          path="/resources/new"
          element={<NewResource onAddResource={onAddResourceHandler} />}
        />

        <Route path="/resources/:id" element={<ResourceDetail />} />
      </Routes>
    </div>
  );
};

export default App;
