import exerciseData from "./components/exerciseData";
import parentData from "./components/parentData";

declare global {

    var currentExercise: exerciseData | null;
    var lastParent: string;
    var lastParentId: string;
    var currentParent: parentData;
    var gCount: number;
    var appState: string;

}
    

