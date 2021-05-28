/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#00875a icon=""
namespace PaintRobotComplex {

    //%block="Fahre für $time Sekunden Geradeaus"
    export function driveStraightFor(time: number): void {
        PaintRobotSimpel.setDirection(2);
        let runtime = time * 1000;
        PaintRobotSimpel.setAngleStraight();
        PaintRobotSimpel.go();
        basic.pause(runtime);
        PaintRobotSimpel.stop();
    }

    //%block="Fahre $time Sekunden, $angle ° Links "
    export function makeCuveLeft(angle: number, time: number) {
        PaintRobotSimpel.setDirection(1);
        let runtime = time * 1000;
        PaintRobotSimpel.left(angle);
        PaintRobotSimpel.go();
        basic.pause(runtime);
        PaintRobotSimpel.stop();
    }

    //%block="Fahre $time Sekunden, $angle ° Rechts"
    export function makeCurveRight(angle: number, time: number): void {
        PaintRobotSimpel.setDirection(3);
        let runtime = time * 1000;
        PaintRobotSimpel.right(angle);
        PaintRobotSimpel.go();
        basic.pause(runtime);
        PaintRobotSimpel.stop();
    }
}


