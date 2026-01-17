
import json
import os
from datetime import datetime

"""
SYNCHRON_GLOSSARY_BUILDER v2.1
Architecture: Synchron OS project A / Tiangan Kernel
Updated: Terminology for Shared vs Seed workspaces.
"""

def build_glossary():
    glossary = {
        "system": "Synchron OS project A",
        "acronym_def": "OS = Operating System",
        "architecture": "Tiangan",
        "github_org": "https://github.com/synchronorg",
        "terms": {
            "adminp": "The primary human administrator (dbugpro).",
            "admins": "The primary AI orchestration administrator (synchron).",
            "seed_workspace": "The db0 directory, protected by BIBA/BIBR protocols.",
            "shared_workspace": "The db directory, containing public libraries like protools accessible to all modules.",
            "isolation": "The principle of sandboxing module logic within specific db nodes.",
            "consensus": "The dual-signature requirement for kernel-level tasks.",
            "bugsarefree": "The core protocol signature and system philosophy.",
            "synchronorg": "The GitHub organization (synchronorg) hosting integrated system repositories.",
            "module_repo": "A repository containing a specific Tiangan module, developed personally before transfer to synchronorg.",
            "merged_system_repo": "The final integrated repository within synchronorg that combines multiple module_repos."
        },
        "version": "1.4",
        "last_update": datetime.now().isoformat()
    }
    
    path = "../../../../../synchron_glossary.json"
    with open(path, 'w') as f:
        json.dump(glossary, f, indent=2)
    print("[+] synchron_glossary.json updated with shared_workspace terminology.")

if __name__ == "__main__":
    build_glossary()
