const ws = new WebSocket("ws://localhost:3500");
ws.addEventListener("message", (commandData) => {
        var command = JSON.parse(commandData.data)
        console.log(commandData.data)
        var imgData = new Image();
        imgData.crossOrigin = "Anonymous";
        imgData.src = command.load;
        console.log(imgData)
        imgData.onload = () => {
            function getImageRow(rowNum) {
                const context = document.createElement('canvas').getContext('2d');
                context.drawImage(imgData, 0, 0);
                var pixelRow = context.getImageData(10, 10, context.canvas.width, rowNum);
                //console.log(pixelRow)
                //data {pixel 1:[r,g,b,a]}
                var imageRow = []
                    //console.log(pixelRow.data)
                for (var i = 0; pixelRow.data.length / 4 > i; i++) {
                    var pixels = []
                    for (var j = 0; j < 4; j++) {
                        var counter = i * 4 + j
                        pixels[j] = pixelRow.data[counter]
                    }
                    imageRow[i] = pixels
                }
                return imageRow
            }
            var img = []
            var height = imgData.height
            for (var counter = 0; counter < height; counter++) {
                console.log(counter)
                img[counter] = getImageRow(counter + 1)
            }
            console.log(JSON.stringify(img))
            for (var counter = 0; counter < img.length; counter++) {
                var res = {}
                res[counter] = `${counter}:${JSON.stringify(img[counter])}`
                ws.send(JSON.stringify(
                    img[counter]
                ))
            }
        }
    })
    /*(async function() {
    var res = await getImageRow(1, 'https://picsum.photos/200/300')
    console.log(res)
    })*/