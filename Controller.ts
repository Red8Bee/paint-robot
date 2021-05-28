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
        input.onButtonPressed(Button.A, SendOversteerLeft);
        input.onButtonPressed(Button.B, SendOversteerRight);
    }

    export function SendOversteerLeft(): void {
        radio.sendString("left");
    }

    export function SendOversteerRight() {
        radio.sendString("right");
    }

    export function configurReciver(){
        radio.setGroup(1);
        radio.onReceivedString(leftOrRight);
    }
    
    export function leftOrRight(recivedString: string):void{
        if(recivedString.compare("left")){
            PaintRobotSimpel.left(45);
            basic.pause(1000);
            

        }
        else if(recivedString.compare("right")){
            PaintRobotSimpel.right(45);
            basic.pause(1000);

        }
        else{
            PaintRobotSimpel.setAngleStraight();
        }
    }
    function returnToOrigin(){
        switch(PaintRobotSimpel.getDirection()){
            case 1:
            basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
    `       )
            break;
            case 2:
            basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
    `       )
            break;
            case 3:
            basic.showLeds(`
            . . # . .
            . . # # .
            # # # # #
            . . # # .
            . . # . .
    `       )
            break;
        }
    }

}