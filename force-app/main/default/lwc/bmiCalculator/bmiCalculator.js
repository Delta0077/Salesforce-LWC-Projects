import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    height = '';
    weight = '';
    bmiValue = '';
    result = '';
    
    inputHandler(event) {
        const { name, value } = event.target;
        if (name === 'height') {
            this.height = value;
        }
        if (name === 'weight') {
            this.weight = value;
        }
    }

    submitHandler(event) {
        event.preventDefault();
        console.log('Height: ', this.height);
        console.log('Weight: ', this.weight);
        this.calculateBMI();
    }

    calculateBMI() {
        // BMI = weight (kg) / (height (m) * height (m))
        const heightInM = Number(this.height) / 100;
        const bmi = Number(this.weight) / (heightInM * heightInM);
        this.bmiValue = Number(bmi.toFixed(2));
        console.log('BMI: ', this.bmiValue);
    

        if(this.bmiValue < 18.5) {
            this.result = 'Underweight';
        }   else if(this.bmiValue >= 18.5 && this.bmiValue <= 24.9) {
            this.result = 'Healthy weight range';
        }   else if(this.bmiValue >= 25 && this.bmiValue <= 29.9) {
            this.result = 'Overweight';
        }
        else {
            this.result = 'Obese';
        }
        
        console.log('Result: ', this.result);
        return bmi;
    }
    recalculateHandler() {
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
        this.result = '';
    }
}