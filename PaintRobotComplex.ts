/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
/**
 * Custom blocks
 */
//% weight=100 color=#4a0087 icon=""
namespace PaintRobotTest {

    // witdth of car in m
    let carWidth=0.09;
    //max drive Speed in m/s
    let maxSpeed = 0.4712;
    
    
    //%block
    //angle.min=1 angle.max=359
    export function diferencialLeft(angle: number, radius: number){
            basic.showArrow(ArrowNames.West); 
            servos.P0.run(innerPercent(angle, radius));
            servos.P1.run(outerPercent(angle, radius));
            basic.pause(driveTime(angle,radius))
    }

    //%block
    export function diferencialRight(angle: number, radius: number){
        basic.showArrow(ArrowNames.East); 
        servos.P0.run(outerPercent(angle, radius));
        servos.P1.run(innerPercent(angle, radius));
        basic.pause(driveTime(angle,radius))
    }

    function outerPercent(angle: number, radius: number): number{
        //0.25/s => ~1km/h bei 1 Meter Radius
        let angularVelocity = 0.25/radius;
        let radiusWheelRoute = radius + (carWidth/2);

        // meter / seconds
        let velocity = angularVelocity * radiusWheelRoute;
        
        // 0.4712 m/s --> 100%
        let percent = (velocity*100)/maxSpeed;
        return percent;
    }

    function innerPercent(angle: number, radius: number): number{
        //0.25/s => ~1km/h if radius = 1m
        let angularVelocity = 0.25/radius;
        let radiusWheelRoute = radius - (carWidth/2);

        //meter/seconds
        let velocity = angularVelocity * radiusWheelRoute;

        // 0.4712 m/s --> 100%
        let percent = (velocity*100)/maxSpeed;
        return percent;
    }

    function driveTime(angle: number, radius: number){
        //0.25/s => ~1km/h bei 1 Meter Radius
        let angularVelocity = 0.25/radius;

        //meter/seconds
        let chalkVelocity = angularVelocity * radius;

        let distance = (angle/360)*2*Math.PI*radius;
        let time = distance/chalkVelocity;
        let timeInms = time * 1000;

        return timeInms;
    }
}