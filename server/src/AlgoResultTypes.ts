import { Edge } from "./CommonTypes";

type LinearSearchResultType = {
    steps: {
        element: number;
        description: string;
    }[];
    foundIndex: number;
    success: boolean;
    target: number;
};

type BinarySearchResultType = {
    steps: {
        step: number;
        l: number;
        r: number;
        description: string;
    }[];
    foundIndex: number;
    success: boolean;
    target: number;
};

type BubbleSortResultType = {
    steps: {
        array: number[];
        highlight: number[];
        sorted: number[];
        swapped: boolean;
        swapCount: number;
        description: string;
    }[];
};

type InsertionSortResultType = BubbleSortResultType;

type SelectionSortResultType = {
    steps: {
        array: number[];
        highlight: number[];
        sorted: number[];
        swapped: boolean;
        swapCount: number;
        min: number;
        description: string;
    }[];
};

type MergeSortResultType = {
    steps: {
        compareCount: number;
        description: string;
        highlight: number[];
        comparing: boolean;
        swapped: boolean;
        sorted: boolean;
        positions: {
            level: number;
            treePos: number;
            pos: number;
        }[];
    }[];
    compareCount: number;
};

type DepthFirstSearchResultType = {
    steps: {
        stack: { id: string; from: string }[];
        currentNode: string[];
        visitedNodes: string[];
        visitedEdges: Edge[];
        description: string;
    }[];
    traversalResult: string[];
    startNode: string;
};

type SearchAlgorithmResultType =
    | LinearSearchResultType
    | BinarySearchResultType
    | DepthFirstSearchResultType;

type SortAlgorithmResultType =
    | BubbleSortResultType
    | InsertionSortResultType
    | SelectionSortResultType
    | MergeSortResultType;

type AlgorithmResultType = SearchAlgorithmResultType | SortAlgorithmResultType;

export {
    LinearSearchResultType,
    BinarySearchResultType,
    BubbleSortResultType,
    InsertionSortResultType,
    SelectionSortResultType,
    MergeSortResultType,
    AlgorithmResultType,
    SearchAlgorithmResultType,
    SortAlgorithmResultType,
    DepthFirstSearchResultType,
};
