// /**
//  * Use this file to define custom functions and blocks.
//  * Read more at https://makecode.microbit.org/blocks/custom
//  */
// /**
//  * Custom blocks
//  */
// //% weight=100 color=#870020 icon=""
// namespace Configurer {
//     export let isConfiguring: boolean = false;
//     let steps = 10;
//     let leftSpeed = 91.5;
//     let rightSpeed = 100;
//     let sideLeft = true;
//     let mode = 1;

//     function ab(){
//         input.onButtonPressed(Button.AB, function () {
//             soundExpression.happy.play();
//             PaintRobotTest.leftPull=100-leftSpeed;
//             PaintRobotTest.rightPull=100-rightSpeed;
//             isConfiguring=false;
//         })
//     }
    
//     function a(){
//         input.onButtonPressed(Button.A, function () {
//             switch(mode){
//                 case 0:
//                     break;
//                 case 1:
//                     editA();
//                     break;
//                 case 2:
//                     stepA();
//                     break;
//             }
//         })
       
//     }
//     function editA(){
//         if(sideLeft){
//             leftSpeed = leftSpeed - steps;
//         }else{
//             rightSpeed = rightSpeed - steps;
//         }    
//     }
//     function stepA(){
//         switch(steps){
//             case 10:
//                 steps = 5;
//                 break;
//             case 5:
//                 steps = 1;
//                 break;
//             case 1:
//                 steps = 0.5;
//                 break;
//             case 0.5:
//                 steps = 0.25;
//                 break;
//             case 0.25:
//                 steps = 0.1;
//                 break;
//             case 0.1:
//                 steps = 10;
//                 break;
//         }                         
//     }

//     function b(){
//         input.onButtonPressed(Button.B, function () {
//             switch(mode){
//                 case 0:
//                     break;
//                 case 1:
//                     editB();
//                     break;
//                 case 2:
//                     stepB();
//                     break;
//             }
//         })          
//     }
//     function stepB(){
//         switch(steps){
//                 case 10:
//                     steps = 0.1;
//                     break;
//                 case 5:
//                     steps = 10;
//                     break;
//                 case 1:
//                     steps = 5;
//                     break;
//                 case 0.5:
//                     steps = 1;
//                     break;
//                 case 0.25:
//                     steps = 0.5;
//                     break;
//                 case 0.1:
//                     steps = 0.25;
//                     break;
//             }
//     }

//     function editB(){
//         if(sideLeft){
//             leftSpeed = leftSpeed + steps;
//         }else{
//             rightSpeed = rightSpeed + steps;
//         }
//     }

//     function logoPressed(){
//         input.onLogoEvent(TouchButtonEvent.Pressed, function () {
//             soundExpression.happy.play();
//             if(mode == 0){
//                 mode = 1;
//             }else if(mode == 1){
//                 mode = 2;
//             }else{
//                 mode = 0;
//             }
//         })
//     }

//     function logoPressedLong(){
//         input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
//             if(sideLeft){
//                 sideLeft = false;
//             }else {
//                 sideLeft = true;
//             }
//         });
//     }

//     function setButtons(){
//         ab();
//         a();
//         b();
//         logoPressedLong();
//         logoPressed();
//         mode = 1;
//         steps = 10;
//         sideLeft = true;
//     }

//     export function configur(){   
//         setButtons();
//         while(isConfiguring){
//             switch(mode){
//                 case 0:
//                     basic.showIcon(IconNames.Happy)
//                     test();
//                     break;
//                 case 1:
//                     if(sideLeft){
//                         basic.showArrow(ArrowNames.East);
//                     }else{
//                         basic.showArrow(ArrowNames.West);
//                     }
//                     edit();
//                     break;
//                 case 2: 
//                     step();
//                     break;
//             } 
//         }
//     }

//     function test(){  
//         Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, leftSpeed);
//         Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, rightSpeed);
//     }
//     function edit(){
//         Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1);
//         Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2);
//         if(sideLeft){
//             basic.showNumber(leftSpeed);
//         }else{
//             basic.showNumber(rightSpeed);
//         }
       
//     }
//     function step(){
//         basic.showNumber(steps);    
//     }
// }