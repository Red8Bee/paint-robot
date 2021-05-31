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
            music.playTone(Note.CSharp, music.beat())
            PaintRobotSimpel.left(45);
            basic.pause(1000);
            returnToOrigin()

        }
        else if(recivedString.compare("right")){
            music.playTone(Note.D4, music.beat())
            PaintRobotSimpel.right(45);
            basic.pause(1000);
            returnToOrigin()
        }
        else{
            PaintRobotSimpel.setAngleStraight();
        }
    }
    function returnToOrigin(){
        music.playTone(Note.A, music.beat())
        switch(PaintRobotSimpel.getDirection()){
            case 1:
                basic.showNumber(1);
                break;
            case 2:
                basic.showNumber(2);
                break;
            case 3:
                basic.showNumber(3);
                break;
        }
    }

}