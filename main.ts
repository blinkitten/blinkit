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
