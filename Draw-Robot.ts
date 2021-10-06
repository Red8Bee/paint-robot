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
    export let leftPull = 3.25;
    //right Pull
    export let rightPull = 0;
    let angleTimeMatcher = 0.4;


    let stop = true;
    let isStraight = false;

    //%block="Drive"
    //%block.loc.de="Fahr"
    //%block.loc.fr="Conduire"
    //%block.loc.it="Guidare"
    export function drive(path: () => void) {
        radio.setGroup(1);
        path();
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
        basic.showIcon(IconNames.Skull);
    }

    //%block="Left(Angle: $angle °, Radius:  $cmradius cm)"
    //%block.loc.de="Links(Winkel: $angle °, Radius: $cmradius cm)"
    //%block.loc.it="A sinistra(Angolo: $angle °, Raggio: $cmradius cm)"
    //%block.loc.fr="À gauche(Angle: $angle °, Rayon: $cmradius cm)"
    //% angle.min=1 angle.max=360 angle.defl=90
    //% cmradius.min=10 cmradius.max=1000 cmradius.defl=100
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
        let leftPercent = percentNew(innerPath, time) - leftPull;
        let rightPercent = percentNew(outerPath, time);
        isStraight = false;
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block="Right(Angle: $angle °, Radius $cmradius cm)"
    //%block.loc.it="A destra(Angolo: $angle °, Raggio $cmradius cm)"
    //%block.loc.fr=="À droite(Angle: $angle °, Rayon $cmradius cm)"
    //%block.loc.de="Rechts(Winkel: $angle °, Radius: $cmradius cm)"
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
        let leftPercent = percentNew(innerPath, time) - leftPull;
        let rightPercent = percentNew(outerPath, time);
        isStraight = false;
        driveChekStopAndConfig(matchedTime, leftPercent, rightPercent);
    }

    //%block="Straight ahead(Time: $time sek)"
    //%block.loc.it="Dritto davanti(Tempo: $time sek)"
    //%block.loc.fr="Tout droit(Temps: $time sek)"
    //%block.loc.de="Geradeaus(Zeit: $time sek)"
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

    function percentNew(path: number, time: number) {
        let speed = path / time;
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

    function driveTime(path: number): number {
        let time = path / chalkSpeed;
        return time;
    }

    function driveChekStopAndConfig(time: number, motor1: number, motor2: number) {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
        let stoped = false;
        let orgMotor1 = motor1;
        let orgMotor2 = motor2

        radio.onReceivedString(receivedString => {
            if (receivedString == "stop") {
                stop = !stop;
                stoped = true;
            }
        })

        while (time > 0) {
            if (stop) {
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
            } else {
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
