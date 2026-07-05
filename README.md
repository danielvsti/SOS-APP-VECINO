# SOS-APP-VECINO v26

App móvil nativa base para iOS/Android usando Capacitor.

Incluye:
- PWA Vecino empaquetada localmente.
- Retiro temporal de botones de llamada/videollamada.
- Detección por sensores: triple agitación = alerta VIF silenciosa.
- Detección de posible caída con confirmación antes de enviar alerta médica/accidente.

## Primer uso en Mac

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

En Xcode:
1. App > Signing & Capabilities.
2. Automatically manage signing.
3. Seleccionar tu Team / Apple ID.
4. Seleccionar iPhone o simulador.
5. Run.

## Android

```bash
npx cap add android
npx cap sync android
npx cap open android
```

## Info.plist sugerido

Agregar en `ios/App/App/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Usamos tu ubicación para enviar la posición exacta cuando generas una alerta SOS.</string>
<key>NSCameraUsageDescription</key>
<string>Usamos la cámara para adjuntar evidencia visual a una emergencia.</string>
<key>NSMicrophoneUsageDescription</key>
<string>Usamos el micrófono para grabar mensajes de audio asociados a una emergencia.</string>
<key>NSMotionUsageDescription</key>
<string>Usamos sensores de movimiento para detectar triple agitación o posible caída mientras la app está abierta.</string>
```
