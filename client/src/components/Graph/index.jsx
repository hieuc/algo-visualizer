/**
 * Handle the display of a graph.
 * props:
 *      - width? (Number): width of svg container
 *      - height? (Number): height of svg container
 */

import "./Graph.css";
import { randInt, copyObject } from "../../utilities/utilities";
import Draggable from "react-draggable";
import { useState } from "react";

// default values for variables
const NODES = [
    { init: { x: 60, y: 50 }, x: 0, y: 0 },
    { init: { x: 150, y: 90 }, x: 0, y: 0 },
    { init: { x: 340, y: 90 }, x: 0, y: 0 },
    { init: { x: 50, y: 240 }, x: 0, y: 0 },
];

const EDGES = [
    { n1: 0, n2: 1, weight: randInt(1, 100) },
    { n1: 1, n2: 2, weight: randInt(1, 100) },
    { n1: 1, n2: 3, weight: randInt(1, 100) },
];

const DEFAULT_WIDTH = 700;
const DEFAULT_HEIGHT = 500;
const NODE_RADIUS = 18;
const EDGE_WIDTH = 2;

// ----------------------------------------------

// helper functions independent of the component
const getEdgeTextStyle = (n1, n2) => {
    let first = undefined;
    let second = undefined;

    if (n1.x < n2.x) {
        first = n1;
        second = n2;
    } else {
        first = n2;
        second = n1;
    }

    let dominantBaseline =
        first.y > second.y ? "text-before-edge" : "text-after-edge";
    let style =
        first.x > second.x ? { textAnchor: "end" } : { textAnchor: "start" };

    return [dominantBaseline, style];
};
// ----------------------------------------------

