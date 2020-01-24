require("Storage").write("+jbb",{
  "name":"Battery Level",
  "src":"-jbb"
});

require("Storage").write("-jbb",`
let chargingBlinker;
let level;

function draw() {
  // Clear the screen
  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("6x8",8); // bitmap font, 8x magnified
  // draw the current counter value
  g.drawString(level + '%', g.getWidth()/2, g.getHeight()/2);
}

function getBatteryLevel() {
  level = E.getBattery();
  console.log(level);

  draw();  

  // again, 10 secs later
  setTimeout(getBatteryLevel, 10000);
}
function blinkGreen() {
  let on = false;
  return setInterval(function() {
    on = !on;
    LED2.write(on);
  }, 500);
}
function checkChargingfunction(charging, level) {
  console.log(charging);
  if (!charging || chargingBlinker) {
    clearInterval(chargingBlinker);
  }
  if (charging) {
    chargingBlinker = blinkGreen();
    if (level >= 99) {
      clearInterval(chargingBlinker);
      LED2.write(1);
    }
  }
}
checkChargingfunction(Bangle.isCharging(), level);
Bangle.on('charging', function(charging) { checkChargingfunction(charging, level); });
getBatteryLevel();
`);
