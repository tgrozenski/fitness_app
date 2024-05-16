import exerciseData from "./components/exerciseData";
import parentData from "./components/parentData";

declare global {

interface parent {
    title: string;
    id: string;
}
    var currentExercise: exerciseData | null;
    var lastParent: string;
    var lastParentId: string;
    var currentParent: parent;
    var gCount: number;

}
    

