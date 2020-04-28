export default async (video) => {
  console.log("Load camera")
  console.log(video)
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.")
    return
  }

  const deviceIds = await navigator.mediaDevices.enumerateDevices()
  const videoDeviceIds = []

  deviceIds.forEach(function (deviceId) {
    if (deviceId.kind === "videoinput") {
      videoDeviceIds.push(deviceId)
    }
  })

  for (let i = 0; i < 1; i++) {
    if (getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
        .then(function (stream) {
          video.current.srcObject = stream
        })
        .catch(function (error) {
          console.log(error)
          console.log("Something went wrong!")
        })
    }
  }
}
