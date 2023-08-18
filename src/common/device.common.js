const DeviceType = {
	Mobile: "mobile",
	Desktop: "desktop",
	Tablet: "tablet",
	Unknown: "unknown"
}

function getDeviceType() {
    const platform = navigator.userAgentData.platform.toLowerCase();
    if (
      /(android|webos|iphone|ipad|ipod|blackberry|windows phone)/.test(
        platform
      )
    ) {
      return DeviceType.Mobile
    } else if (/mac|win|linux/i.test(platform)) {
        return DeviceType.Desktop
    } else if (/tablet|ipad/i.test(platform)) {
        return DeviceType.Tablet
    } else {
        return DeviceType.Unknown
    }
}

const deviceType = getDeviceType()

export default deviceType