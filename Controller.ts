/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#46ab3c icon=""
namespace Controller {

    export function configurSender(){
        radio.setGroup(1);
        input.onButtonPressed(Button.A, Controller.SendOversteerLeft);
        input.onButtonPressed(Button.B, Controller.SendOversteerRight);
    }

    export function SendOversteerLeft() {
        radio.sendString("left");
    }

    export function SendOversteerRight() {
        radio.sendString("right");
    }

    //%block
    export function configurReciver(){
        radio.setGroup(1);
        radio.onReceivedString(leftOrRight);
    }
    
    export function leftOrRight(recivedSring: string):void{
        if(recivedSring.compare("left")){
            PaintRobotSimpel.left(45);
        }
        else if(recivedSring.compare("right")){
            PaintRobotSimpel.right(45);
        }
        else{
            PaintRobotSimpel.setAngleStraight();
        }
    }
}