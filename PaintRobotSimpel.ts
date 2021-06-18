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

    
    //%block="Draw"
    //%block.loc.de="Zeichne"
    //%block.loc.fr="Dessiner"
    //%block.loc.it="Disegnare"
    export function drive(path: () => void) {
        Controller.configurReciver();
        PaintRobotSimpel.setAngleStraight();
        PaintRobotSimpel.go();
        path();
        PaintRobotSimpel.stop();
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
    //%block.loc.de="Lenkung ° links drehen "
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

    //%block="Turn steering °right"
    //%block.loc.de="Lenkung ° rechts drehen"
    //%block.loc.fr="tourner le volant °à droite"
    //%block.loc.it="girare lo sterzo °destra"
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
}