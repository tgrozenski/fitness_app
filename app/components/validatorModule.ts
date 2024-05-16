export module App {
    
    //Shared methods can go in this class
    export class validator {

        validateString(input: string): string {
            if(input.length > 30) {
                input = "Undefined"
                return input;
                }
            for(let i = 0; i < input.length; i++) {
                if (input.charCodeAt(i) > 126) {
                    input = "Try Again Please";
                    }
                }
                return input;
            }
        validateInt = (num: number): number => {
            if(num > 501) {
            return 0; 
                }
            else if(Number.isInteger(num)) {
                return num;
                }
            else {
                return 0;
                }
            }
        }

    }