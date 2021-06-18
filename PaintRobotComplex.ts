/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#00875a icon=""
namespace PaintRobotComplex {

    //%block="Drive straight ahead for $time seconds"
    //%block.loc.de="Fahre geradeaus für $time Sekunden"
    //%block.loc.fr="Continuez tout droit pendant $time secondes"
    //%block.loc.it="Prosegui dritto per $time secondi"
    export function driveStraightFor(time: number): void {
        let runtime = time * 1000;
        PaintRobotSimpel.setAngleStraight();
        basic.pause(runtime);
    }

    //%block="Drive $time seconds, $angle ° to the left"
    //%block.loc.de="Fahr $time Sekunden, $angle ° nach links"
    //%block.loc.fr="Conduisez $time secondes, $angle ° vers la gauche"
    //%block.loc.it="Guida $time secondi, $angle ° a sinistra"
    //% angle.min=1 angle.max=90
    export function makeCuveLeft(angle: number, time: number) {
        let runtime = time * 1000;
        PaintRobotSimpel.left(angle);
        basic.pause(runtime);
    }

    //%block="Drive aaa seconds, aaa ° right"
    //%block.loc.de="Fahre $time Sekunden, $angle ° Rechts"
    //%block.loc.fr="Conduisez aaa secondes, aaa ° à droite"
    //%block.loc.it="Guida aaa secondi, aaa ° a destra"
    //% angle.min=1 angle.max=90
    export function makeCurveRight(angle: number, time: number): void {
        let runtime = time * 1000;
        PaintRobotSimpel.right(angle);
        basic.pause(runtime);
    }
}