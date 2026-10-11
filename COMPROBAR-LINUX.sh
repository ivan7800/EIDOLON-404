#!/usr/bin/env bash
cd -- "$(dirname -- "${BASH_SOURCE[0]}")" || exit 1
python3 launcher.py --check
read -r -p "Pulsa Intro para cerrar... " _
