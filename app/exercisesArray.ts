import exerciseData from "./components/exerciseData";

const exerciseArray: exerciseData[] = [
    //Legs
    {
      parentID: "100",
      exerciseID: '201',
      name: "RDL",
      sets: 3,
      targetReps: 12,
      weight: "Plate 30",
      restTime: "03:00",
      marked: false,
    },
    {
      parentID: "100",
      exerciseID: '202',
      name: "Leg Extension",
      sets: 3,
      targetReps: 10,
      weight: "200",
      restTime: "02:00",
      marked: false,
    },
    {
      parentID: "100",
      exerciseID: '203',
      name: "Calves (Machine)",
      sets: 3,
      targetReps: 12,
      weight: "250",
      restTime: "02:00",
      marked: false,
    },
    {
      parentID: "100",
      exerciseID: '204',
      name: "Seated Leg Curl (One Leg)",
      sets: 3,
      targetReps: 12,
      weight: "90",
      restTime: "03:00",
      marked: false,
    },
    {
      parentID: "100",
      exerciseID: '205',
      name: "Leg Press (Single Leg)",
      sets: 3,
      targetReps: 12,
      weight: "2 Plate + 20",
      restTime: "03:00",
      marked: false,
    },

]
export default exerciseArray;