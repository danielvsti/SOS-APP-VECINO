#!/usr/bin/env bash
set -euo pipefail
FILE="ios/App/App/AppDelegate.swift"
if [ ! -f "$FILE" ]; then
  echo "No encuentro $FILE. Ejecuta este script desde la carpeta raíz SOS-APP-VECINO-v26."
  exit 1
fi
if grep -q "applicationSupportsShakeToEdit" "$FILE"; then
  echo "OK: AppDelegate ya tiene desactivado Shake to Undo."
  exit 0
fi
python3 - <<'PY'
from pathlib import Path
p = Path('ios/App/App/AppDelegate.swift')
s = p.read_text()
needle = 'func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {'
if needle not in s:
    raise SystemExit('No encontré didFinishLaunchingWithOptions en AppDelegate.swift. Edítalo manualmente y agrega: application.applicationSupportsShakeToEdit = false')
s = s.replace(needle, needle + '\n        // SOS Municipal: usamos la agitación del teléfono como gesto de emergencia.\n        // Desactivamos el diálogo nativo de iOS "Undo/Redo" por shake.\n        application.applicationSupportsShakeToEdit = false', 1)
p.write_text(s)
PY
echo "OK: Shake to Undo desactivado en AppDelegate.swift"
