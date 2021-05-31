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
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
    `       )
    }

    export function SendOversteerRight() {
        radio.sendString("right");
        basic.showLeds(`
            . . # . .
            . . # # .
            # # # # #
            . . # # .
            . . # . .
    `       )
    }

    export function configurReciver(){
        radio.setGroup(1);
        radio.onReceivedString(leftOrRight);
    }
    
    export function leftOrRight(recivedString: string):void{
        if(recivedString.compare("left")){
            PaintRobotSimpel.left(45);
            basic.pause(1000);
            returnToOrigin()

        }
        else if(recivedString.compare("right")){
            PaintRobotSimpel.right(45);
            basic.pause(1000);
            returnToOrigin()
        }
        else{
            PaintRobotSimpel.setAngleStraight();
        }
    }
    function returnToOrigin(){
        switch(PaintRobotSimpel.getDirection()){
            case 3:
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
            case 1:
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