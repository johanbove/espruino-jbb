require("Storage").write("+jbb",{
  "name":"Battery Level",
  "src":"-jbb"
});

require("Storage").write("-jbb",`
let chargingBlinker;

function draw(level) {
  console.log('draw', level);
  // Clear the screen
  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("6x8",8); // bitmap font, 8x magnified
  // draw the current counter value
  g.drawString(level.toString() + '%', g.getWidth()/2, g.getHeight()/2);
}

function getBatteryLevel() {
  level = E.getBattery();
  console.log('getBatteryLevel', level);

  draw(level);

  // again, 10 secs later
  setTimeout(getBatteryLevel, 10E3);
}

function blinkGreen() {
  let on = false;
  return setInterval(function() {
    on = !on;
    LED2.write(on);
  }, 500);
}

function checkChargingfunction(charging) {
  console.log('checkChargingfunction', charging);
  LED2.write(charging);
}

function main() {
  console.log('starting jbb version 0.0.1');
  getBatteryLevel();
}

Bangle.on('charging', function(isCharging) {
  getBatteryLevel();
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

main();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
`);
