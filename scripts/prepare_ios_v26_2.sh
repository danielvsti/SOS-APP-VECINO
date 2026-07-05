#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
APP_DELEGATE="ios/App/App/AppDelegate.swift"
PLIST="ios/App/App/Info.plist"

if [ ! -f "$APP_DELEGATE" ] || [ ! -f "$PLIST" ]; then
  echo "No encuentro ios/App/App/AppDelegate.swift o ios/App/App/Info.plist."
  echo "Ejecuta este script desde la carpeta raíz del proyecto SOS-APP-VECINO-v26."
  exit 1
fi

python3 - <<'PY'
from pathlib import Path
p = Path('ios/App/App/AppDelegate.swift')
s = p.read_text()
needle = 'func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {'
if 'application.applicationSupportsShakeToEdit = false' not in s:
    if needle not in s:
        raise SystemExit('No encontré didFinishLaunchingWithOptions en AppDelegate.swift.')
    s = s.replace(needle, needle + '\n        // SOS Municipal: usamos la agitación del teléfono como gesto de emergencia.\n        // Desactivamos el diálogo nativo de iOS "Undo/Redo" por shake.\n        application.applicationSupportsShakeToEdit = false', 1)
    p.write_text(s)
PY

add_or_set() {
  local key="$1"
  local value="$2"
  /usr/libexec/PlistBuddy -c "Add :$key string $value" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Set :$key $value" "$PLIST"
}

add_or_set NSLocationWhenInUseUsageDescription "Usamos tu ubicación para enviar la posición exacta cuando generas una alerta SOS."
add_or_set NSCameraUsageDescription "Usamos la cámara para adjuntar evidencia visual a una emergencia."
add_or_set NSMicrophoneUsageDescription "Usamos el micrófono para grabar mensajes de audio asociados a una emergencia."
add_or_set NSPhotoLibraryUsageDescription "Usamos la galería para adjuntar evidencia relacionada con una emergencia."

echo "OK: iOS preparado para v26.2: permisos + Shake to Undo desactivado."
