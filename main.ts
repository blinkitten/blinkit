/**
 * Blocks for Blinkit Board
 */
//% weight=100 color=#0855AA icon="\uf0ca" block="Blinkit"
namespace Blinkit_driver {
    let s3: string
    let blinkitten_sensor: number[][] = [];
    for (let i = 0; i < 20; i++) {
        blinkitten_sensor[i] = [];
        for (let j = 0; j < 9; j++) {
            blinkitten_sensor[i][j] = 0;
        }
    }

    /**
     * BLINKIT initialize
     */
    //% blockId="BLINKIT_Serial_init" block="初始化BLINKIT"
    //% weight=100 blockGap=8
    //% parts=BLINKIT_Serial trackArgs=0
    export function init() {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate9600
        )
        basic.pause(200);
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
            const OutValue = Sc / 10 + 48; // ASCII码对应
            Sc = Sc % 10;
            const char = asciiToChar(OutValue);
            let projectInfo = "7e41" + char + Sc + "#";
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            const OutValue = Sc / 10 + 48; // ASCII码对应
            Sc = Sc % 10;
            const char = asciiToChar(OutName);
            const char2 = asciiToChar(OutValue);
            let projectInfo = "7e54" + char + char2 + Sc + "#";
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
            Outmode = Outmode + 1; // ASCII码对应
            let projectInfo = "7e30" + Outmode + "#";
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            Outmode = Outmode + 1; // ASCII码对应
            const char = asciiToChar(OutName);
            let projectInfo = "7e43" + char + Outmode + "#";
            serial.writeString(projectInfo);
        }
    }

    /**
            * Sensor driver blocks 
            * @param Sensor which Sensor to turn on
            * @param dir which direction to go
            * @param speed how fast
            */
    //% blockId=Sensor_value_auto
    //% block="启用blinkit传感器"
    export function normal3(): void {
        //let s: string
        let c = serial.read();
        if(c!=-1)
        {
            // let s: string = ""
            // while (c != 10) {
            //     s = s + asciiToChar(c)
            //     basic.pause(3)
            //     c = serial.read();
            // }
            // basic.showString(s)
            // basic.pause(150)
            // basic.clearScreen()

            let s: string = asciiToChar(c) + serial.readUntil(serial.delimiters(Delimiters.NewLine))//从串口读取 直到回车 A0=123          
                       
            let length: number = s.length;
            if (length > 3 && s[2] == "=") {
                let value_s: string = ""
                for (let index = 3; index < length; index++) {  //A0=1 23
                    value_s += s[index]
                }
                let value_n: number = +value_s;
                // basic.showNumber(value_n)
                // basic.pause(150)
                // basic.clearScreen()
                let a: number = s.charCodeAt(0) - 65
                let b: number = +s[1]
                if (a >= 0 && b >= 0 && value_n >= 0) {
                    blinkitten_sensor[a][b] = value_n

                }
            }
            
            //basic.pause(10);
        }       
    }

    /**
            * Sensor driver blocks 
            * @param Sensor which Sensor to turn on
            * @param dir which direction to go
            * @param speed how fast
            */
    //% blockId=Sensor_value
    //% block="获取%SensorName|%PosNum|数据"
    //获取传感器数值 存入数组中
    export function Sensor(SensorName: SensorName, PosNum: PosNum): void {
        SensorName = SensorName + 65;
        const char = asciiToChar(SensorName);
        let projectInfo = "7e4" + char + PosNum + "0#"
        serial.writeString(projectInfo)

        // let s: string = ""
        // s = serial.readUntil(serial.delimiters(Delimiters.NewLine))//从串口读取 直到回车 A0=123
        // let length: number = s.length;
        // //if (length > 3) {
        // if (s[2] == '=') {
        //     let value_s: string = ""
        //     for (let index = 3; index < length; index++) {  //A0=123
        //         value_s += s[index]
        //     }
        //     let valus_n: number = +value_s;
        //     let a: number = s.charCodeAt(0) - 65
        //     let b: number = +s[1]
        //     if (a >= 0 && b >= 0 && valus_n >= 0) {
        //         blinkitten_sensor[a][b] = valus_n
        //     }
        // }
    }


    function asciiToChar(asciiCode: number): string {
        // 使用String.fromCharCode方法将ASCII码转换为字符  
        return String.fromCharCode(asciiCode);
    }

    export enum SensorName {
        //% block="Light"
        Sensor0,
        //% block="Click"
        Sensor1,
        //% block="joystick"
        Sensor2,
        //% block="Angle"
        Sensor3,
        //% block="Push"
        Sensor4,
        //% block="ASR"
        Sensor5,
        //% block="Title"
        Sensor6,
        //% block="Touch"
        Sensor7,
        //% block="TEMP&HUM"
        Sensor8,
        //% block="Distance"
        Sensor9,
        //% block="Soil Moisture"
        Sensor10,
        //% block="Gesture"
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
    export enum Led8x8_DH3 {
        //% block="熄灭"
        Off,
        //% block="点亮"
        On,
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
    //% block="Led_8x8%PosNum|,清空屏幕, 动画%Dh"
    export function Led8x8(PosNum: PosNum, Dh: Led8x8_DH): void {
        let projectInfo = "7e5d" + PosNum + "0" + Dh + "#"
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
    //% block="Led_8x8%PosNum|显示文本%s|动画%Dh|速度%speed"
    //% speed.min=1 speed.max=6
    export function Led8x8_1(PosNum: PosNum, s: string, Dh: Led8x8_DH2, speed: number): void {
        let Wv = 48 + Dh * 10 + speed;
        let length: number = s.length + 53; //48+5
        const char = asciiToChar(length);
        const char2 = asciiToChar(Wv);
        let projectInfo = "7e" + char + "d" + PosNum + 1 + char2 + s + "#";
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
    //% blockId=Led8x8_onoff
    //% block="Led_8x8%PosNum|坐标X:%L_l|坐标Y:%L_h|%Dh"
    //% L_l.min=1 L_l.max=8
    //% L_h.min=1 L_h.max=8
    export function Led8x8_3(PosNum: PosNum, L_l: number, L_h: number, Dh: Led8x8_DH3): void {
        let L_n = L_l + L_h * 8 - 9 + 48;
        const char = asciiToChar(L_n);
        let projectInfo = "7e6d" + PosNum + "3" + Dh + char + "#";
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
    //% blockId=Led8x8_move
    //% block="Led_8x8%PosNum 熄灭|坐标X:%L_l坐标Y:%L_h|点亮|坐标X:%L_l2坐标Y:%L_h2"
    //% L_l.min=1 L_l.max=8
    //% L_h.min=1 L_h.max=8
    //% L_l2.min=1 L_l2.max=8
    //% L_h2.min=1 L_h2.max=8
    export function Led8x8_4(PosNum: PosNum, L_l: number, L_h: number, L_l2: number, L_h2: number): void {
        let L_n = L_l + L_h * 8 - 9 + 48;
        let L_n2 = L_l2 + L_h2 * 8 - 9 + 48;
        const char = asciiToChar(L_n);
        const char2 = asciiToChar(L_n2);
        let projectInfo = "7e6d" + PosNum + "4" + char + char2 + "#";
        serial.writeString(projectInfo);
    }

    /**
    * LedRGB driver blocks
    * @param LedRGB which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Led_RGB"
    //% blockId=Led_RGB
    //% block="Led_RGB%PosNum|颜色R %Red|G %Green|B %Blue|动画%Dh"
    //% speed.min=1 speed.max=6
    //% Red.min=0 Red.max=255
    //% Green.min=0 Green.max=255
    //% Blue.min=0 Blue.max=255
    export function LedRGB(PosNum: PosNum, Red: number, Green: number, Blue: number, Dh: LedRGB_DH): void {
        Dh = Dh + 1;    // ASCII码对应
        const Red1 = Red % 10;
        Red = Red / 10 + 48;
        const Green1 = Green % 10;
        Green = Green / 10 + 48;
        const Blue1 = Blue % 10;
        Blue = Blue / 10 + 48;
        const char = asciiToChar(Red);
        const char2 = asciiToChar(Green);
        const char3 = asciiToChar(Blue);
        let projectInfo = "7e:e" + PosNum + Dh + char + Red1 + char2 + Green1 + char3 + Blue1 + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Player driver blocks   ok!
    * @param Player which Player to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Player"
    //% blockId=Player
    //% block="Player%PosNum|%Dh"
    export function Player(PosNum: PosNum, Dh: Mp3_DH): void {
        let projectInfo = "7e4f" + PosNum + Dh + "#"
        serial.writeString(projectInfo);
    }

    /**
    * Player driver blocks   ok!
    * @param Player which Player to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Player"
    //% blockId=Player_2
    //% block="Player%PosNum|设置音量%Vol"
    //% Vol.min=0 Vol.max=28
    export function Player_2(PosNum: PosNum, Vol: number): void {
        const asciiCode = Vol + 48; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e5f" + PosNum + ";" + char + "#"
        serial.writeString(projectInfo);
    }

    /**
* Player driver blocks   ok!
* @param Player which Led8x8 to turn on
* @param dir which direction to go
* @param speed how fast
*/
    //% subcategory="Player"
    //% blockId=Player_3
    //% block="Player%PosNum|播放第 %Xq|首"
    //% Xq.min=1 Xq.max=10
    export function Player_3(PosNum: PosNum, Xq: number): void {
        const asciiCode = Xq + 48; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e5f" + PosNum + ":" + char + "#"
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
    //% block="Servo_180%PosNum|转到%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=0 speed.max=8
    export function Servo_360(PosNum: PosNum, Sc: number, speed: number): void {
        const Sc2 = Sc % 10;
        Sc = Sc / 10 + 48; // ASCII码对应
        const char = asciiToChar(Sc);
        let projectInfo = "7e6a" + PosNum + speed + char + Sc2 + "#";
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
    //% block="Servo_360%PosNum|pwm%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=0 speed.max=9
    export function Servo_180(PosNum: PosNum, Sc: number, speed: number): void {
        const Sc2 = Sc % 10;
        Sc = Sc / 10 + 48; // ASCII码对应
        const char = asciiToChar(Sc);
        let projectInfo = "7e6a" + PosNum + speed + char + Sc2 + "#";
        serial.writeString(projectInfo);
    }

    /**
        * Motorx1 driver blocks    !ok!
        
        * @param Motorx1 which Motorx1 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Motor"
    //% blockId=Motorx1
    //% block="Motor%PosNum|转动方向%dir|速度 %speed"
    //% speed.min=0 speed.max=255
    export function Motorx1(PosNum: PosNum, dir: Motor_DH, speed: number): void {
        const speed2 = speed % 10;
        speed = speed / 10 + 48;
        const char = asciiToChar(speed);
        let projectInfo = "7e6b" + PosNum + dir + char + speed2 + "#";
        serial.writeString(projectInfo);
    }

    /**
     * 
     */
    //% weight=10
    //% blockId=kb_event block="%SensorName|%PosNum"
    export function ping(SensorName: SensorName, PosNum: PosNum): number {
        let value_n = blinkitten_sensor[SensorName][PosNum]
        return value_n
    }

    /**
    * Line tracking sensor event function
    */
    //% weight=2
    //% blockId=1234_event block="如果%value|%vi|数值 > %xx "

    //export function ltEvent(SensorName: SensorName, PosNum: PosNum, xx: number, a: Action) {
    // SensorName = SensorName + 65;
    // const char = asciiToChar(SensorName);
    // let projectInfo = "7e4" + char + PosNum + "0#"
    // serial.writeString(projectInfo)
    // basic.pause(500)

    //let s = serial.readUntil(serial.delimiters(Delimiters.NewLine))//从串口读取 直到回车
    //basic.showString(s)
    // let Wv = 48 + 20 + 4;
    // let length: number = s.length + 53; //48+5
    // const char2 = asciiToChar(length);
    // const char3 = asciiToChar(Wv);
    // s3 = "7e" + char2 + "d" + PosNum + 1 + char3 + s + "#";
    //serial.writeString(s3);
    //}
    //basic.forever(() => {
    //serial.writeString("7e301#");
    //serial.writeString(s2);
    //serial.writeString(s3);
    //basic.showIcon(IconNames.Heart)
    //basic.pause(500);
    //basic.clearScreen()
    //basic.pause(2500);
    //s3 = "";
    //})



}



// for (let index = 0; index < dataLen; index++) {
//     version += String.fromCharCode(buf[index])
// }

// while (serial.available() > 0) {
//     const c = serial.read()
//     s += c
//     basic.pause(5)
// }