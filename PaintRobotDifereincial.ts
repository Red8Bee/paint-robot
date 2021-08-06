/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace differencial{
    // witdth of car in m
    let halveCarWidth = 0.2;
    //max drive Speed in m/s
    let maxSpeed = 0.3;
    //speed of the Chalk 0.2 m/s
    let chalkSpeed = 0.2;
    //left Pull
    export let leftPull = 6.5;
    //right Pull
    export let rightPull = 0;
    let angleTimeMatcher = 0.56;
    let calculationTime = 0; 
    let calculationStart = 0;
    let calculationStop = 0;

    let functionEnteredOn: number = 0;
    let stop = true;
    let edit = false;


    //%block="Draw Diferencial"
    //%block.loc.de="Zeichne Diferenzial"
    //%block.loc.fr="Dessiner Diferencial"
    //%block.loc.it="Disegnare Diferencial"
    export function driveDiferencial(path: () => void) {
        path();
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
        basic.showIcon(IconNames.Skull);
    }

    //%block
    //% angle.min=1 angle.max=360 angle.defl=1
    //% radius.min=1 radius.max=50 radius.defl=0.1
    export function differentialLeft(angle: number = 1, radius: number = 1) {
        let innerRadius = radius - halveCarWidth;
        let outerRadius = radius + halveCarWidth;
        let outerPath = getPath(outerRadius, angle);
        let innerPath = getPath(innerRadius, angle);
        let chalkpath = getPath(radius, angle);
        let time = driveTime(chalkpath);
        let matchedTime = driveTime(getPath(radius, angle * angleTimeMatcher));
        let leftPercent = percentNew(innerPath, time) - leftPull
        let rightPercent = percentNew(outerPath, time) - rightPull
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block
    //% angle.min=1 angle.max=360 angle.defl=1
    //% radius.min=1 radius.max=50 radius.defl=0.1
    export function differentialRight(angle: number, radius: number) {
        let calculationTime
        let innerRadius = radius - halveCarWidth;
        let outerRadius = radius + halveCarWidth;
        let outerPath = getPath(outerRadius, angle);
        let innerPath = getPath(innerRadius, angle);
        let chalkpath = getPath(radius, angle); 
        let time = driveTime(chalkpath);
        driveChekStopAndConfig(driveTime(getPath(radius, angle * angleTimeMatcher)), percentNew(outerPath, time)-leftPull, percentNew(innerPath, time)-rightPull);
    }

    //%block
    export function differentialStreight(time: number) {
        driveChekStopAndConfig(time, 100 - leftPull, 100 - rightPull);
    }

    function getPath(radius: number, angle: number):number{
        let circumference = 2*Math.PI * radius;
        let sector = angle / 360;
        let sectorLength = circumference * sector
        // serial.writeLine("Umfang gesamt: "+ circumference );
        // serial.writeLine("abschnit: " + sector);
        // serial.writeLine("streke: "+ sectorLength);
        return sectorLength;
    }

    function percentNew(path: number, time: number){
        // serial.writeLine("streke: " + path)
        let speed = path/time;
        // serial.writeLine("speed " + speed)
        let percent = (speed * 100) / maxSpeed;
        // serial.writeLine("prozent: " + percent)
        return percent;
    }

    function innerPercent(radius: number):number{
        let angularV = chalkSpeed / radius;
        let innerRadius = radius - halveCarWidth;
        let speed = angularV*innerRadius;
        let percent = (speed*100)/maxSpeed;
        return percent;
    }

    function outerPercent(radius: number): number {
        let angularV = chalkSpeed / radius;
        let outerRadius = radius + halveCarWidth;
        let speed = angularV * outerRadius;
        let percent = (speed * 100) / maxSpeed;
        return percent;
    }

    function driveTime(path: number): number{
        // serial.writeLine("streke: " + path)
        let time = path/chalkSpeed;
        // serial.writeLine("zeit: " + time)
        return time;
    }

    function driveChekStopAndConfig(time: number, motor1: number, motor2: number) {
        basic.pause(1000);        
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
        basic.pause((time * 1000) - calculationTime);
        // Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
        // Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
    }
}
