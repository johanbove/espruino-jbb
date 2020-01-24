require("Storage").write("+jbb",{
  "name":"Battery Level",
  "src":"-jbb"
});

require("Storage").write("-jbb",`
function getBatteryLevel() {
  const level = E.getBattery();
  // Clear the screen
  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("6x8",8); // bitmap font, 8x magnified
  // draw the current counter value
  g.drawString(level + '%', g.getWidth()/2, g.getHeight()/2);

  // again, 15 secs later
  setTimeout(getBatteryLevel, 15000);
}

getBatteryLevel();
`);
