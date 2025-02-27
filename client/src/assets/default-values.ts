import { Edge } from "../CommonTypes";

export const DEFAULT_NODES_1 = (center: { x: number; y: number }) => {
    return {
        "0": {
            init: { x: 150 + center.x, y: 125 + center.y },
            x: 0,
            y: 0,
        },
        "1": {
            init: { x: 150 + center.x, y: 225 + center.y },
            x: 0,
            y: 0,
        },
        "2": {
            init: { x: 250 + center.x, y: 300 + center.y },
            x: 0,
            y: 0,
        },
        "3": {
            init: { x: 250 + center.x, y: 125 + center.y },
            x: 0,
            y: 0,
        },
        "4": {
            init: { x: 250 + center.x, y: 225 + center.y },
            x: 0,
            y: 0,
        },
        "5": {
            init: { x: 350 + center.x, y: 225 + center.y },
            x: 0,
            y: 0,
        },
        "6": {
            init: { x: 450 + center.x, y: 225 + center.y },
            x: 0,
            y: 0,
        },
        "7": {
            init: { x: 450 + center.x, y: 125 + center.y },
            x: 0,
            y: 0,
        },
        "8": {
            init: { x: 350 + center.x, y: 125 + center.y },
            x: 0,
            y: 0,
        },
        "9": {
            init: { x: 300 + center.x, y: 25 + center.y },
            x: 0,
            y: 0,
        },
        "10": {
            init: { x: 350 + center.x, y: 300 + center.y },
            x: 0,
            y: 0,
        },
    };
};

export const DEFAULT_EDGES_1: Edge[] = [
    { n1: "0", n2: "1" },
    { n1: "0", n2: "3" },
    { n1: "0", n2: "5" },
    { n1: "1", n2: "2" },
    { n1: "1", n2: "4" },
    { n1: "1", n2: "8" },
    { n1: "2", n2: "6" },
    { n1: "2", n2: "10" },
    { n1: "3", n2: "5" },
    { n1: "3", n2: "9" },
    { n1: "4", n2: "5" },
    { n1: "6", n2: "7" },
    { n1: "7", n2: "8" },
    { n1: "8", n2: "9" },
];
