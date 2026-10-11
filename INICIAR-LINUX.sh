#!/usr/bin/env bash
set -u
cd -- "$(dirname -- "${BASH_SOURCE[0]}")" || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  echo "ERROR: Python 3 no esta instalado. En Linux Mint: sudo apt install python3"
  read -r -p "Pulsa Intro para cerrar... " _
  exit 1
fi
python3 launcher.py
status=$?
if [ "$status" -ne 0 ]; then
  echo "El lanzador termino con error: $status"
  read -r -p "Pulsa Intro para cerrar... " _
fi
exit "$status"
