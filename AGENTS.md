# SYSTEM PROMPT & PROJECT CONTEXT FOR AI AGENT

## 1. Project Overview & Tech Stack
- **Framework**: React Native with Expo.
- **Styling**: NativeWind (Tailwind CSS for React Native).
- **Machine Learning**: `react-native-fast-tflite` running MobileNetV2 `.tflite` models.
- **Goal**: Smart Plant Disease Detection App.

## 2. Strict Rules & Guardrails (DO NOT VIOLATE)
- **`metro.config.js`**: DO NOT modify or reset this file. It has been strictly configured to resolve `.tflite` asset loading without breaking NativeWind.
- **App Build Process**: Due to local hardware limitations, APK builds MUST always be directed using Expo EAS Cloud Build with the command: `eas build --profile development --platform android`. Do not suggest local Android Studio builds.
- **Tensor Processing & Normalization**: You must strictly follow the existing logic for converting images to Float32 arrays. Do not invent new tensor manipulation methods. Inputs are `[1, 224, 224, 3]`.

## 3. Current Task: "Pindai Cepat" (Quick Scan) Feature
We are currently building a new "Pindai Cepat" feature to automate plant selection. 

### A. UI/UX Flow
1. **Bottom Navigation**: Add a prominent camera logo in the center of the bottom navigation bar representing "Pindai Cepat".
2. **Scan Page**: When clicked, route the user to a dedicated Quick Scan screen with options for Camera (`takePhoto`) and Gallery (`pickImage`).

### B. Two-Stage Machine Learning Pipeline
Inference must happen in two stages:
1. **Stage 1: Leaf Classification**
   - Run the image through the newly trained Leaf Classification MobileNetV2 model.
   - The output classes for Stage 1 are exactly: `['Cabai', 'Jagung', 'Padi', 'Tomat']`.
2. **Stage 2: Disease Routing & Classification**
   - Based on the prediction from Stage 1, automatically route the same image to the specific disease model for that plant.
   - Example: If Stage 1 detects "Jagung", pass the same image buffer to the Corn Disease `.tflite` model to classify its specific disease.

## 4. Reference Code: Image Processing Pipeline
When building the "Pindai Cepat" inference logic, strictly reference and adapt the following working pattern for image resizing, base64 to buffer conversion, and Float32 array creation:

```javascript
  const processAndPredict = async (uri: string) => {
    try {
      setImageUri(uri);

      const resized = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 224, height: 224 } }],
        { format: ImageManipulator.SaveFormat.JPEG },
      );

      const base64 = await FileSystem.readAsStringAsync(resized.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buffer = Buffer.from(base64, "base64");
      const rawImageData = jpeg.decode(buffer, { useTArray: true });

      const rgbData = new Float32Array(224 * 224 * 3);
      let rgbIndex = 0;
      for (let i = 0; i < rawImageData.data.length; i += 4) {
        rgbData[rgbIndex++] = rawImageData.data[i];
        rgbData[rgbIndex++] = rawImageData.data[i + 1];
        rgbData[rgbIndex++] = rawImageData.data[i + 2];
      }

      if (model) {
        const output = await model.run([rgbData.buffer]);
        if (!output || output.length === 0) return;

        const resultTensor = output[0];
        const floatOutput = new Float32Array(resultTensor.buffer || resultTensor);

        let maxConfidence = 0;
        let maxIndex = 0;
        for (let i = 0; i < floatOutput.length; i++) {
          if (floatOutput[i] > maxConfidence) {
            maxConfidence = floatOutput[i];
            maxIndex = i;
          }
        }

        // AGENT NOTE: Adapt the class mapping below based on whether this is Stage 1 (Leaf Type) or Stage 2 (Disease)
        const namaPenyakit = KELAS_CABAI[maxIndex] || `Kelas ${maxIndex}`;
        const persentase = (maxConfidence * 100).toFixed(2);
        setResult({
          namaPenyakit,
          persentase,
          kelas: maxIndex,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };