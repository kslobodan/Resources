import { useEffect } from "react";
import { useState } from "react";
import { Resource } from "../interfaces";
import { API } from "../constants";
import axios from "axios";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [addedNewResource, setAddedNewResource] = useState(false);

  const getResources = () => {
    return axios
      .get(API + "resource")
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getResources().then((newData) => {
      setResources(newData);
      setAddedNewResource(false);
    });
  }, [addedNewResource]);

  const handleAddNewResource = (added: boolean) => {
    setAddedNewResource(added);
  };

  return { resources, handleAddNewResource };
};
