"""Run the current gate. --browser includes the required browser gate for release."""
from pathlib import Path
import argparse, subprocess, sys
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--browser',action='store_true');args=parser.parse_args()
commands=[[sys.executable,'launcher.py','--check'],[sys.executable,'tests/de5a_integrity.py'],[sys.executable,'tests/release_integrity.py'],[sys.executable,'tests/launcher_regression.py']]
commands += [['node','tests/'+name] for name in ['de3a_combat.mjs','de3b_telegraph.mjs','audio9d_smoke.mjs','stability_regression.mjs']]
commands.append([sys.executable,'tests/pages_integrity.py'])
if args.browser:commands.append([sys.executable,'tests/browser_http_smoke.py'])
for cmd in commands:
 print('RUN '+' '.join(cmd),flush=True)
 result=subprocess.run(cmd,cwd=root)
 if result.returncode:sys.exit(result.returncode)
print('PASS current selected checks. '+('Browser HTTP included.' if args.browser else 'Browser HTTP NOT RUN; this is not final release certification.'))
