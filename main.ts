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
    * normal2 driver blocks  ok
    * @param normal2 which normal2 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% blockId=normal2
    //% block="指定%OutmodeName|Direct Drive %Sc"
    //% Sc.min=0 Sc.max=180
    export function normal2(OutmodeName: OutmodeName, Sc: number): void {
        if (OutmodeName == 0) {
            const OutValue = Sc / 10 + 32; // ASCII码对应
            const OutValue2 = Sc % 10 + 32; // ASCII码对应
            const char = asciiToChar(OutValue);
            const char2 = asciiToChar(OutValue2);
            let projectInfo = "7e41" + char + char2 + "#";
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            const OutValue = Sc / 10 + 32; // ASCII码对应
            const OutValue2 = Sc % 10 + 32; // ASCII码对应
            const char = asciiToChar(OutName);
            const char2 = asciiToChar(OutValue);
            const char3 = asciiToChar(OutValue2);
            let projectInfo = "7e54" + char + char2 + char3 + "#";
            serial.writeString(projectInfo);
        }
    }

    /**
    * normal driver blocks   ok
    * @param normal which normal to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% blockId=normal
    //% block="指定%OutmodeName|触发 %Outmode"
    export function normal(OutmodeName: OutmodeName, Outmode: Outmode): void {
        if (OutmodeName == 0) {
            const OutValue = Outmode + 33; // ASCII码对应
            const char = asciiToChar(OutValue);
            let projectInfo = "7e30" + char + "#";
            //let projectInfo = "7e30!#" ;
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            const OutValue = Outmode + 32; // ASCII码对应
            const char = asciiToChar(OutName);
            const char2 = asciiToChar(OutValue);
            let projectInfo = "7e43" + char + char2 + "#";
            serial.writeString(projectInfo);
        }
    }

    /**
        * Sensor driver blocks
        * @param Sensor which Sensor to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% blockId=Sensor_value
    //% block="如果%SensorName|%PosNum|数据> %Min"
    export function Sensor(SensorName: SensorName, PosNum: PosNum, Min: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e30" + char + "#"
        serial.writeString(projectInfo);
    }
    /**
            * Sensor driver blocks
            * @param Sensor which Sensor to turn on
            * @param dir which direction to go
            * @param speed how fast
            */
    //% blockId=Sensor_value2
    //% block="如果%SensorName|%PosNum|数据< %Max"
    export function Sensor2(SensorName: SensorName, PosNum: PosNum, Max: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e30" + char + "#"
        serial.writeString(projectInfo);
    }

    /**
     * Returns the distance to an object in a range from 1 to 300 centimeters or up to 118 inch.
     * The maximum value is returned to indicate when no object was detected.
     * -1 is returned when the device is not connected.
     * @param unit unit of distance, eg: DistanceUnit.CM
     */
    //% blockId="Sensor_value3"
    //% block="获取%SensorName|%PosNum|数据"
    //% weight=60
    export function Sensor3(SensorName: SensorName, PosNum: PosNum): string {
        if (true) {
            return "1";
        }
        basic.pause(0); // yield to allow background processing when called in a tight loop
        return "2";
    }








    function asciiToChar(asciiCode: number): string {
        // 使用String.fromCharCode方法将ASCII码转换为字符  
        return String.fromCharCode(asciiCode);
    }

    export enum SensorName {
        //% block="光敏电阻"
        Sensor0,
        //% block="按键"
        Sensor1,
        //% block="摇杆"
        Sensor2,
        //% block="旋钮电位器"
        Sensor3,
        //% block="推杆电位器"
        Sensor4,
        //% block="语音识别"
        Sensor5,
        //% block="倾斜"
        Sensor6,
        //% block="触摸"
        Sensor7,
        //% block="温湿度"
        Sensor8,
        //% block="激光测距"
        Sensor9,
        //% block="土壤湿度"
        Sensor10,
        //% block="手势"
        Sensor11,
    }

    export enum OutmodeName {
        //% block="All"
        Outmode0,
        //% block="舵机"
        Outmode1,
        //% block="直流电机"
        Outmode2,
        //% block="双路直流电机"
        Outmode3,
        //% block="Led8x8"
        Outmode4,
        //% block="LED_RGB"
        Outmode5,
        //% block="Mp3"
        Outmode6,
    }
    export enum Outmode {
        //% block="1"
        Outmode0,
        //% block="2"
        Outmode1,
        //% block="3"
        Outmode2,
        //% block="4"
        Outmode3,
        //% block="5"
        Outmode4,
        //% block="6"
        Outmode5,
        //% block="7"
        Outmode6,
        //% block="8"
        Outmode7,

    }

    export enum Led8x8_DH2 {
        //% block="向左"
        Left,
        //% block="向右"
        Right,
        //% block="变化"
        Change,
    }

    export enum Led8x8_DH {
        //% block="随机"
        DH2_1,
        //% block="环绕"
        DH2_2,
        //% block="折弯"
        DH2_3,
        //% block="扫描"
        DH2_4,
        //% block="直接"
        DH2_5,
    }
    export enum LedRGB_DH {
        //% block="无"
        Wu,
        //% block="渐变"
        Change,
    }

    export enum Mp3_DH {
        //% block="暂停"
        Mp3_DH0,
        //% block="播放"
        Mp3_DH1,
        //% block="下一曲"
        Mp3_DH2,
        //% block="上一曲"
        Mp3_DH3,
        //% block="Vol+"
        Mp3_DH4,
        //% block="Vol-"
        Mp3_DH5,
        //% block="OneStop"
        Mp3_DH6,
        //% block="单曲循环"
        Mp3_DH7,
        //% block="全局播放"
        Mp3_DH8,
        //% block="随机播放"
        Mp3_DH9,
    }

    export enum Motor_DH {
        //% block="正转"
        Right,
        //% block="反转"
        Left,
    }

    export enum PosNum {
        //%blockId=Led8x8_1
        //% block="1"
        PosNum1,
        //%blockId=Led8x8_2
        //% block="2"
        PosNum2,
        //%blockId=Led8x8_3
        //% block="3"
        PosNum3,
        //%blockId=Led8x8_4
        //% block="4"
        PosNum4,
        //%blockId=Led8x8_5
        //% block="5"
        PosNum5,
        //%blockId=Led8x8_6
        //% block="6"
        PosNum6,
        //%blockId=Led8x8_7
        //% block="7"
        PosNum7,
        //%blockId=Led8x8_8
        //% block="8"
        PosNum8,
        //%blockId=Led8x8_9
        //% block="9"
        PosNum9,
    }



    /**
    * Led8x8 driver blocks   ok
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_off
    //% block="8x8,位置%PosNum|,清空屏幕, 动画%Dh"
    export function Led8x8(PosNum: PosNum, Dh: Led8x8_DH): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e5d" + char + "  #"
        serial.writeString(projectInfo);
    }



    /**
    * Led8x8 driver blocks    ok
    
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    * @param s is the text will be show, eg: 'Hello!'
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_String
    //% block="8x8,位置%PosNum|显示字符串%s|动画%Dh|速度 %speed"
    //% speed.min=1 speed.max=6
    export function Led8x8_1(PosNum: PosNum, s: string, Dh: Led8x8_DH2, speed: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let Wv = 32 + Dh * 10 + speed;
        let length: number = s.length + 53; //48+5
        const char2 = asciiToChar(length);
        const char3 = asciiToChar(Wv);
        let projectInfo = "7e" + char2 + "d" + char + "!" + char3 + s + "#";
        serial.writeString(projectInfo);
    }

    /**
    * LedRGB driver blocks
    
    * @param LedRGB which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="LED_RGB"
    //% blockId=Led_RGB
    //% block="LedRGB,位置%PosNum|颜色R %Red|G %Green|B %Blue|动画%Dh"
    //% speed.min=1 speed.max=6
    //% Red.min=0 Red.max=255
    //% Green.min=0 Green.max=255
    //% Blue.min=0 Blue.max=255
    export function LedRGB(PosNum: PosNum, Red: number, Green: number, Blue: number, Dh: LedRGB_DH): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = Dh + 32 + 1;    // ASCII码对应
        const Red1 = Red % 10 + 32;
        Red = Red / 10 + 32;
        const Green1 = Green % 10 + 32;
        Green = Green / 10 + 32;
        const Blue1 = Blue % 10 + 32;
        Blue = Blue / 10 + 32;
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        const char3 = asciiToChar(Red);
        const char4 = asciiToChar(Red1);
        const char5 = asciiToChar(Green);
        const char6 = asciiToChar(Green1);
        const char7 = asciiToChar(Blue);
        const char8 = asciiToChar(Blue1);
        let projectInfo = "7e:e" + char + char2 + char3 + char4 + char5 + char6 + char7 + char8 + "#";
        serial.writeString(projectInfo);

    }

    /**
    * Mp3 driver blocks   ok!
    * @param Mp3 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Mp3"
    //% blockId=Mp3
    //% block="Mp3,位置%PosNum|%Dh"
    export function Mp3(PosNum: PosNum, Dh: Mp3_DH): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = Dh + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        let projectInfo = "7e4f" + char + char2  +"#"
        serial.writeString(projectInfo);
    }

    /**
    * Mp3 driver blocks   ok!
    * @param Mp3 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Mp3"
    //% blockId=Mp3_2
    //% block="Mp3,位置%PosNum|设置音量%Vol"
    //% Vol.min=0 Vol.max=28
    export function Mp3_2(PosNum: PosNum, Vol: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = Vol + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        let projectInfo = "7e5f" + char + "+" + char2 + "#"
        serial.writeString(projectInfo);
    }

    /**
* Mp3 driver blocks   ok!
* @param Mp3 which Led8x8 to turn on
* @param dir which direction to go
* @param speed how fast
*/
    //% subcategory="Mp3"
    //% blockId=Mp3_3
    //% block="Mp3,位置%PosNum|播放第 %Xq|首"
    //% Xq.min=1 Xq.max=10
    export function Mp3_3(PosNum: PosNum, Xq: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = Xq + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        let projectInfo = "7e5f" + char + "*" + char2 + "#"
        serial.writeString(projectInfo);
    }

    /**
        * Servo driver blocks   ok!
        
        * @param Servo_1 which Servo_1 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Servo"
    //% blockId=Servo
    //% block="180舵机,位置%PosNum|转到%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=1 speed.max=10
    export function Servo_360(PosNum: PosNum, Sc: number, speed: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = speed + 32; // ASCII码对应
        const Sc2 = Sc % 10 + 32; // ASCII码对应
        Sc = Sc / 10 + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        const char3 = asciiToChar(Sc);
        const char4 = asciiToChar(Sc2);
        let projectInfo = "7e6a" + char + char2 + char3 + char4 + "#" ;
        serial.writeString(projectInfo);
    }

    /**
    * Servo driver blocks   ok!
    * @param Servo which Servo to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Servo"
    //% blockId=Servo_2
    //% block="360舵机,位置%PosNum|pwm%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=1 speed.max=10
    export function Servo_180(PosNum: PosNum, Sc: number, speed: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = speed + 32; // ASCII码对应
        const Sc2 = Sc % 10 + 32; // ASCII码对应
        Sc = Sc / 10 + 32; // ASCII码对应
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        const char3 = asciiToChar(Sc);
        const char4 = asciiToChar(Sc2);
        let projectInfo = "7e6a" + char + char2 + char3 + char4 + "#";
        serial.writeString(projectInfo);
    }

    /**
        * Motorx1 driver blocks   ok!
        
        * @param Motorx1 which Motorx1 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Motor"
    //% blockId=Motorx1
    //% block="直流电机,位置%PosNum|转动方向%dir|速度 %speed"
    //% speed.min=0 speed.max=255
    export function Motorx1(PosNum: PosNum, dir: Motor_DH, speed: number): void {
        const asciiCode = PosNum + 32; // ASCII码对应
        const asciiCode2 = dir + 32; // ASCII码对应
        const asciiCode3 = speed + 32; // ASCII码对应
        const speed2 = speed % 10 + 32;
        speed = speed / 10 + 32;
        const char = asciiToChar(asciiCode);
        const char2 = asciiToChar(asciiCode2);
        const char3 = asciiToChar(speed);
        const char4 = asciiToChar(speed2);
        let projectInfo = "7e6b" + char + char2 + char3 + char4 +"#";
        serial.writeString(projectInfo);
    }
}