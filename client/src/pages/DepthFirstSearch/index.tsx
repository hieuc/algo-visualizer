import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./DepthFirstSearch.css";
import Controls from "../../components/Controls";
import StepTracker from "../../components/StepTracker";
import Graph from "../../components/Graph";
import VisualizerContainer from "../../components/VisualizerContainer";
import { useSelector, useDispatch } from "react-redux";
import AlgorithmPopover from "../../components/AlgorithmPopover";
import { resetSteps, updateAlgorName } from "../../redux/stateSlice";
import { depthFirstSearchDesc } from "../../assets/algorithm-information.js";
import Stack from "../../components/Stack";

const ALGORITHM_URL = "searches/depthfirstsearch/";

const DepthFirstSearch = () => {
    const dispatch = useDispatch();
    // reset data upon exiting the page
    useEffect(() => {
        // update the name on first load
        dispatch(updateAlgorName(depthFirstSearchDesc.algorithm));

        return () => {
            dispatch(resetSteps());
        };
    }, []);

    const n = 2000;

    return (
        <div className="content">
            <div className="centered">
                <AlgorithmPopover data={depthFirstSearchDesc} />
            </div>

            <VisualizerContainer
                height="400"
                initPosition={{ x: -n / 3, y: -n / 3 }}
                staticChildren={<Stack />}
            >
                <Graph containerWidth={n} containerHeight={n} />
            </VisualizerContainer>

            <Controls algorithmUrl={ALGORITHM_URL} require={["graphInput"]} />
            <StepTracker />
        </div>
    );
};

export default DepthFirstSearch;
