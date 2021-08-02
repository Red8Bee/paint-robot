// /**
//  * Use this file to define custom functions and blocks.
//  * Read more at https://makecode.microbit.org/blocks/custom
//  */
// /**
//  * Custom blocks
//  */
// //% weight=100 color=#4a0087 icon=""
// namespace PaintRobotTest {
//     // witdth of car in m
//     let carWidth=0.09;
//     //max drive Speed in m/s
//     let maxSpeed = 0.4712;
//     //base Angular Velocity
//     let baseVelocity = 0.4;
//     //min percent
//     let minPercent = 24
//     //left Pull
//     export let leftPull = 0;
//     //right Pull
//     export let rightPull = 0;

//     let start: number = 0;

//     let stop = true;
//     let edit = false;
    
//     //%block="Draw Diferencial"
//     //%block.loc.de="Zeichne Diferenzial"
//     //%block.loc.fr="Dessiner Diferencial"
//     //%block.loc.it="Disegnare Diferencial"
//     export function driveDiferencial(path: () => void) {
//         setButtons();    
//         path();
//         basic.showIcon(IconNames.Skull);
//         Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
//         Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
//     }
//     function swapStop(){
//         if(stop){
            
//             stop = false;
//         }else{
            
//             stop = true;
//         }
//     }  
//     function setButtons(){
//         stop = true;
//         edit = false;
//         input.onButtonPressed(Button.AB, function () {
//             swapStop();
//         })
//         input.onButtonPressed(Button.B, function () {
//              swapStop();
//         })
//         input.onButtonPressed(Button.A, function () {
//             swapStop();
//         })
//         input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
//             soundExpression.happy.play();
//             Configurer.isConfiguring = true;
//         })
//     }
    
//     //%block
//     //% angle.min=1 angle.max=359 angle.defl=1
//     //% radius.min=1 radius.max=500 radius.defl=0.1
//     export function differentialLeft(angle: number = 1, radius: number = 1){
//        driveChekStopAndConfig(driveTime(angle,radius),innerPercent(angle, radius)-rightPull,outerPercent(angle, radius)-leftPull);
//     }

//     //%block
//     //% angle.min=1 angle.max=359 angle.defl=1
//     //% radius.min=1 radius.max=500 radius.defl=0.1
//     export function differentialRight(angle: number = 1, radius: number = 1){
//         driveChekStopAndConfig(driveTime(angle,radius),outerPercent(angle, radius)-leftPull,innerPercent(angle, radius)-rightPull);
//     }

//     //%block
//     export function differentialStreight(time: number){
//         driveChekStopAndConfig(time,100-leftPull,100-rightPull);
//     }
//     function driveChekStopAndConfig(time: number, motor1: number, motor2: number){
//         start = input.runningTimeMicros();
//         let stopDelay = 0;
//         let stopEnteredFirstTime = true;
//         let now = start;
//         let timewobbel = 0;

//         for(let passed = (now-(start+stopDelay))/1000000; time > passed; ){
//             if(Configurer.isConfiguring){
//                 while(Configurer.isConfiguring){
//                     Configurer.configur();
//                 }
//                 setButtons();   
//             }else{
//                 if(stop){
//                     Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
//                     Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);                    
//                     stopDelay = (input.runningTimeMicros() - start)-stopDelay;
//                     basic.showIcon(IconNames.Sad);                                                           
//                 }else{
                    
//                     basic.showIcon(IconNames.Happy);                    
//                     Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, motor1);
//                     Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, motor2);
//                     timewobbel = (input.runningTimeMicros() - now)-timewobbel;
//                     basic.pause(1000);
//                     passed = (now-(start+stopDelay))/1000000              
//                 }                       
//             } 
//             now = input.runningTimeMicros();
//         }
//     }
//     function write(aaa:number){
//         serial.writeLine(aaa.toString());
//     }
//     function outerPercent(angle: number, radius: number): number{
//         //0.25/s => ~1km/h bei 1 Meter Radius
//         let angularVelocity = baseVelocity;
//         let radiusWheelRoute = radius + (carWidth/2);

//         // meter / seconds
//         let velocity = angularVelocity * radiusWheelRoute;
        
//         // 0.4712 m/s --> 100%
//         let percent = (velocity*100)/maxSpeed;
//         if(percent + minPercent > 100){
//             return percent;
//         }
//         return percent + minPercent;
//     }

//     function innerPercent(angle: number, radius: number): number{
//         //0.25/s => ~1km/h if radius = 1m
//         let angularVelocity = baseVelocity;
//         let radiusWheelRoute = radius - (carWidth/2);

//         //meter/seconds
//         let velocity = angularVelocity * radiusWheelRoute;

//         // 0.4712 m/s --> 100%
//         let percent = (velocity*100)/maxSpeed;
//         if(percent + minPercent > 100){
//             return percent;
//         }
//         return percent + minPercent;
//     }

//     function driveTime(angle: number, radius: number){
//         //0.25/s => ~1km/h bei 1 Meter Radius
//         let angularVelocity = baseVelocity;

//         //meter/seconds
//         let chalkVelocity = angularVelocity * radius;

//         let distance = (angle/360)*2*Math.PI*radius;
//         let time = distance/chalkVelocity;
//         let timeInms = time;
//         return timeInms     
//     }
// }