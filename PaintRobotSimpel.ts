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
        draw();
    }

    //%block="fahr"
    export function go(): void {
        servos.P0.run(50);
    }

    //%block="stop"
    export function stop(): void {
        servos.P0.run(0);
    }

    //%block="Einschlagswinkel auf &angle ° Links"
    //% angle.min=1 angle.max=90
    export function left(newAngle: number): void {
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

    //%block="Einschlagswinkel auf &angle °  right"
    //% angle.min=1 angle.max=90
    export function right(newAngle: number): void {
        direction = 2;
        angle = newAngle;
        let nangle = 90 + angle;
        servos.P1.setAngle(nangle);
        // basic.showNumber(3);
    }   
}