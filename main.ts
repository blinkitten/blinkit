/**
 * Blocks for Blinkit Board
 */
//% weight=100 color=#0855AA icon="\uf21c" block="Blinkit"
namespace Blinkit_driver {
    /**
     * BLINKIT initialize
     */
    //% blockId="BLINKIT_I2C_init" block="初始化BLINKIT"
    //% weight=100 blockGap=8
    //% parts=BLINKIT_I2C trackArgs=0
    export function init() {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate9600
        )
    }


    /**
        * micro:bit Led8x8 driver blocks 
     * Note that Forward and reverse are slightly arbitrary, as it depends on how the motor is wired...
       */



    function asciiToChar(asciiCode: number): string {
        // 使用String.fromCharCode方法将ASCII码转换为字符  
        return String.fromCharCode(asciiCode);
    }



    export enum MotorDirection {
        //% block="向右"
        Forward,
        //% block="向左"
        Reverse,
        //% block="变化"
        Change,
    }





    export enum Led8x8 {
        //%blockId=Led8x8_1
        //% block="1"
        Led8x81,
        //%blockId=Led8x8_2
        //% block="2"
        Led8x82,
        //%blockId=Led8x8_3
        //% block="3"
        Led8x83,
        //%blockId=Led8x8_4
        //% block="4"
        Led8x84,
        //%blockId=Led8x8_5
        //% block="5"
        Led8x85,
        //%blockId=Led8x8_6
        //% block="6"
        Led8x86,
        //%blockId=Led8x8_7
        //% block="7"
        Led8x87,
        //%blockId=Led8x8_8
        //% block="8"
        Led8x88,
        //%blockId=Led8x8_9
        //% block="9"
        Led8x89,
    }


    /**
        * Led8x8 driver blocks
        
     * @param Led8x8 which Led8x8 to turn on
     * @param dir which direction to go
     * @param speed how fast
        */
    //% blockId=Led8x8_on
    //% block="8x8,位置%motor|动画%dir|速度 %speed"
    //% speed.min=1 speed.max=6
    export function Led8x8_1(Led8x8: Led8x8, dir: MotorDirection, speed: number): void {
        /*first convert 0-100 to 0-1024 (approx) We wont worry about the lsat 24 to make life simpler*/
        const asciiCode = Led8x8 + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);


        let projectInfo = "7e30" + char + "#"
        serial.writeString(projectInfo);

    }

}