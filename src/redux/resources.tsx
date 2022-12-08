interface Resource {
  _id: string;
  value: string;
}

interface ResourceState {
  resources: Resource[];
}

const initialState = {
  resources: [],
};

type Action = { type: "SET_LIST"; payload: Resource[] };

export const resourcesReducer = (
  state: ResourceState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_LIST": {
      return { resources: action.payload };
    }
    default:
      return state;
  }
};
