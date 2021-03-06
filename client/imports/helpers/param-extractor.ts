import {ParamSet} from "../../../both/models/paramSet";
import {TrainingSet} from "../../../both/models/trainingSet";
import {Flag} from "../../../both/models/flag";

export class ParamExtractor {

    /**
     * This function takes an input string and converts it into a ParamSet array. If the string matches the criteria
     * the param name and value are separated and put into the result array.
     * @param {string} input The input string
     * @returns {ParamSet[]} The array of found paramSets
     */
    public static searchForParams(input: string): ParamSet[] {
        let splitByMinus;
        splitByMinus = input.split('-');
        return ParamExtractor.separateParamFromValue(splitByMinus);
    }

    /**
     * This function takes an input array of strings and separates them into TrainingSets.
     * It should be used for searching for results in a string array.
     * One string of the input array should be one epoch with comma separated trainingSets.
     * @param {string[]} input ConfigResults
     * @returns {TrainingSet[]} Found TrainingSets
     */
    public static searchForTrainingSets(input: string[]): TrainingSet[] {
        if (input.length == 0) {
            return [];
        }
        //get rid of the last epoch if empty
        if (input[input.length - 1] == "") {
            input.splice(input.length -1, 1);
        }
        let trainingSets : TrainingSet[] = [];
        //get the amount of trainingSets by example of the first line
        let splitToSets = input[0].split(',');
        let trainingSetCount = splitToSets.length;
        //get rid of empty set (caused by comma at the end of a line, etc)
        if ((splitToSets[trainingSetCount -1].length === 1 && splitToSets[trainingSetCount -1].match("[\\n\\r]+")) || splitToSets[trainingSetCount -1] === "") {
            trainingSetCount--;
        }
        //test if first row contains alphabetical characters, if so use as names for sets
        let customSetNames = input[0].match('[A-Za-z]');

        //add empty trainingSets
        for (let j = 0; j < trainingSetCount; j++) {
            let setName = customSetNames ? splitToSets[j] : '';
            trainingSets.push(new TrainingSet(setName));
        }

        //omit first row if it contains names for the sets
        if (customSetNames) {
            input.shift();
        }

        //add the input to the trainingSets
        input.forEach((currentEpoch) => {
            //split an epoch to the trainingSets and insert them
            let splitEpoch = currentEpoch.split(',');
            for (let i = 0; i < trainingSetCount; i++) {
                // + operator converts to number
                trainingSets[i].addEpoch(+splitEpoch[i]);
            }
        });
        return trainingSets;
    }

    /**
     * Tries to extract flags of a file
     * @param {string} input
     * @returns {Flag[]}
     */
    public static extractFlags(input: string) : Flag[] {
        let result = [];
        let splitLines = input.split("\n");
        splitLines.forEach((line) => {
            let separator = '';
            if (line.indexOf('=') != -1) {
                separator = "=";
            } else if (line.indexOf(':') != -1) {
                separator = ":";
            } else {
                return [];
            }
            line = line.replace(/\s/g, '');
            let flag = new Flag(line.split(separator)[1], line.split(separator)[0]);
            flag.meaning = flag.meaning.split(".").pop();
            result.push(flag);
        });
        return result;
    }

    /**
     * This function splits the param names from their values and returns an array of ParamSets
     * @param {string[]} input
     * @returns {Array}
     */
    private static separateParamFromValue(input: string[]) : ParamSet[] {
        let result : ParamSet[] = [];
        input.forEach(function (str) {
            if (str.length > 0) {
                let splitted = str.split(' ');
                if (splitted.length > 1) {
                    let param = splitted[0];
                    let value = splitted[1];
                    if (param.length > 0) {
                        result.push(new ParamSet(param, value));
                    }
                }
            }
        });
        return result;
    }
}