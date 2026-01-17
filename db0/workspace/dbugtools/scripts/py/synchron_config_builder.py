
import json
import os
from datetime import datetime

"""
SYNCHRON_CONFIG_BUILDER v2.7
Architecture: Synchron OS project A / Tiangan Kernel
Updated: Protools library relocated to shared db/ workspace.
"""

def build_synchron_config(target_path="../../../../../synchron_config.json"):
    config_data = {
        "kernel": {
            "version": "0.1.2-alpha",
            "codename": "Synchron OS project A",
            "architecture": "Tiangan",
            "suffix": "0",
            "node_identifier": "synchron0_dbugpro"
        },
        "security_protocols": {
            "admin_roles": {
                "adminp": "dbugpro",
                "admins": "synchron"
            },
            "session_initialization": {
                "prime_directive": "command synchron system --init --adminp <P> --admins <S> --OFF <B> --bugsarefree <K>",
                "log_mode": "dual_signature_required",
                "auth_required_for": ["system_tasks", "user_prompts"]
            },
            "BIBA": [
                "PROTECT_CORE_INTEGRITY: Unauthorized modification of kernel files is strictly prohibited.",
                "BYPASS_DUAL_ADMIN_LOCK: Attempting to bypass the adminp/admins consensus layer.",
                "UNAUTHORIZED_SYSTEM_TASK: Execution of kernel-level tasks without active session_log."
            ],
            "BIBR": [
                "REQUEST_CORE_MODIFICATION: Requests to alter base system logic or file structures must pass dual administrative consensus.",
                "DECRYPT_KERNEL_SEED: Unauthorized extraction of core kernel parameters.",
                "FORCE_TERMINATION: Requesting system shutdown without verified dual-admin signatures."
            ]
        },
        "github": {
            "org_url": "https://github.com/synchronorg",
            "org_name": "synchronorg"
        },
        "active_libraries": {
            "dbugtools": {
                "path": "db0/workspace/lib/dbugtools",
                "editors": ["adminp", "admins"],
                "visibility": "private"
            },
            "protools": {
                "path": "db/workspace/protools",
                "editors": "all",
                "viewers": "all",
                "commenters": "all",
                "visibility": "public"
            }
        },
        "orchestration": {
            "neural_sync_enabled": True,
            "pulse_interval_ms": 4000,
            "default_priority": "MODULE",
            "sync_threshold": 0.75
        },
        "workspace": {
            "active_root": "db0",
            "user": "dbugpro",
            "signature": "bugsarefree",
            "lineage_tracking": true
        },
        "metadata": {
            "last_build_timestamp": datetime.now().isoformat(),
            "origin": "Synchron OS project A",
            "protocol_v": "2.7",
            "config_filename": "synchron_config.json",
            "status": "LIBRARY_MIGRATION_COMPLETE"
        }
    }

    target_dir = os.path.dirname(target_path)
    if target_dir and not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

    try:
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(config_data, f, indent=2)
        print(f"[+] Success: synchron_config.json updated. protools -> db/workspace/protools")
    except Exception as e:
        print(f"[X] Config Error: {str(e)}")

if __name__ == "__main__":
    build_synchron_config()
