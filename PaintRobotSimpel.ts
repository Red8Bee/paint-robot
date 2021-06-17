/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace PaintRobotSimpel {
    
   
    export let direction: number;
    export let angle: number;

    
    //%block="zeichne"
    export function drawThis(draw: () => void) {
        Controller.configurReciver();
        PaintRobotSimpel.setAngleStraight();
        PaintRobotSimpel.penDown();
        PaintRobotSimpel.go();
        draw();
        PaintRobotSimpel.stop();
    }

    //%block="fahr"
    export function driveThis(drive: () => void){
        Controller.configurReciver();
        PaintRobotSimpel.setAngleStraight();
        PaintRobotSimpel.penUp();
        PaintRobotSimpel.go();
        drive();
        PaintRobotSimpel.stop();
    }

    //%block="Go"
    export function go():void{
        servos.P0.run(50);
    }

    //%block="Stop"
    export function stop(): void {
        servos.P0.run(0);
    }

    //%block="Einschlagswinkel auf $newAngle ° Links"
    //% angle.min=1 angle.max=90
    export function left(newAngle: number): void {
        basic.showArrow(ArrowNames.West);
        direction = 0;
        angle = newAngle;
        let nangle = 90 - angle;
        servos.P1.setAngle(nangle);
        // basic.showNumber(1);
    }

    //%block="Geradeaus"
    export function setAngleStraight(): void {
        direction = 1;
        angle = 90;
        servos.P1.setAngle(90);
        // basic.showNumber(2);
    }

    //%block="Einschlagswinkel auf $newAngle °  right"
    //% angle.min=1 angle.max=90
    export function right(newAngle: number): void {
         basic.showArrow(ArrowNames.East);
        direction = 2;
        angle = newAngle;
        let nangle = 90 + angle;
        servos.P1.setAngle(nangle);
        // basic.showNumber(3);
    }  

    //%block="Kreide absetzen"
    export function penDown(): void{
        servos.P2.setAngle(0);
    }

    //%block="Kreide hochheben";
    export function penUp(): void{
        servos.P2.setAngle(185);
    }
}