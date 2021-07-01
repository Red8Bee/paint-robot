/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace PaintRobot {
    
   
    export let direction: number;
    export let angle: number;

    
    //%block="Draw"
    //%block.loc.de="Zeichne"
    //%block.loc.fr="Dessiner"
    //%block.loc.it="Disegnare"
    export function drive(path: () => void) {
        Controller.configurReciver();
        PaintRobot.setAngleStraight();
        PaintRobot.go();
        path();
        PaintRobot.stop();
    }

    //%block="Drive"
    //%block.loc.de="Fahr"
    //%block.loc.fr="Conduire"
    //%block.loc.it="Guidare"
    export function go():void{
        servos.P0.run(50);
    }

    //%block="Stop"
    //%block.loc.de="Stop"
    //%block.loc.fr="arrêter"
    //%block.loc.it="fermare"
    export function stop(): void {
        servos.P0.run(0);
    }

    //%block="Turn steering $newAngle ° left"
    //%block.loc.de="Lenkung $newAngle ° links drehen "
    //%block.loc.fr="tourner le volant $newAngle ° à gauche"
    //%block.loc.it="girare lo sterzo $newAngle ° sinistra"
    //% angle.min=1 angle.max=90
    export function left(newAngle: number): void {
        basic.showArrow(ArrowNames.West);
        direction = 0;
        angle = newAngle;
        let nangle = 90 - angle;
        servos.P1.setAngle(nangle);
        // basic.showNumber(1);
    }

    //%block="Straight"
    //%block.loc.de="Geradeaus"
    //%block.loc.fr="tout Droit"
    //%block.loc.it="Dritto"
    export function setAngleStraight(): void {
        direction = 1;
        angle = 90;
        servos.P1.setAngle(90);
        // basic.showNumber(2);
    }

    //%block="Turn steering $newAngle °right"
    //%block.loc.de="Lenkung $newAngle ° rechts drehen"
    //%block.loc.fr="tourner le volant $newAngle °à droite"
    //%block.loc.it="girare lo sterzo $newAngle °destra"
    //% angle.min=1 angle.max=90
    export function right(newAngle: number): void {
         basic.showArrow(ArrowNames.East);
        direction = 2;
        angle = newAngle;
        let nangle = 90 + angle;
        servos.P1.setAngle(nangle);
        // basic.showNumber(3);
    }  

    //%block="Put down the chalk"
    //%block.loc.de="Kreide absetzen"
    //%block.loc.fr="Pose la craie"
    //%block.loc.it="Metti giù il gesso"
    export function penDown(): void{
        servos.P2.setAngle(0);
    }

    //%block="Lift up chalk";
    //%block.loc.de="Kreide anheben"
    //%block.loc.fr="Soulevez la craie"
    //%block.loc.it="Alza il gesso"
    export function penUp(): void{
        servos.P2.setAngle(185);
    }

    //%block="Drive straight ahead for $time seconds"
    //%block.loc.de="Fahre geradeaus für $time Sekunden"
    //%block.loc.fr="Continuez tout droit pendant $time secondes"
    //%block.loc.it="Prosegui dritto per $time secondi"
    //%advanced=true
    export function driveStraightFor(time: number): void {
        let runtime = time * 1000;
        PaintRobot.setAngleStraight();
        basic.pause(runtime);
    }


    //Advanced Comands

    //%block="Drive $time seconds, $angle ° to the left"
    //%block.loc.de="Fahr $time Sekunden, $angle ° nach links"
    //%block.loc.fr="Conduisez $time secondes, $angle ° vers la gauche"
    //%block.loc.it="Guida $time secondi, $angle ° a sinistra"
    //% angle.min=1 angle.max=90
    //%advanced=true
    export function makeCuveLeft(angle: number, time: number) {
        let runtime = time * 1000;
        PaintRobot.left(angle);
        basic.pause(runtime);
    }

    //%block="Drive $time  seconds, $angle ° right"
    //%block.loc.de="Fahre $time Sekunden, $angle ° Rechts"
    //%block.loc.fr="Conduisez $time secondes, $angle ° à droite"
    //%block.loc.it="Guida $time secondi, $angle ° a destra"
    //% angle.min=1 angle.max=90
    //%advanced=true
    export function makeCurveRight(angle: number, time: number): void {
        let runtime = time * 1000;
        PaintRobot.right(angle);
        basic.pause(runtime);
    }
}