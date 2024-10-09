"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);
import { exportToCanvas } from "@excalidraw/excalidraw";
import { Button } from "@/components/ui/button";

export default function scribblePage() {
    const [canvasUrl, setCanvasUrl] = useState("");
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    return (
        <>
            <div className="h-[90vh] grid place-items-center">
                <div>
                    <h1 className="text-center text-5xl font-extrabold">Scratch Pad</h1>
                    <div className="h-[80vh] w-[90vw]">
                        <Excalidraw
                            theme="dark"
                            excalidrawAPI={(api) => setExcalidrawAPI(api)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button className=""
                    onClick={async () => {
                        if (!excalidrawAPI) {
                            return
                        }
                        const elements = excalidrawAPI.getSceneElements();
                        if (!elements || !elements.length) {
                            return
                        }
                        const canvas = await exportToCanvas({
                            elements,
                            appState: {
                                exportWithDarkMode: false,
                            },
                            files: excalidrawAPI.getFiles(),
                            // getDimensions: () => { return { width: 350, height: 350 } }
                        });
                        setCanvasUrl(canvas.toDataURL());
                    }}
                >Generate Prescription</Button>
                <div className="export export-canvas">
                    <img src={canvasUrl} alt="" />
                </div>
            </div>
        </>
    );
}