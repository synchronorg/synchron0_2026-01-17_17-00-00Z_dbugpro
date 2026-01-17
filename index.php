<?php
/**
 * Synchron OS project A | Landing Page
 * Generated: 2026-01-17T16:15:00.000Z
 * Suffix-less System Entry Point
 * Signature: bugsarefree
 */

$system_name = "Synchron OS project A";
$manifest_path = "tiangan_suffix_manifest.csv";

// Logic to determine which module view to prioritize
$active_suffix = isset($_GET['suffix']) ? $_GET['suffix'] : '0';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $system_name; ?> | HUB</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #020617; color: #f8fafc; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas; }
        .glitch { position: relative; color: #06b6d4; }
        .glitch::after {
            content: "bugsarefree";
            position: absolute;
            left: 2px;
            text-shadow: -1px 0 #8b5cf6;
            top: 0;
            overflow: hidden;
            clip: rect(0, 900px, 0, 0);
            animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(10px, 9999px, 20px, 0); }
            100% { clip: rect(80px, 9999px, 90px, 0); }
        }
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="max-w-4xl w-full space-y-8 text-center">
        <div class="inline-block p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-2xl mb-4">
            <h1 class="text-4xl font-black italic tracking-tighter uppercase">
                Synchron <span class="text-cyan-500">Organization</span>
            </h1>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div class="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Current_Seed</h2>
                <p class="text-2xl font-bold mb-2">synchron<?php echo $active_suffix; ?></p>
                <p class="text-slate-400 text-sm leading-relaxed">
                    This landing page is dynamically managed by the protools library. 
                    Individual modules retain their identity while sharing this root entry point.
                </p>
            </div>

            <div class="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                    <h2 class="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">System_Status</h2>
                    <div class="flex items-center space-x-2 text-emerald-500 font-bold">
                        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span>STABLE_CONSENSUS</span>
                    </div>
                </div>
                <div class="mt-8 pt-4 border-t border-slate-800">
                    <span class="text-[10px] text-slate-600 uppercase glitch">bugsarefree</span>
                </div>
            </div>
        </div>

        <div class="pt-12 text-slate-600 text-[10px] uppercase tracking-widest">
            Handshake Protocol v2.6 | Dual-Admin Enforced
        </div>
    </div>
</body>
</html>