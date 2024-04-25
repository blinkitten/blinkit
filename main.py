"""

Blocks for Blinkit Board

"""
# % weight=100 color=#0855AA icon="\uf21c" block="Blinkit"
@namespace
class Blinkit_driver:
    """
    
    BLINKIT initialize
    
    """
    # % blockId="BLINKIT_I2C_init" block="初始化BLINKIT"
    # % weight=100 blockGap=8
    # % parts=BLINKIT_I2C trackArgs=0
    def init():
        serial.redirect(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE9600)
    """
    
    normal2 driver blocks   ok
    @param normal2 which normal2 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % blockId=normal2
    # % block="指定%OutmodeName|Direct Drive %Sc"
    # % Sc.min=0 Sc.max=180
    def normal2(OutmodeName: OutmodeName, Sc: number):
        if OutmodeName == 0:
            OutValue = Sc / 10 + 32
            # ASCII码对应
            OutValue2 = Sc % 10 + 32
            # ASCII码对应
            char = asciiToChar(OutValue)
            char2 = asciiToChar(OutValue2)
            projectInfo = "7e41" + char + char2 + "#"
            serial.write_string(projectInfo)
        else:
            OutName = OutmodeName + 96
            # ASCII码对应
            OutValue3 = Sc / 10 + 32
            # ASCII码对应
            OutValue22 = Sc % 10 + 32
            # ASCII码对应
            char3 = asciiToChar(OutName)
            char22 = asciiToChar(OutValue3)
            char32 = asciiToChar(OutValue22)
            projectInfo2 = "7e54" + char3 + char22 + char32 + "#"
            serial.write_string(projectInfo2)
    """
    
    normal driver blocks   ok
    @param normal which normal to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % blockId=normal
    # % block="指定%OutmodeName|触发 %Outmode"
    def normal(OutmodeName2: OutmodeName, Outmode: Outmode):
        if OutmodeName2 == 0:
            OutValue4 = Outmode + 32
            # ASCII码对应
            char4 = asciiToChar(OutValue4)
            projectInfo3 = "7e30" + char4 + "#"
            serial.write_string(projectInfo3)
        else:
            OutName2 = OutmodeName2 + 96
            # ASCII码对应
            OutValue5 = Outmode + 32
            # ASCII码对应
            char5 = asciiToChar(OutName2)
            char23 = asciiToChar(OutValue5)
            projectInfo4 = "7e43" + char5 + char23 + "#"
            serial.write_string(projectInfo4)
    """
    
    Sensor driver blocks
    @param Sensor which Sensor to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % blockId=Sensor_value
    # % block="如果%SensorName|%PosNum|数据> %Min"
    def Sensor(SensorName: SensorName, PosNum: PosNum, Min: number):
        asciiCode = PosNum + 32
        # ASCII码对应
        char6 = asciiToChar(asciiCode)
        projectInfo5 = "7e30" + char6 + "#"
        serial.write_string(projectInfo5)
    """
    
    Sensor driver blocks
    @param Sensor which Sensor to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % blockId=Sensor_value2
    # % block="如果%SensorName|%PosNum|数据< %Max"
    def Sensor2(SensorName2: SensorName, PosNum2: PosNum, Max: number):
        asciiCode2 = PosNum2 + 32
        # ASCII码对应
        char7 = asciiToChar(asciiCode2)
        projectInfo6 = "7e30" + char7 + "#"
        serial.write_string(projectInfo6)
    """
    
    Returns the distance to an object in a range from 1 to 300 centimeters or up to 118 inch.
    The maximum value is returned to indicate when no object was detected.
    -1 is returned when the device is not connected.
    @param unit unit of distance, eg: DistanceUnit.CM
    
    """
    # % blockId="Sensor_value3"
    # % block="获取%SensorName|%PosNum|数据"
    # % weight=60
    def Sensor3(SensorName3: SensorName, PosNum3: PosNum):
        if True:
            return "1"
        basic.pause(0)
        # yield to allow background processing when called in a tight loop
        return "2"
    def asciiToChar(asciiCode3: number):
        # 使用String.fromCharCode方法将ASCII码转换为字符  
        return String.from_char_code(asciiCode3)
    # % block="光敏电阻"
    # % block="按键"
    # % block="摇杆"
    # % block="旋钮电位器"
    # % block="推杆电位器"
    # % block="语音识别"
    # % block="倾斜"
    # % block="触摸"
    # % block="温湿度"
    # % block="激光测距"
    # % block="土壤湿度"
    # % block="手势"
    class SensorName4(Enum):
        Sensor0 = 0
        Sensor1 = 1
        Sensor2 = 2
        Sensor3 = 3
        Sensor4 = 4
        Sensor5 = 5
        Sensor6 = 6
        Sensor7 = 7
        Sensor8 = 8
        Sensor9 = 9
        Sensor10 = 10
        Sensor11 = 11
    # % block="All"
    # % block="舵机"
    # % block="直流电机"
    # % block="Led8x8"
    # % block="LED_RGB"
    # % block="Mp3"
    class OutmodeName3(Enum):
        Outmode0 = 0
        Outmode1 = 1
        Outmode2 = 2
        Outmode3 = 3
        Outmode4 = 4
        Outmode5 = 5
    # % block="1"
    # % block="2"
    # % block="3"
    # % block="4"
    # % block="5"
    # % block="6"
    # % block="7"
    # % block="8"
    class Outmode6(Enum):
        Outmode0 = 0
        Outmode1 = 1
        Outmode2 = 2
        Outmode3 = 3
        Outmode4 = 4
        Outmode5 = 5
        Outmode6 = 6
        Outmode7 = 7
    # % block="向右"
    # % block="向左"
    # % block="变化"
    class Led8x8_DH2(Enum):
        Right = 0
        Left = 1
        Change = 2
    # % block="随机"
    # % block="环绕"
    # % block="折弯"
    # % block="扫描"
    # % block="直接"
    class Led8x8_DH(Enum):
        DH2_1 = 0
        DH2_2 = 1
        DH2_3 = 2
        DH2_4 = 3
        DH2_5 = 4
    # % block="无"
    # % block="渐变"
    class LedRGB_DH(Enum):
        Wu = 0
        Change = 1
    # % block="暂停"
    # % block="播放"
    # % block="下一曲"
    # % block="上一曲"
    # % block="Vol+"
    # % block="Vol-"
    # % block="OneStop"
    # % block="单曲循环"
    # % block="全局播放"
    # % block="随机播放"
    class Mp3_DH(Enum):
        Mp3_DH0 = 0
        Mp3_DH1 = 1
        Mp3_DH2 = 2
        Mp3_DH3 = 3
        Mp3_DH4 = 4
        Mp3_DH5 = 5
        Mp3_DH6 = 6
        Mp3_DH7 = 7
        Mp3_DH8 = 8
        Mp3_DH9 = 9
    # % block="正转"
    # % block="反转"
    class Motor_DH(Enum):
        Right = 0
        Left = 1
    # %blockId=Led8x8_1
    # % block="1"
    # %blockId=Led8x8_2
    # % block="2"
    # %blockId=Led8x8_3
    # % block="3"
    # %blockId=Led8x8_4
    # % block="4"
    # %blockId=Led8x8_5
    # % block="5"
    # %blockId=Led8x8_6
    # % block="6"
    # %blockId=Led8x8_7
    # % block="7"
    # %blockId=Led8x8_8
    # % block="8"
    # %blockId=Led8x8_9
    # % block="9"
    class PosNum4(Enum):
        PosNum1 = 0
        PosNum2 = 1
        PosNum3 = 2
        PosNum4 = 3
        PosNum5 = 4
        PosNum6 = 5
        PosNum7 = 6
        PosNum8 = 7
        PosNum9 = 8
    """
    
    Led8x8 driver blocks   ok
    @param Led8x8 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="8x8"
    # % blockId=Led8x8_off
    # % block="8x8,位置%PosNum|,清空屏幕, 动画%Dh"
    def Led8x8(PosNum10: PosNum, Dh: Led8x8_DH):
        asciiCode4 = PosNum10 + 32
        # ASCII码对应
        char8 = asciiToChar(asciiCode4)
        projectInfo7 = "7e5d" + char8 + "  #"
        serial.write_string(projectInfo7)
    """
    
    Led8x8 driver blocks
    
    @param Led8x8 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    @param s is the text will be show, eg: 'Hello!'
    
    """
    # % subcategory="8x8"
    # % blockId=Led8x8_String
    # % block="8x8,位置%PosNum|显示字符串%s|动画%Dh|速度 %speed"
    # % speed.min=1 speed.max=6
    def Led8x8_1(PosNum11: PosNum, s: str, Dh2: Led8x8_DH2, speed: number):
        asciiCode5 = PosNum11 + 32
        # ASCII码对应
        char9 = asciiToChar(asciiCode5)
        projectInfo8 = "7e30" + char9 + "#"
        serial.write_string(projectInfo8)
    """
    
    LedRGB driver blocks
    
    @param LedRGB which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="LED_RGB"
    # % blockId=Led_RGB
    # % block="LedRGB,位置%PosNum|颜色R %Red|G %Green|B %Blue|动画%Dh"
    # % speed.min=1 speed.max=6
    # % Red.min=0 Red.max=255
    # % Green.min=0 Green.max=255
    # % Blue.min=0 Blue.max=255
    def LedRGB(PosNum12: PosNum, Red: number, Green: number, Blue: number, Dh3: LedRGB_DH):
        asciiCode6 = PosNum12 + 32
        # ASCII码对应
        char10 = asciiToChar(asciiCode6)
        projectInfo9 = "7e30" + char10 + "#"
        serial.write_string(projectInfo9)
    """
    
    Mp3 driver blocks
    @param Mp3 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Mp3"
    # % blockId=Mp3
    # % block="Mp3,位置%PosNum|动画%Dh"
    def Mp3(PosNum13: PosNum, Dh4: Mp3_DH):
        asciiCode7 = PosNum13 + 32
        # ASCII码对应
        char11 = asciiToChar(asciiCode7)
        projectInfo10 = "7e30" + char11 + "#"
        serial.write_string(projectInfo10)
    """
    
    Mp3 driver blocks
    @param Mp3 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Mp3"
    # % blockId=Mp3_2
    # % block="Mp3,位置%PosNum|设置音量%Vol"
    # % Vol.min=0 Vol.max=28
    def Mp3_2(PosNum14: PosNum, Vol: number):
        asciiCode8 = PosNum14 + 32
        # ASCII码对应
        char12 = asciiToChar(asciiCode8)
        projectInfo11 = "7e30" + char12 + "#"
        serial.write_string(projectInfo11)
    """
    
    Mp3 driver blocks
    @param Mp3 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Mp3"
    # % blockId=Mp3_3
    # % block="Mp3,位置%PosNum|播放第 %Xq|首"
    # % Xq.min=1 Xq.max=10
    def Mp3_3(PosNum15: PosNum, Xq: number):
        asciiCode9 = PosNum15 + 32
        # ASCII码对应
        char13 = asciiToChar(asciiCode9)
        projectInfo12 = "7e30" + char13 + "#"
        serial.write_string(projectInfo12)
    """
    
    Servo driver blocks
    
    @param Servo_1 which Servo_1 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Servo"
    # % blockId=Servo
    # % block="180舵机,位置%PosNum|转到%Sc|速度 %speed"
    # % Sc.min=0 Sc.max=180
    # % speed.min=1 speed.max=10
    def Servo_360(PosNum16: PosNum, Sc2: number, speed2: number):
        asciiCode10 = PosNum16 + 32
        # ASCII码对应
        char14 = asciiToChar(asciiCode10)
        projectInfo13 = "7e30" + char14 + "#"
        serial.write_string(projectInfo13)
    """
    
    Servo driver blocks
    
    @param Led8x8 which Led8x8 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Servo"
    # % blockId=Servo_2
    # % block="360舵机,位置%PosNum|pwm%Sc|速度 %speed"
    # % Sc.min=0 Sc.max=180
    # % speed.min=1 speed.max=10
    def Servo_180(PosNum17: PosNum, Sc3: number, speed3: number):
        asciiCode11 = PosNum17 + 32
        # ASCII码对应
        char15 = asciiToChar(asciiCode11)
        projectInfo14 = "7e30" + char15 + "#"
        serial.write_string(projectInfo14)
    """
    
    Motorx1 driver blocks
    
    @param Motorx1 which Motorx1 to turn on
    @param dir which direction to go
    @param speed how fast
    
    """
    # % subcategory="Motor"
    # % blockId=Motorx1
    # % block="直流电机,位置%PosNum|转动方向%dir|速度 %speed"
    # % speed.min=0 speed.max=255
    def Motorx1(PosNum18: PosNum, dir2: Motor_DH, speed4: number):
        asciiCode12 = PosNum18 + 32
        # ASCII码对应
        char16 = asciiToChar(asciiCode12)
        projectInfo15 = "7e30" + char16 + "#"
        serial.write_string(projectInfo15)