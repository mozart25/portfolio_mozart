import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import UserService from "../services/UserService";
import Pagination from "@material-ui/lab/Pagination";
import TutorialDataService from "../services/TutorialService";

import { Link } from "react-router-dom";

import {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteAllTutorials,
} from "../actions/tutorials";

const TutorialsList = () => {

    const { user: currentUser } = useSelector(state => state.auth);

    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);


    const tutorials = useSelector(state => state.tutorials);

    const dispatch = useDispatch();


    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setIsAdmin(true);
            },
            (error) => {
                setIsAdmin(false);
            }
        );
    }, []);

    useEffect(() => {
        dispatch(retrieveTutorials());
    }, []);


    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const refreshData = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        dispatch(deleteAllTutorials())
            .then(response => {
                console.log(response);
                refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        refreshData();
        dispatch(findTutorialsByTitle(searchTitle));
    };
    if (!currentUser) {
        return <Redirect to="/register" />;
    }
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
            </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Portfolio List</h4>

                <ul className="list-group">
                    {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                </ul>
                {isAdmin &&
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={removeAllTutorials}
                    >
                        ?????? ????????????
                </button>}
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Project</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Skills:</strong>
                            </label>{" "}
                            {currentTutorial.skills}
                        </div>
                        <div>
                            <label>
                                <strong>Url:</strong>
                            </label>{" "}
                            <a href={currentTutorial.url}>
                                {currentTutorial.url}
                            </a>
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                        <div>
                            <label>
                                <strong>CreatedAt:</strong>
                            </label>{" "}
                            {currentTutorial.createdAt}
                        </div>
                        <div>
                            <label>
                                <strong>UpdatedAt:</strong>
                            </label>{" "}
                            {currentTutorial.updatedAt}
                        </div>
                        {isAdmin &&
                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                ????????????
            </Link>}
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>??????????????? ????????? ?????????!!</p>
                        </div>
                    )}
            </div>
        </div>
        // <div className="list row">
        //     <div className="col-md-8">
        //         <div className="input-group mb-3">
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 placeholder="Search by title"
        //                 value={searchTitle}
        //                 onChange={onChangeSearchTitle}
        //             />
        //             <div className="input-group-append">
        //                 <button
        //                     className="btn btn-outline-secondary"
        //                     type="button"
        //                     onClick={getTutorials}
        //                 >
        //                     Search
        //     </button>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-md-6">
        //         <h4>Tutorials List</h4>

        //         <div className="mt-3">
        //             {"Items per Page: "}
        //             <select onChange={handlePageSizeChange} value={pageSize}>
        //                 {pageSizes.map((size) => (
        //                     <option key={size} value={size}>
        //                         {size}
        //                     </option>
        //                 ))}
        //             </select>

        //             <Pagination
        //                 className="my-3"
        //                 count={count}
        //                 page={page}
        //                 siblingCount={1}
        //                 boundaryCount={1}
        //                 variant="outlined"
        //                 shape="rounded"
        //                 onChange={handlePageChange}
        //             />
        //         </div>

        //         <ul className="list-group">
        //             {tutorialss &&
        //                 tutorialss.map((tutorial, index) => (
        //                     <li
        //                         className={
        //                             "list-group-item " + (index === currentIndex ? "active" : "")
        //                         }
        //                         onClick={() => setActiveTutorial(tutorial, index)}
        //                         key={index}
        //                     >
        //                         {tutorial.title}
        //                     </li>
        //                 ))}
        //         </ul>

        //         <button
        //             className="m-3 btn btn-sm btn-danger"
        //             onClick={removeAllTutorials}
        //         >
        //             Remove All
        // </button>
        //     </div>
        //     <div className="col-md-6">
        //         {currentTutorial ? (
        //             <div>
        //                 <h4>Tutorial</h4>
        //                 <div>
        //                     <label>
        //                         <strong>Title:</strong>
        //                     </label>{" "}
        //                     {currentTutorial.title}
        //                 </div>
        //                 <div>
        //                     <label>
        //                         <strong>Description:</strong>
        //                     </label>{" "}
        //                     {currentTutorial.description}
        //                 </div>
        //                 <div>
        //                     <label>
        //                         <strong>Status:</strong>
        //                     </label>{" "}
        //                     {currentTutorial.published ? "Published" : "Pending"}
        //                 </div>

        //                 <Link
        //                     to={"/tutorials/" + currentTutorial.id}
        //                     className="badge badge-warning"
        //                 >
        //                     Edit
        //     </Link>
        //             </div>
        //         ) : (
        //                 <div>
        //                     <br />
        //                     <p>Please click on a Tutorial...</p>
        //                 </div>
        //             )}
        //     </div>
        // </div>
    );
};

export default TutorialsList;


