require("Storage").write("+jbb",{
  "name":"Battery Level",
  "src":"-jbb"
});

require("Storage").write("-jbb",`
let chargingBlinker;

function getBatteryLevel() {
  const level = E.getBattery();
  
  // Clear the screen
  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("6x8",8); // bitmap font, 8x magnified
  // draw the current counter value
  g.drawString(level + '%', g.getWidth()/2, g.getHeight()/2);
  
  console.log(level);

  if (checkIsCharging() && level >= 99) {
    clearInterval(chargingBlinker);
    LED2.write(1);
  }

  // again, 5 secs later
  setTimeout(getBatteryLevel, 5000);
}

function blinkGreen() {
  let on = false;
  return setInterval(function() {
    on = !on;
    LED2.write(on);
  }, 500);
}

function checkIsCharging() {
  const isCharging = Bangle.isCharging();
  console.log(isCharging);
  if (chargingBlinker) {
    clearInterval(chargingBlinker);
  }
  if (isCharging) {
    chargingBlinker = blinkGreen();
  }
  return isCharging;
}

getBatteryLevel();
`);
