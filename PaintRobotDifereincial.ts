/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace malroboter{
    // witdth of car in m
    let halveCarWidth = 0.25;
    //max drive Speed in m/s
    let maxSpeed = 0.4;
    //speed of the Chalk 0.2 m/s
    let chalkSpeed = 0.15;
    //left Pull 6.5
    export let leftPull = 3.25;
    //right Pull
    export let rightPull = 0;
    let angleTimeMatcher = 0.4;


    let stop = true;
    let isStraight = false;

    //%block="Draw Diferencial"
    //%block.loc.de="Zeichne"
    //%block.loc.fr="Dessinez"
    //%block.loc.it="Disegna"
    export function driveDiferencial(path: () => void) {
        radio.setGroup(1);
        path();
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
        basic.showIcon(IconNames.Skull);
    }

    //%block="Drive Left with an angle of $angle ° and a Radius of $radius m"
    //%block.loc.de="Fahr links mit einem Winkel von $angle ° und einem Radius von $radius m"
    //%block.loc.it="Guida a sinistra con un angolo di $angle ° e un raggio di $radius m"
    //%block.loc.fr="Conduire à gauche avec un angle de $angle ° et un rayon de $radius m"
    //% angle.min=1 angle.max=360 angle.defl=1
    //% radius.min=1 radius.max=50 radius.defl=0.1
    export function differentialLeft(angle: number, radius: number) {
        let innerRadius = radius - halveCarWidth;
        let outerRadius = radius + halveCarWidth;
        let outerPath = getPath(outerRadius, angle);
        let innerPath = getPath(innerRadius, angle);
        let chalkpath = getPath(radius, angle);
        let time = driveTime(chalkpath);
        let matchedTime = driveTime(getPath(radius, angle*angleTimeMatcher));
        let leftPercent = percentNew(innerPath, time) - leftPull;
        let rightPercent = percentNew(outerPath, time);
        isStraight = false;
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block="Drive right with an angle of $angle ° and a Radius of $radius m"
    //%block.loc.it="Guida a destra con un angolo di $angle ° e un raggio di $radius m"
    //%block.loc.fr=="Conduire à droite avec un angle de $angle ° et un rayon de $radius m"
    //%block.loc.de="Fahr rechts mit einem Winkel von $angle ° und einem Radius von $radius m"
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
        isStraight = false;
        driveChekStopAndConfig(driveTime(getPath(radius, angle * angleTimeMatcher)), percentNew(outerPath, time)-leftPull, percentNew(innerPath, time)-rightPull);
    }

    //%block="Drive straight ahead for $time s"
    //%block.loc.it="Guidare dritto per $time s"
    //%block.loc.fr="Roulez tout droit pendant $time s"
    //%block.loc.de="Fahr geradeaus für $time s"
    //% time.min=0 time.max=60 time.defl=1
    export function differentialStreight(time: number) {
        isStraight = true;
        driveChekStopAndConfig(time, 100 - leftPull, 100 - rightPull);
    }

    function getPath(radius: number, angle: number):number{
        let circumference = 2*Math.PI * radius;
        let sector = angle / 360;
        let sectorLength = circumference * sector
        return sectorLength;
    }

    function percentNew(path: number, time: number){
        let speed = path/time;
        let percent = (speed * 100) / maxSpeed;
        return percent;
    }

    // function innerPercent(radius: number):number{
    //     let angularV = chalkSpeed / radius;
    //     let innerRadius = radius - halveCarWidth;
    //     let speed = angularV*innerRadius;
    //     let percent = (speed*100)/maxSpeed;
    //     return percent;
    // }

    // function outerPercent(radius: number): number {
    //     let angularV = chalkSpeed / radius;
    //     let outerRadius = radius + halveCarWidth;
    //     let speed = angularV * outerRadius;
    //     let percent = (speed * 100) / maxSpeed;
    //     return percent;
    // }

    function driveTime(path: number): number{
        let time = path/chalkSpeed;
        return time;
    }

    function driveChekStopAndConfig(time: number, motor1: number, motor2: number) {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
        let stoped = false;
        let orgMotor1 = motor1;
        let orgMotor2 = motor2

        radio.onReceivedString(receivedString => {
            if (receivedString == "stop") {
                stop = !stop;
                stoped = true;
            }
        })

        while(time>0){            
            if(stop){
                radio.onReceivedString(receivedString => {
                    if (receivedString == "stop") {
                        stop = !stop;
                        stoped = true;
                    }
                    if (receivedString == "left") {
                        motor1 = motor1 - (orgMotor1 * 0.5);
                        motor2 = orgMotor2
                        stoped = true;
                    }
                    if (receivedString == "right") {
                        motor1 = orgMotor2;
                        motor2 = motor2 - (orgMotor2 * 0.5);
                        stoped = true;
                    }
                })
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);               
                basic.pause(250);
                stoped = true;
            }else{
                if(stoped){
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
