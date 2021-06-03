/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#870020 icon=""
namespace Controller {

    //%block
    export function configurSender(): void{
        radio.setGroup(1);
        input.onButtonPressed(Button.A, function () {
            radio.sendString("left");
        });
        input.onButtonPressed(Button.B, function () {
            radio.sendString("right");
        });
    }

    export function configurReciver(): void{
        radio.setGroup(1);
        radio.onReceivedString(function (receivedString: string) {
            if(receivedString.compare("left")){
                basic.showArrow(ArrowNames.East);
                servos.P1.setAngle(90-40);
                basic.pause(1000);
                backToOrign();

            }
            else if(receivedString.compare("right")){
                basic.showArrow(ArrowNames.West);
                servos.P1.setAngle(90+40);
                basic.pause(1000);
                backToOrign();
            }
        });
    }

    export function backToOrign(){
        basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
        let goBackToThisDirection = PaintRobotSimpel.direction;
        let angle = PaintRobotSimpel.angle;
        let oldLeftAngle = 90 - angle;
        let oldRightAngle = 90 + angle;
         switch(goBackToThisDirection){
            case 0:
                PaintRobotSimpel.left(oldLeftAngle);
                break;
            case 1:
                PaintRobotSimpel.setAngleStraight();
                break;
            case 2:
                PaintRobotSimpel.right(oldRightAngle);
                break;
        } 
    }
}