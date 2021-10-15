/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace drawRobot {
    // witdth of car in m
    let halveCarWidth = 0.25;
    //max drive Speed in m/s
    let maxSpeed = 0.4;
    //speed of the Chalk 0.2 m/s
    let chalkSpeed = 0.15;
    //left Pull 6.5
    export let leftPull = 6;
    //right Pull
    export let rightPull = 0;
    let angleTimeMatcher = 0.4;


    let stop = false;
    let stoped = false;
    let isStraight = false;
    let rampUpFinished = false;
    let steerLeft = false;
    let steerRight = false;

    //%block="Drive(Radio Group: $radioGroup )"
    export function drive(radioGroup: number,path: () => void) {
        radio.setGroup(radioGroup);
        radio.onReceivedString(receivedString => {
            if (receivedString == "stop") {
                stop = !stop;
                stoped = true;
            }
            if (receivedString == "left") {
                steerLeft = true;
            }
            if (receivedString == "right") {
                steerRight = true;
            }
        })
        path();
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
        basic.showIcon(IconNames.Skull);
    }

    //%block="Left(Angle: $angle °, Radius:  $cmradius cm)"
    //% angle.min=1 angle.max=360 angle.defl=90
    //% cmradius.min=10 cmradius.max=1000 cmradius.defl=10
    export function left(angle: number, cmradius: number) {
        let radius = cmradius / 100;
        let innerRadius = radius - halveCarWidth;
        let outerRadius = radius + halveCarWidth;
        let outerPath = getPath(outerRadius, angle);
        let innerPath = getPath(innerRadius, angle);
        let chalkpath = getPath(radius, angle);
        let time = driveTime(chalkpath);
        let mChalkpath = getPath(radius, angle * angleTimeMatcher)
        let matchedTime = driveTime(mChalkpath);
        let leftPercent = getPercent(innerPath, time) - leftPull;
        let rightPercent = getPercent(outerPath, time);
        isStraight = false;
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block="Right(Angle: $angle °, Radius $cmradius cm)"
    //% angle.min=1 angle.max=360 angle.defl=90
    //% cmradius.min=10 cmradius.max=1000 cmradius.defl=10
    export function right(angle: number, cmradius: number) {
        let radius = cmradius / 100;
        let innerRadius = radius - halveCarWidth;
        let outerRadius = radius + halveCarWidth;
        let outerPath = getPath(outerRadius, angle);
        let innerPath = getPath(innerRadius, angle);
        let chalkpath = getPath(radius, angle);
        let time = driveTime(chalkpath);
        let mChalkpath = getPath(radius, angle * angleTimeMatcher)
        let matchedTime = driveTime(mChalkpath);
        let leftPercent = getPercent(innerPath, time) - leftPull;
        let rightPercent = getPercent(outerPath, time);
        isStraight = false;
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block="Straight ahead(Time: $time sec)"
    //% time.min=0 time.max=60 time.defl=1
    export function straight(time: number) {
        isStraight = true;
        driveChekStopAndConfig(time, 100 - leftPull, 100 - rightPull);
    }

    function getPath(radius: number, angle: number): number {
        let circumference = 2 * Math.PI * radius;
        let sector = angle / 360;
        let sectorLength = circumference * sector
        return sectorLength;
    }

    function getPercent(path: number, time: number) {
        let speed = path / time;
        let percent = (speed * 100) / maxSpeed;
        return percent;
    }

    function driveTime(path: number): number {
        let time = path / chalkSpeed;
        return time;
    }
    function getRampupStep(motorToChek: number, checkerMotor: number){
        let rampUpStep = 0;
        if(motorToChek>checkerMotor){
            rampUpStep = motorToChek/checkerMotor;
        }
        else{
            rampUpStep = 1;
        }   
        return rampUpStep;
    }

    function driveChekStopAndConfig(time: number, motor1: number, motor2: number) {
        
        let orgMotor1 = motor1;
        let orgMotor2 = motor2;
        let m1Step = getRampupStep(motor1,motor2);
        let m2Step = getRampupStep(motor2,motor1);
        let m1Ramp = 0;
        let m2Ramp = 0;
        let startTime = input.runningTime()/1000
        let endTime = 0;
        while(!rampUpFinished){
            m1Ramp += 5*m1Step;
            m2Ramp += 5*m2Step;
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, m1Ramp);
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, m2Ramp);
            basic.pause(100);
            if(motor1-m1Ramp<5||motor2-m2Ramp<5){
                rampUpFinished= true;
            }
            endTime= input.runningTime()/1000;
        }
        let passedTime = endTime-startTime;
        time = time - passedTime;
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
        while (time > 0) {
             if (stop) {
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
                basic.pause(250);
                stoped = true;
            } else {
                if(steerLeft){
                    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
                    basic.showNumber(1);
                    motor1 = motor1-25;
                    motor2 = motor2+25;
                    steerLeft = false;
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
                }
                if(steerRight){
                    Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
                    basic.showNumber(2);
                    motor1 = motor1+25;
                    motor2 = motor2-25;
                    steerRight = false;
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
                }
                if(motor1>100){
                    motor1=100;
                }
                if(motor2>100){
                    motor2 = 100;
                }
                if (stoped) {
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
                    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
                    stoped = false;
                }
                if (time < 1) {
                    basic.pause(time * 1000);
                    time = 0;
                }
                else {
                    basic.pause(1000);
                    time = time - 1;
                }     
            }
        }
    }
}