// component
const Graph = (props) => {
    const [nodes, setNodes] = useState(NODES);
    const [edges, setEdges] = useState(EDGES);
    const [activeNode, setActiveNode] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // relative to svg element
    const [weightInputState, setWeightInputState] = useState({
        show: false,
        x: 0,
        y: 0,
        target: null,
    });
    // when drag stop, an onclick event follows
    // and it messes up with the click to connect function
    // keeping a dragging flag to distinguish the normal click
    // and the click after a drag
    const [isDragging, setisDragging] = useState(false);

    const addNode = (initX, initY) => {
        let newNode = { init: { x: initX, y: initY }, x: 0, y: 0 };
        setNodes([...nodes, newNode]);
    };

    const removeNode = (node) => {
        // remove the node and any edges connected with it
        let copy = copyObject(nodes);
        let edgesToRemove = [];

        // node at target index is set to null as a deletion
        // all other node indexes are kept the same
        let nodeIndex = nodes.indexOf(node);
        copy[nodeIndex] = null;
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].n1 === nodeIndex || edges[i].n2 === nodeIndex) {
                edgesToRemove.push(i);
            }
        }

        setNodes(copy);
        removeEdges(edgesToRemove);
    };

    /**
     * Remove edges.
     *
     * @param {Array} edgesToRemove array of edges (index) to remove
     */
    const removeEdges = (edgesToRemove) => {
        let copy = [];
        for (let i = 0; i < edges.length; i++) {
            if (!edgesToRemove.includes(i)) {
                copy.push(edges[i]);
            }
        }
        setEdges(copy);
    };

    /**
     *
     * @param {Number} n1 index of node 1
     * @param {Number} n2 index of node 2
     * @param {Number} weight
     */
    const addEdge = (n1, n2, weight) => {
        // check if trying to add edge to the same node
        if (n1 === n2) return;
        // check if edge already exist
        for (const edge of edges) {
            if (
                (edge.n1 === n1 || edge.n2 === n1) &&
                (edge.n1 === n2 || edge.n2 === n2)
            )
                return;
        }
        setEdges([...edges, { n1, n2, weight }]);
    };

    const modifyEdgeValue = (index, value) => {
        let copy = copyObject(edges);
        copy[index].weight = value;
        setEdges(copy);
    };

    const hideWeightInputBox = () => {
        if (weightInputState.show)
            setWeightInputState({
                show: false,
                x: 0,
                y: 0,
                target: null,
            });
    };

    const calculateBound = (initPos) => {
        // bounds in format of Draggable object
        const width = props.width ? props.width : DEFAULT_WIDTH;
        const height = props.height ? props.height : DEFAULT_HEIGHT;
        const pad = NODE_RADIUS + 3; // depends on node radius
        return {
            top: 0 - initPos.y + pad,
            left: 0 - initPos.x + pad,
            bottom: height - initPos.y - pad,
            right: width - initPos.x - pad,
        };
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}`}
                width={props.width ? props.width : DEFAULT_WIDTH}
                height={props.height ? props.height : DEFAULT_HEIGHT}
                style={{ overflow: "inherit" }}
                onDoubleClick={(e) => {
                    addNode(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                }}
                onClick={(e) => {
                    hideWeightInputBox();
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    hideWeightInputBox();
                    setActiveNode(null);
                }}
                onMouseMove={(e) => {
                    // could cause performance issue
                    setCursorPos({
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY,
                    });
                }}
                className="graph-canvas"
            >
                <g className="edges">
                    {edges.map((edge, index) => {
                        try {
                            let x1 = nodes[edge.n1].init.x + nodes[edge.n1].x;
                            let y1 = nodes[edge.n1].init.y + nodes[edge.n1].y;
                            let x2 = nodes[edge.n2].init.x + nodes[edge.n2].x;
                            let y2 = nodes[edge.n2].init.y + nodes[edge.n2].y;
                            let [dominantBaseline, style] = getEdgeTextStyle(
                                { x: x1, y: y1 },
                                { x: x2, y: y2 }
                            );

                            return (
                                <g
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        setWeightInputState({
                                            show: true,
                                            x: e.clientX,
                                            y: e.clientY,
                                            target: index,
                                        });
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        hideWeightInputBox();
                                    }}
                                    onContextMenu={(e) => {
                                        removeEdges([index]);
                                    }}
                                    key={"e" + index}
                                >
                                    <line
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="#413939"
                                        strokeWidth={EDGE_WIDTH}
                                        key={"e " + index}
                                    />
                                    <text
                                        x={(x1 + x2) / 2}
                                        y={(y1 + y2) / 2}
                                        className="noselect"
                                        dominantBaseline={dominantBaseline}
                                        style={style}
                                    >
                                        {edge.weight}
                                    </text>
                                </g>
                            );
                        } catch (e) {
                            console.log(e);
                        }
                        return null;
                    })}
                    {
                        //extra line
                        activeNode != null ? (
                            <line
                                x1={
                                    nodes[activeNode].init.x +
                                    nodes[activeNode].x
                                }
                                y1={
                                    nodes[activeNode].init.y +
                                    nodes[activeNode].y
                                }
                                x2={cursorPos.x}
                                y2={cursorPos.y}
                                stroke="#413939"
                                strokeWidth="2"
                                key={"dynamic-edge"}
                            />
                        ) : null
                    }
                </g>
                <g className="nodes">
                    {nodes.map((node, index) => {
                        return node != null ? (
                            <Draggable
                                onDrag={(e, data) => {
                                    hideWeightInputBox();
                                    if (!isDragging) setisDragging(true);
                                    let copy = copyObject(nodes);
                                    copy[index] = {
                                        ...nodes[index],
                                        x: data.x,
                                        y: data.y,
                                    };
                                    setNodes(copy);
                                }}
                                onStop={() => {
                                    // set draggin to false after 50ms
                                    // onStop is called before onClick so a delay is necessary
                                    setTimeout(() => {
                                        setisDragging(false);
                                    }, 50);
                                }}
                                key={"n" + index}
                                position={{
                                    x: nodes[index].x,
                                    y: nodes[index].y,
                                }}
                                // to make connecting nodes smoother
                                disabled={activeNode != null ? true : false}
                                bounds={calculateBound(node.init)}
                            >
                                <g
                                    id={index}
                                    fill="#A020F0"
                                    className="node"
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        hideWeightInputBox();
                                        if (!isDragging)
                                            if (activeNode === null) {
                                                setActiveNode(index);
                                            } else {
                                                // add edge when connecting two nodes
                                                addEdge(
                                                    index,
                                                    activeNode,
                                                    randInt(1, 100)
                                                );
                                                setActiveNode(null);
                                            }
                                    }}
                                    onContextMenu={(e) => {
                                        removeNode(node);
                                    }}
                                >
                                    <circle
                                        cx={node.init.x}
                                        cy={node.init.y}
                                        r={NODE_RADIUS}
                                        className={
                                            index === activeNode
                                                ? "active-node"
                                                : ""
                                        }
                                    />
                                    <text
                                        x={node.init.x}
                                        y={node.init.y}
                                        textAnchor="middle"
                                        alignmentBaseline="middle"
                                        className="noselect"
                                        dy="0.1em"
                                    >
                                        {index}
                                    </text>
                                </g>
                            </Draggable>
                        ) : null;
                    })}
                </g>
            </svg>
            {weightInputState.show ? (
                <input
                    type="number"
                    className="weight-input"
                    value={
                        weightInputState.target != null
                            ? edges[weightInputState.target].weight
                            : ""
                    }
                    style={{
                        left: `${weightInputState.x - 24}px`,
                        top: `${weightInputState.y - 12}px`,
                    }}
                    onChange={(e) => {
                        if (
                            weightInputState.target != null &&
                            // limit input length
                            e.target.value.length < 5
                        ) {
                            modifyEdgeValue(
                                weightInputState.target,
                                e.target.value
                            );
                        }
                    }}
                    autoFocus
                />
            ) : null}
        </>
    );
};

export default Graph;
