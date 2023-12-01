import * as fs from 'fs';

interface TextToNumberDictionary {
    [key: string]: number;
}

class TrebuchetCalibrator {

    private foundNumbers: number[] = [];
    private textToNumberDictionary: TextToNumberDictionary = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    };

    public getFoundNumbers(): number[] {
        return this.foundNumbers;
    }

    public async prepareCalibrationValues(filePath: string): Promise<void> {
        const readStream = fs.readFileSync(filePath, 'utf8');
        const rl: string[] = readStream.split('\n');
        let count: number = 0;
        console.log({total: rl.length});
        for (const line of rl) {
            const lineNumbers: number[] = this.extractDigitsFromString(line);
            // const lineNumbers: number[] = this.extractDigitsFromString(convertedLine);
           // console.log({lineNumbers})
           
            const firstDigit = lineNumbers[0];
            const lastDigit = lineNumbers[lineNumbers.length - 1]; 
            console.log(++count);
            this.foundNumbers.push(Number(`${firstDigit}${lastDigit}`));
            // console.log({ firstDigit, lastDigit });
            
        }
    
        console.log('File reading complete.');
    }
    

    public getCalibration(numbers: number[]): number {
        let sum: number = 0;
        for (const n of numbers) {
            sum += n;
        }
        return sum;
    }

    // part 2.
    private extractDigitsFromString(line: string): number[] {
        const digits: number[] = [];
        let i = 0;
        let word = '';
    
        while (i < line.length) {
            if (isNaN(Number(line[i]))) {
                word += line[i];
                for (const key of Object.keys(this.textToNumberDictionary)) {
                    if (word.toLowerCase().endsWith(key.toLowerCase())) {
                        digits.push(this.textToNumberDictionary[key]);
                        word = '';
                        i--;
                        break;
                    }
                }
            } else {
                digits.push(Number(line[i]));
            }
            i++;
        }
    
        return digits;
    }
    
}

async function run() {
    const tc: TrebuchetCalibrator = new TrebuchetCalibrator();
    // await tc.prepareCalibrationValues('./src/Day_1/calibration-file.txt');
    await tc.prepareCalibrationValues('./src/Day_1/input.txt');
    console.log(
        'Calibration:', 
        tc.getCalibration(tc.getFoundNumbers())
    );
}

run();
