using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

class Program {
    [DllImport("kernel32.dll")]
    static extern IntPtr GetConsoleWindow();

    [DllImport("user32.dll")]
    static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    const int SW_HIDE = 0;

    static void Main() {
        var handle = GetConsoleWindow();
        ShowWindow(handle, SW_HIDE);

        ProcessStartInfo startInfo = new ProcessStartInfo();
        startInfo.FileName = "msedge.exe";
        startInfo.Arguments = "--app=https://client-coral-one-93.vercel.app/ --window-size=1280,800";
        startInfo.UseShellExecute = true;

        try {
            Process.Start(startInfo);
        } catch (Exception) {
            // Fallback to chrome if edge fails
            startInfo.FileName = "chrome.exe";
            try { Process.Start(startInfo); } catch {}
        }
    }
}
