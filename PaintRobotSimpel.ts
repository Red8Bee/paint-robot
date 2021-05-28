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
    let direction: number;
    export function setDirection(before: number){
        direction = before;
    }
    export function getDirection():number {
        return direction; 
    }
    export function drawThis(a: () => void) {
        Controller.configurReciver();
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
        setDirection(1);
        let nangle = 90 - angle;
        servos.P1.setAngle(nangle);
        basic.showLeds(`
    . . # . .
    . # # . .
    # # # # #
    . # # . .
    . . # . .
    `);

    }

    //%block="Einschlagswinkel auf &angle °  right"
    //% angle.min=1 angle.max=90
    export function right(angle: number): void {
        setDirection(3);
        let nangle = 90 + angle;
        servos.P1.setAngle(nangle);
        basic.showLeds(`
    . . # . .
    . . # # .
    # # # # #
    . . # # .
    . . # . .
    `);
    }

    //%block="Geradeaus"
    export function setAngleStraight(): void {
        setDirection(2);
        servos.P1.setAngle(90);
        basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `);
    }
}