/**
 * Handle any controls UI for the page.
 * Currently includes: speed slider, build, play/pause, forward/backward, reset buttons
 */

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "./Controls.css";
import { useDispatch, useSelector } from "react-redux";
import AlgoFetcher from "../../apis/AlgoFetcher";
import {
    updateAlgorSteps,
    updateArray,
    updateStep,
} from "../../redux/stateSlice";
import useInterval from "../hooks/useInterval";

const Controls = (props) => {
    // global state variables we pull from redux store
    let currentStep = useSelector((state) => state.global.currentStep);
    const algorSteps = useSelector((state) => state.global.algorSteps);
    let array = useSelector((state) => state.global.array);

    // local state variables
    const [playSpeed, setSpeed] = useState(5);
    // a 'playing' flag is necessary since clearing play interval alone
    // does not trigger a component rerender
    const [playing, setPlaying] = useState(false);

    // saving a previous value for input box, for glowing animation of buttons
    const [prevInputValue, setPrevInputValue] = useState(props.inputValue);

    // miscellaneous variables
    const interval = 7500 / Math.sqrt(Math.pow(Math.E, playSpeed));
    const dispatch = useDispatch();

    // set up the loop for automatic play
    // only activates if the 'playing' variable is true
    useInterval(
        () => {
            stepForward();
        },
        playing ? interval : null
    );

    // step forward the algorithm, use for button
    const stepForward = () => {
        let newStep = Math.min(currentStep + 1, algorSteps.steps.length);
        if (newStep !== currentStep) {
            dispatch(
                updateStep({
                    prevStep: currentStep,
                    currentStep: newStep,
                })
            );
        } else {
            // at the of possible steps, just pause
            doPause();
        }
    };

    // step backward the algorithm
    const stepBackward = () => {
        let newStep = Math.max(currentStep - 1, 0);
        if (newStep !== currentStep) {
            dispatch(
                updateStep({
                    prevStep: currentStep,
                    currentStep: newStep,
                })
            );
            doPause();
        }
    };

    // request the backend to perform the algorithm
    // the parent page have the option to provide a custom doAlgorithm thru props
    // in that case we use that function instead of the default
    const doAlgorithm = props.doAlgorithm
        ? async (arr) => {
              // since the parent page doesnt have the doPause function, we just call it here
              doPause();
              props.doAlgorithm(arr);
              setPrevInputValue(props.inputValue);
          }
        : async (arr) => {
              // default function
              doPause();
              let input =
                  props.inputValue != null
                      ? parseInt(props.inputValue)
                      : arr[12];
              let data = { array: arr, target: input };

              try {
                  let response = await AlgoFetcher.post(
                      props.algorithmUrl,
                      data
                  );
                  dispatch(
                      updateAlgorSteps({
                          algorSteps: response.data.result,
                      })
                  );
                  setPrevInputValue(props.inputValue);
              } catch (err) {
                  console.log(err);
              }
          };

    // reset the current step back to 0
    const doReset = () => {
        dispatch(updateStep({ currentStep: 0, prevStep: -1 }));
        doPause();
    };

    /**
     * For the play button.
     *
     * Automatically increment the step at an interval.
     */
    const doPlay = () => {
        // restart the current step if the user press play at last step
        if (currentStep === algorSteps.steps.length) {
            dispatch(updateStep({ currentStep: 0, prevStep: -1 }));
            //setPlaying(false);
        }

        if (currentStep < algorSteps.steps.length) {
            stepForward();
            setPlaying(true);
        }
    };

    // pause the algorithm if running
    const doPause = () => {
        setPlaying(false);
    };

    /**
     * For the speed slider.
     *
     * @param {*} speed parse from the slider element
     */
    const updateSpeed = (speed) => {
        speed = parseInt(speed);
        setSpeed(speed);
    };

    // do the algorithm once every time the page load
    useEffect(() => {
        let sorted = props.requestSortedArray
            ? props.requestSortedArray
            : false;
        // if the page request a sorted array (binary search)

        // this assignment will last for one render, to compensate for the
        // time it takes for redux to update the actual global array
        array = makeRandomArray(sorted);

        dispatch(updateArray(array));
        doAlgorithm(array);
    }, []);

    return (
        <React.Fragment>
            <div className="centered">
                {/* speed slider */}
                <div>
                    <label htmlFor="speed-slider">Speed:&nbsp;</label>
                    <input
                        id="speed-slider"
                        type="range"
                        min="2"
                        max="10"
                        defaultValue={5}
                        onChange={(e) => updateSpeed(e.target.value)}
                    ></input>
                </div>

                {/* wrapper for the buttons */}
                <div className="controls">
                    {/* build button that request the backend to perform algorithm */}
                    <button
                        className={
                            "btn" +
                            (props.inputValue !== prevInputValue
                                ? " glow-border"
                                : " disabled")
                        }
                        title="do algorithm"
                        onClick={() => doAlgorithm(array)}
                    >
                        <span>Build</span>
                        <FontAwesomeIcon icon="fa-wrench" className="fa" />
                    </button>

                    {/* play/pause button, conditioned by the 'playing' state */}
                    {playing ? (
                        <button
                            className="btn glow-border-anim"
                            onClick={doPause}
                        >
                            <span>Pause</span>
                            <FontAwesomeIcon icon="fa-pause" className="fa" />
                        </button>
                    ) : (
                        <button className="btn glow-border" onClick={doPlay}>
                            <span>Play</span>
                            <FontAwesomeIcon icon="fa-play" className="fa" />
                        </button>
                    )}

                    {/* step forward button */}
                    <button
                        className="btn"
                        title="step backward once"
                        onClick={stepBackward}
                    >
                        <span>Backward</span>
                        <FontAwesomeIcon
                            icon="fa-backward-step"
                            className="fa"
                        />
                    </button>

                    {/* step backward button */}
                    <button
                        className="btn"
                        title="step forward once"
                        onClick={stepForward}
                    >
                        <span>Forward</span>
                        <FontAwesomeIcon
                            icon="fa-forward-step"
                            className="fa"
                        />
                    </button>

                    {/* reset button: reset the current step to 0 */}
                    <button
                        className="btn"
                        title="restart algorithm"
                        onClick={doReset}
                    >
                        <span>Reset</span>
                        <FontAwesomeIcon icon="fa-rotate-left" className="fa" />
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

// return a random array of length 15, range 0-99, allows duplicate,
// and NOT sorted by default
const makeRandomArray = (sort = false, size = 15, max = 99) => {
    var rands = [];
    var result = [];
    while (rands.length < size) {
        var n = Math.floor(Math.random() * (max + 1));
        rands.push(n);
    }
    if (sort) rands.sort((a, b) => a - b);

    for (var i = 0; i < size; i++) {
        result.push(rands[i]);
    }
    return result;
};

export default Controls;
