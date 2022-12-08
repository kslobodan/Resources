import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { Resource } from "../interfaces";
import "./ResourceList.css";

interface ResourceListProps {
  resources: Resource[];
  onResourceDelete: (_id: string) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  onResourceDelete,
}) => {
  const [startWithCharacters, setStartWithCharacters] = useState("");
  const startsWithRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [resourcesToShow, setResourcesToShow] = useState<Resource[]>([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    setResourcesToShow(
      resources
        .slice(firstPostIndex, lastPostIndex)
        .filter((re) =>
          startWithCharacters && startWithCharacters.length > 2
            ? re.value.startsWith(startWithCharacters)
            : re.value.startsWith("")
        )
    );
  }, [currentPage, startWithCharacters, resources]);

  const changeList = () => {};

  const handleStartsWith = () => {
    const text = startsWithRef.current!.value;
    setStartWithCharacters(text);
    changeList();
  };

  const notFound =
    resourcesToShow.filter((res) => res.value.startsWith(startWithCharacters))
      .length > 0;

  return (
    <Fragment>
      <div>
        <input
          type="text"
          ref={startsWithRef}
          placeholder="Starts with..."
          style={{ width: 150 + "px", margin: 10 + "px" }}
          onChange={handleStartsWith}
        />
      </div>
      <ul>
        {notFound &&
          resourcesToShow.map((res) => (
            <li key={res._id}>
              <span>{res.value}</span>
              <button onClick={onResourceDelete.bind(null, res._id)}>
                Delete
              </button>
            </li>
          ))}

        {!notFound && (
          <li key="NotFound">
            <span>Resource not found</span>
          </li>
        )}
      </ul>
      <Link
        to={{
          pathname: `/resources/new`,
        }}
      >
        <NewButton></NewButton>
      </Link>
      <Pagination
        totalPosts={
          resources.filter((res) => res.value.startsWith(startWithCharacters))
            .length
        }
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Fragment>
  );
};

export default ResourceList;

function NewButton() {
  return <button>Create new</button>;
}
