/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace PaintRobotSimpel {
    //%block="zeichne"
    export function drawThis(a: () => void) {
        Controller.configurReciver();
        Controller.configurSender();
        a();
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
    export function left(angle: number): void {
        let nangle = 90 - angle;
        servos.P1.setAngle(nangle);
    }

    //%block="Einschlagswinkel auf &angle °  right"
    //% angle.min=1 angle.max=90
    export function right(angle: number): void {
        let nangle = 90 + angle;
        servos.P1.setAngle(nangle);
    }

    //%block="Geradeaus"
    export function setAngleStraight(): void {
        servos.P1.setAngle(90);
    }
}