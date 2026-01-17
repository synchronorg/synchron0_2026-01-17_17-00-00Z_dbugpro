
import csv
import os
from datetime import datetime

"""
TIANGAN_SUFFIX_CSV_BUILDER v2.0
Architecture: Synchronos OS / Tiangan Kernel
Core Node: dbugpro (synchron0)
Location: db0/workspace/dbugtools/scripts/py/
Signature: Bugs are free !!!
"""

def build_tiangan_manifest(output_path="../../../../../tiangan_suffix_manifest.csv"):
    # Standard Tiangan Suffixes for the Bugworld expansion
    suffixes = ["0", "00", "A", "X", "Alpha", "Beta", "Omega", "Prime", "Kernel"]
    username = "dbugpro"
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True) if os.path.dirname(output_path) else None

    print(f"[*] Initializing Tiangan Manifest for @{username}...")
    
    try:
        with open(output_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            
            # Header with system metadata
            writer.writerow(["# TIANGAN_MANIFEST_V1"])
            writer.writerow(["# GENERATED_AT", datetime.now().isoformat()])
            writer.writerow(["# SIGNATURE", "Bugs are free !!!"])
            writer.writerow([])
            
            # CSV Structure
            writer.writerow(["suffix", "repo_name", "work_directory", "status", "priority"])
            
            for suffix in suffixes:
                repo_name = f"synchron{suffix.lower()}"
                work_dir = f"db{suffix.lower()}"
                status = "STABLE" if suffix == "0" else "PENDING_SPAWN"
                priority = "CORE" if suffix == "0" else "MODULE"
                
                writer.writerow([suffix, repo_name, work_dir, status, priority])
                print(f"[+] Synced Module: {repo_name} -> {work_dir}")

        print(f"\n[!] Success: Manifest built at {output_path}")
        print("[!] Protocol: Synchronos Pulse Complete.")

    except Exception as e:
        print(f"[X] Kernel Error: {str(e)}")

if __name__ == "__main__":
    # Default target updated to root relative to new script location
    build_tiangan_manifest()
