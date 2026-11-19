import { StateGraph } from "@langchain/langgraph";
import { RoadmapState } from "../states/roadmap.state.js";
import resourceAgent from "../agents/resource.agent.js";
import roadmapAgent from "../agents/roadmap.agent.js";


const START="__start__";
const END="__end__";


const graph = new StateGraph(RoadmapState)
    .addNode("roadmapAgent", roadmapAgent)
    .addNode("resourceAgent", resourceAgent)
    .addEdge(START, "roadmapAgent")
    .addEdge("roadmapAgent","resourceAgent")
    .addEdge("resourceAgent", END)
    .compile();

export default graph;



